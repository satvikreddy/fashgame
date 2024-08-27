"use client";

import { Button, Center, Text, useMantineTheme } from "@mantine/core";
import { useCountUp } from "react-countup";
import { AppIconBadge, AppIconShopProduct } from "./AppIcons";

import { useRef, useState } from "react";
import { Guess } from "./HigherLowerPlayer";
import ProductCard from "./ProductCard";

type HigherLowerSlideProps = {
  item: Product;
  actionSection: "priceTag" | "guessPrice";
  onGuess?: (guess: Guess) => void;
  actionSectionDisplayWidth: number;
  imageSectionDisplayWidth: number;
  height: number;
  dontRenderImage?: boolean;

  /**want to view product */
  onProductViewClick: () => void;
};

const HigherLowerSlide = ({
  item,
  actionSection: actionSectionProp,
  height,
  imageSectionDisplayWidth,
  actionSectionDisplayWidth,
  onGuess,
  dontRenderImage,
  onProductViewClick,
}: HigherLowerSlideProps) => {
  const { price, name, image } = item;
  const [actionSection, setActionSection] = useState(actionSectionProp);
  const isShowGuessView = actionSection === "guessPrice";

  const counterDurationSec = 1;
  const counterRef = useRef(null);
  const { start: startCounter } = useCountUp({
    startOnMount: false,
    start: 0,
    end: price,
    duration: counterDurationSec, //seconds
    ref: counterRef,
    prefix: "₹",
    // onEnd: onCounterEnd,
  });

  const onGuessed = (guess: Guess) => {
    // count up and reveal price
    startCounter();
    setActionSection("priceTag");

    new Promise((resolve) =>
      setTimeout(resolve, counterDurationSec * 1000 + 100)
    ).then((_) => {
      if (onGuess) {
        onGuess(guess);
      }
    });
  };

  //* dimensions
  const productInfoPriceHeight = 50;
  const buttonHeight = 40;
  const productInfoPriceTop =
    height * (height > 300 ? 0.5 : 0.35) - productInfoPriceHeight * 0.5;
  const higherButtonTop = productInfoPriceTop + productInfoPriceHeight + 10;
  const lowerButtonTop = higherButtonTop + buttonHeight + 10;

  return (
    <div className="relative flex h-full">
      {/* Image Section */}
      <div style={{ width: imageSectionDisplayWidth }}>
        {!dontRenderImage && (
          <ProductCard
            item={item}
            height={height}
            width={imageSectionDisplayWidth}
          />
        )}

        {/* Product Link */}
        <div
          className="absolute bottom-0 "
          style={{ left: imageSectionDisplayWidth - 35 }}
        >
          <ProductLinkButton onProductViewClick={onProductViewClick} />
        </div>
      </div>
      {/* Action Section */}
      <div
        className="relative flex justify-center text-center"
        style={{ width: actionSectionDisplayWidth }}
      >
        <div
          className="absolute right-0"
          style={{
            top: productInfoPriceTop,
            width: actionSectionDisplayWidth,
          }}
        >
          <PriceTag
            priceLabel={isShowGuessView ? "?" : `${item.price}`}
            counterRef={counterRef}
          />
        </div>

        {isShowGuessView && (
          <div
            className="absolute"
            style={{
              top: higherButtonTop,
            }}
          >
            <HigherButton
              onClick={() => {
                onGuessed("higher");
              }}
            />
          </div>
        )}

        {isShowGuessView && (
          <div className="absolute" style={{ top: lowerButtonTop }}>
            <LowerButton
              onClick={() => {
                onGuessed("lower");
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

const PriceTag = ({
  priceLabel,
  counterRef,
}: {
  priceLabel: string;
  counterRef?: React.RefObject<HTMLDivElement>;
}) => {
  return (
    <div className="grid h-[50] w-full">
      <Text ref={counterRef} size={24} color="niceteal.8">
        ₹{priceLabel}
      </Text>
    </div>
  );
};

const ProductInfo = ({ product }: { product: Product }) => {
  const { colors } = useMantineTheme();
  return (
    <div
      style={{
        borderTopRightRadius: 20,
        padding: "4px 10px 2px 8px",
        background: colors.niceteal![0],
      }}
      className="bg-gray-200 text-left"
    >
      <Text size="xs" weight="normal" color="niceteal.8">
        {product.category} by {product.brand}
      </Text>
    </div>
  );
};

const HigherButton = (props: { onClick: () => void }) => {
  return (
    <HighLowButton
      icon={<AppIconBadge />}
      isHigh={true}
      label="Higher"
      onClick={props.onClick}
    />
  );
};
const LowerButton = (props: { onClick: () => void }) => {
  return (
    <HighLowButton
      icon={<AppIconBadge />}
      isHigh={false}
      label="Lower"
      onClick={props.onClick}
    />
  );
};

const HighLowButton = (props: {
  icon: React.ReactElement;
  label: string;
  onClick: () => void;
  isHigh: boolean;
}) => {
  const { icon, label, onClick, isHigh } = props;

  return (
    <Button
      onClick={onClick}
      sx={{
        borderRadius: 20,
        borderTopRightRadius: isHigh ? 0 : undefined,
        borderBottomLeftRadius: !isHigh ? 0 : undefined,
        fontSize: 18,
        textTransform: "none",
      }}
    >
      {label}
    </Button>
  );
};

export const ProductLinkButton = ({
  onProductViewClick,
}: {
  onProductViewClick?: () => void;
}) => {
  const { colors } = useMantineTheme();

  return (
    <div
      style={{
        borderTopLeftRadius: 20,
        padding: "12px 10px 5px 8px",
        background: colors.niceteal![0],
        color: colors.niceteal![9],
        zIndex: 20,
      }}
      className="text-left "
      onClick={onProductViewClick}
    >
      <Center>
        <AppIconShopProduct />
      </Center>
    </div>
  );
};

export default HigherLowerSlide;
