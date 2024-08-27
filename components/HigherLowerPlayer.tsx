"use client";

import { Drawer, ScrollArea, Space, useMantineTheme } from "@mantine/core";
import React, { useEffect, useRef, useState } from "react";
import Carousel, { CarouselHandle } from "./Carousel";
import {
  openHigherLowerGameOverDialog,
  RetryPlayAgainButton,
} from "./HigherLowerGameOverDialog";
import { PLAYER_BOTTOM_BAR_HEIGHT, PlayerBottomBar } from "./PlayerBottomBar";
import HigherLowerSlide from "./HigherLowerSlide";
import Center from "./Center";
import GameVSIndicator, { GameVSIndicatorPreloader } from "./GameVSIndicator";
import { HigherLowerTeachingDialog } from "./HigherLowerTeachingDialog";

type Props = {
  height: number;
  width: number;
  items: Product[];
  gameHandle: string;
  gameId: string;
  config: HigherLowerGameConfig;
  // onGameOver?: (params: { streak: number }) => void;
};

export type Guess = "lower" | "higher" | null;
export type GuessResult = "correct" | "wrong" | null;

const CONTENT_ASPECT_RATIO = 3 / 4;
const ACTION_SECTION_MIN_WIDTH = 100;

const HigherLowerPlayer = ({
  height,
  width,
  items,
  gameHandle,
  gameId,
  config,
}: Props) => {
  const ref = useRef<CarouselHandle>(null);
  const [showPriceIndex, setShowPriceIndex] = useState(0);
  const [vsIndicator, setVsIndicator] = useState<GuessResult>(null);
  const [streak, setStreak] = useState(0);
  const [teachingModalOpen, setTeachingModalOpen] = useState(true);
  const [highScore, setHighScore] = useState(0);

  const [drawerOpen, setDrawerOpen] = useState(false);

  const onGuessed = (params: {
    topIndex: number;
    bottomIndex: number;
    guess: "higher" | "lower";
  }) => {
    const { bottomIndex, guess, topIndex } = params;
    const productA = items[topIndex]!;
    const productB = items[bottomIndex]!;

    const priceA = productA.price;
    const priceB = productB.price;

    const correctAnswer = priceA >= priceB ? "lower" : "higher";
    const guessResult: GuessResult =
      priceA === priceB || correctAnswer === guess ? "correct" : "wrong";

    if (guessResult === "correct") {
      setStreak((s) => s + 1);
    }

    setShowPriceIndex(bottomIndex);
    setVsIndicator(guessResult);

    new Promise((resolve) => setTimeout(resolve, 1000)).then((_) => {
      if (guessResult === "correct") {
        ref.current?.goToNext();
        setVsIndicator(null);
      } else {
        if (streak > highScore) setHighScore(streak);

        //* game over
        const bestScore = Math.max(highScore, streak);

        // show modal
        openHigherLowerGameOverDialog({
          currentStreak: streak,
          bestScore,
          config,
          leaderboard: {
            ownerName: "",
            scores: [],
          },
          onSeeProductLinks: () => {
            setDrawerOpen(true);
          },
        });

        setStreak(0);
      }
    });
  };

  const bottomBarHeight = PLAYER_BOTTOM_BAR_HEIGHT;
  const carouselHeight = height - bottomBarHeight;

  //* calculate dimension of image section and action section
  const imageSectionIdealWidth = (carouselHeight / 2) * CONTENT_ASPECT_RATIO;
  const remainingWidthForActionSection = width - imageSectionIdealWidth;
  const isLessSpaceForAction =
    remainingWidthForActionSection < ACTION_SECTION_MIN_WIDTH;

  const imageSectionDisplayWidth = isLessSpaceForAction
    ? width - ACTION_SECTION_MIN_WIDTH
    : imageSectionIdealWidth;
  const actionSectionDisplayWidth = width - imageSectionDisplayWidth;

  const { colors } = useMantineTheme();

  return (
    <div className="h-full w-full" style={{ background: colors.niceteal![0] }}>
      <div className="relative z-10 w-full" style={{ height: carouselHeight }}>
        <Carousel
          ref={ref}
          height={carouselHeight}
          slidesInView={2}
          notDraggable
        >
          {{
            count: items.length,
            renderer({ index, isInCacheExtent, activeIndex }) {
              const item = items[index]!;

              return (
                <HigherLowerSlide
                  key={index}
                  item={item}
                  actionSection={
                    index <= showPriceIndex ? "priceTag" : "guessPrice"
                  }
                  onGuess={(guess) => {
                    onGuessed({
                      topIndex: index - 1,
                      bottomIndex: index,
                      guess: guess!,
                    });
                  }}
                  height={carouselHeight / 2}
                  actionSectionDisplayWidth={actionSectionDisplayWidth}
                  imageSectionDisplayWidth={imageSectionDisplayWidth}
                  dontRenderImage={!isInCacheExtent}
                  onProductViewClick={() => {}}
                />
              );
            },
          }}
        </Carousel>

        {/* VS indicator */}
        <div
          className="absolute right-0 top-0 -z-10 h-full"
          style={{
            width: actionSectionDisplayWidth,
          }}
        >
          <Center>
            <GameVSIndicator guessResult={vsIndicator} />
            <GameVSIndicatorPreloader />
          </Center>

          <HigherLowerTeachingDialog
            open={teachingModalOpen}
            handleClose={() => {
              setTeachingModalOpen(false);
            }}
            bestScore={highScore}
            config={config}
          />
        </div>
      </div>
      <PlayerBottomBar text={getStreakText(streak, highScore)} />

      <Drawer
        opened={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title="Click item to view on Myntra"
        padding="xl"
        size="90%"
        position="bottom"
        className="text-center"
      >
        {/* Drawer content */}
        <div
          style={{
            height: `calc(100% - 85px)`,
            overflowY: "scroll",
            paddingBottom: 10,
          }}
        >
          {/* <ProductGrid
            items={[...items.slice(0, showPriceIndex + 1)]}
            onItemClick={(item, index) => {
              const logParams = {
                productId: item.id,
                price: item.price,
                brand: item.brand,
                index,
                source: "end-game",
              };

              logEvent("PRODUCT_VIEW", logParams);
              openInNewTab(item.link);
            }}
          /> */}
        </div>

        <Space h="xs" />

        <RetryPlayAgainButton
          onClick={() => {
            const logProps = {
              score: streak,
              bestScore: highScore,
              source: "game-over-products",
            };
          }}
        />
      </Drawer>
    </div>
  );
};

const getStreakText = (streak: number, highScore: number) => {
  let text = `Score: ${streak}`;

  const emojiRank = getEmojiIndicator(streak);
  text += " " + emojiRank;

  if (highScore > 0) {
    text += ` (Best: ${highScore})`;
  }

  return text;
};

const getEmojiIndicator = (highScore: number, digitLimit?: number): string => {
  let score = highScore + 1;

  /** lowest to highest */
  const emojiList = [
    "😶",
    "😐",
    "🙂",
    "😀",
    "😁",
    "😎",
    "😲",
    "🤯",
    "🐱‍🏍",
    "🚀",
    "🏅",
    "🏆",
  ];
  const emojiCount = emojiList.length;

  let rankIndicator = "";
  let digits = 0;

  while (score > 0 && digits < (digitLimit ?? 3)) {
    if (score >= emojiCount) {
      rankIndicator += emojiList[emojiCount - 1];
      score -= emojiCount;
    } else {
      rankIndicator += emojiList[score - 1];
      score = 0;
    }

    digits++;
  }

  return rankIndicator;
};

export default HigherLowerPlayer;
