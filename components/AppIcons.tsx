import Image from "next/image";
import { FiExternalLink } from "react-icons/fi";
import { FiShoppingCart } from "react-icons/fi";
import { BsShareFill } from "react-icons/bs";
import { CSSProperties } from "react";

type AppIconProps = {
  dimension?: number;
  aspectRatio?: number;
  style?: CSSProperties;
};

export const AppIconExternalLink = () => {
  return <FiExternalLink />;
};

export const AppIconShopProduct = () => {
  return <FiShoppingCart size={20} />;
};

export const AppIconBadge = (props: AppIconProps) => {
  return assetIcon(props, "badge", "png");
};

export const AppIconCorrect = (props: AppIconProps) => {
  return assetIcon(props, "correct", "png");
};
export const AppIconWrong = (props: AppIconProps) => {
  return assetIcon(props, "wrong", "png");
};
export const AppIconVS = (props: AppIconProps) => {
  // TODO: Image wasn't working in ios
  return (
    <img
      src={`/icons/vs.svg`}
      alt={`vs`}
      // height={}
      width={props.dimension}
      style={{
        objectFit: "contain",
        ...((props.style ?? {}) as any),
      }}
      loading="eager"
    />
  );
  // return assetIcon(props, "vs", "svg");
};

export const AppIconMedalGold = (props: AppIconProps) => {
  return assetIcon(props, "medal-gold", "png");
};
export const AppIconMedalSilver = (props: AppIconProps) => {
  return assetIcon(props, "medal-silver", "png");
};
export const AppIconMedalBronze = (props: AppIconProps) => {
  return assetIcon(props, "medal-bronze", "png");
};
export const AppIconLeaderboard = (props: AppIconProps) => {
  return assetIcon(props, "leaderboard", "png");
};

export const AppIconInstagram = (props: AppIconProps) => {
  return assetIcon(props, "ig-white", "png");
};

export const AppIconInstagramColor = (props: AppIconProps) => {
  return assetIcon(props, "ig-logo", "png");
};

export const AppIconGmap = (props: AppIconProps) => {
  return assetIcon(
    // {
    //   ...props,
    //   style: {
    //     ...props.style,
    //     objectFit: "contain",
    //   },
    // },
    {
      ...props,
      aspectRatio: 2 / 3,
    },
    "gmap-logo",
    "png"
  );
};

export const AppIconShare = () => {
  return <BsShareFill />;
};

const assetIcon = (
  params: AppIconProps,
  fileName: string,
  extension: string
) => {
  const dimension = params.dimension ?? 30;
  const width = (params.aspectRatio ?? 1) * dimension;

  return (
    <Image
      src={`/icons/${fileName}.${extension}`}
      alt={fileName}
      height={dimension}
      width={width}
      style={{
        objectFit: "cover",
        ...((params.style ?? {}) as any),
      }}
      loading="eager"
    />
  );
};
