"use client";
import React from "react";
import { Text, useMantineTheme } from "@mantine/core";

type Props = {
  leftAction?: React.ReactElement;
  rightAction?: React.ReactElement;
  text?: string;
  bgColor?: string;
  fontColor?: string;
};

const PLAYER_BOTTOM_BAR_HEIGHT = 60;

const PlayerBottomBar = ({
  leftAction,
  rightAction,
  text,
  bgColor,
  fontColor,
}: Props) => {
  const { colors } = useMantineTheme();

  return (
    <div
      className="flex pr-1"
      style={{
        height: PLAYER_BOTTOM_BAR_HEIGHT,
        background: bgColor ?? colors.niceteal![7],
      }}
    >
      {leftAction}

      {text && (
        <Text
          size="md"
          className="m-auto flex-auto text-center"
          style={{
            maxLines: 1,
            color: fontColor ?? "white",
          }}
        >
          {text}
        </Text>
      )}

      {rightAction}
    </div>
  );
};

export { PlayerBottomBar, PLAYER_BOTTOM_BAR_HEIGHT };
