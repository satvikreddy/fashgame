"use client";

import React, { CSSProperties } from "react";
import { AppIconCorrect, AppIconVS, AppIconWrong } from "./AppIcons";
import { GuessResult } from "./HigherLowerPlayer";

type Props = {
  guessResult: GuessResult;
  containerStyle?: CSSProperties;
};

const GameVSIndicator = ({ guessResult, containerStyle }: Props) => {
  switch (guessResult) {
    case "correct":
      return <AppIconCorrect dimension={40} />;
    case "wrong":
      return <AppIconWrong dimension={40} />;
    default:
      return <AppIconVS dimension={40} />;
  }
};

const GameVSIndicatorPreloader = () => {
  return (
    <>
      <AppIconCorrect dimension={40} style={{ display: "none" }} />
      <AppIconWrong dimension={40} style={{ display: "none" }} />
      <AppIconVS dimension={40} style={{ display: "none" }} />
    </>
  );
};

export default GameVSIndicator;
export { GameVSIndicatorPreloader };
