"use client";

import { List, ScrollArea, Space, Text } from "@mantine/core";
import React from "react";
import {
  AppIconMedalBronze,
  AppIconMedalGold,
  AppIconMedalSilver,
} from "./AppIcons";

type Props = {
  leaderboard: DisplayLeaderboard;
};

const GameLeaderboard = ({ leaderboard }: Props) => {
  const { scores: scoresToDisplay, ownerName } = leaderboard;

  return (
    <>
      <div>
        <Text size={26} weight="lighter">
          LEADERBOARD
        </Text>

        <Text size="lg" weight="normal">
          Hosted by {ownerName}
        </Text>
      </div>
      {scoresToDisplay.length === 0 ? (
        <Text>No plays yet, share your game.</Text>
      ) : (
        <ScrollArea type="always" offsetScrollbars style={{ height: "100%" }}>
          <List
            className="rounded-md bg-red-50 px-2 py-2"
            styles={{
              itemWrapper: { width: "100%", display: "flex" },
            }}
            spacing="xs"
          >
            {/* <List.Item key={-1} icon={<HeadingSegment>Rank</HeadingSegment>}>
          <HeadingSegment stretch>Player</HeadingSegment>
          <HeadingSegment>Score</HeadingSegment>
        </List.Item> */}
            {scoresToDisplay.map((e, i) => {
              const highlight = e.highlight;
              const playerName = e.name;
              return (
                <List.Item
                  key={i}
                  icon={
                    <TileSegment>
                      <Rank rank={e.rank}></Rank>
                    </TileSegment>
                  }
                  className={
                    highlight
                      ? "rounded-md border-solid border-green-800 bg-green-100"
                      : ""
                  }
                >
                  <TileSegment stretch highlight={highlight}>
                    {playerName}
                  </TileSegment>
                  <TileSegment highlight={highlight}>
                    {e.Score}
                    <span style={{ fontSize: 10 }}> 🔥</span>
                  </TileSegment>
                </List.Item>
              );
            })}
          </List>
        </ScrollArea>
      )}
    </>
  );
};

const TileSegment = ({
  children,
  stretch,
  highlight,
}: {
  children: any;
  stretch?: boolean;
  highlight?: boolean;
}) => {
  return (
    <div
      className={`${
        stretch ? "flex-grow" : ""
      } rounded-sm  px-2 py-1 text-left`}
    >
      {children}
    </div>
  );
};

const HeadingSegment = ({
  children,
  stretch,
}: {
  children: any;
  stretch?: boolean;
}) => {
  return (
    <div className={`${stretch ? "flex-grow" : ""} rounded-sm  px-2 py-1 `}>
      {children}
    </div>
  );
};

const Rank = ({ rank }: { rank: number }) => {
  const iconDimension = 26;
  const containerWidth = 35;

  let child = null;
  if (rank === 1) {
    child = <AppIconMedalGold dimension={iconDimension} />;
  } else if (rank === 2) {
    child = <AppIconMedalSilver dimension={iconDimension} />;
  } else if (rank === 3) {
    child = <AppIconMedalBronze dimension={iconDimension} />;
  } else {
    child = `${rank}`;
  }

  return (
    <div
      className="overflow-visible whitespace-nowrap text-center"
      style={{ width: containerWidth }}
    >
      {child}
    </div>
  );
};

export default GameLeaderboard;
