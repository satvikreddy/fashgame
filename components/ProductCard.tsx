"use client";

import { Text, useMantineTheme } from "@mantine/core";
import React from "react";

type Props = {
  item: Product;
  height?: any;
  width?: any;
  onCardClick?: () => void;

  /** shows price and hides category */
  showPrice?: boolean;
};

/** product image with basic info */
const ProductCard = ({
  item,
  height,
  width,
  onCardClick,
  showPrice,
}: Props) => {
  const { id, name, image } = item;
  const imageSectionDisplayWidth = width ?? "100%";

  return (
    <div
      className="relative"
      style={{ width: imageSectionDisplayWidth }}
      onClick={onCardClick}
    >
      <img
        src={image}
        alt={name}
        style={{
          height: height,
          width: imageSectionDisplayWidth,
          objectFit: "cover",
        }}
      />

      <div className="absolute bottom-0 left-0">
        <ProductInfo product={item} showPrice={showPrice} />
      </div>
    </div>
  );
};

const ProductInfo = ({
  product,
  showPrice,
}: {
  product: Product;
  showPrice?: boolean;
}) => {
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
        {showPrice
          ? `${product.brand} - ₹${product.price}`
          : `${product.category} by ${product.brand}`}
      </Text>
    </div>
  );
};

export default ProductCard;
