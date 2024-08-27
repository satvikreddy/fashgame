"use client";

import { Space, Text } from "@mantine/core";
import AppButton from "./AppButton";
import AppDialog from "./AppDialog";
import { NoRetryPlayAgainButton } from "./HigherLowerGameOverDialog";

export const HigherLowerTeachingDialog = (props: {
  handleClose: () => void;
  open: boolean;
  bestScore: number;
  config: HigherLowerGameConfig;
}) => {
  const { open, handleClose, bestScore, config } = props;

  let content = null;
  const isPlayAllowed = true;
  const channel = "post";

  content = (
    <>
      <Text size="md">high score: {bestScore}🔥</Text>

      <div className="flex">
        {isPlayAllowed ? (
          <AppButton onClick={handleClose}>Play</AppButton>
        ) : (
          <NoRetryPlayAgainButton channel={channel} />
        )}
        <Space mr="sm" />
      </div>
    </>
  );

  return (
    <AppDialog
      opened={open}
      handleClose={handleClose}
      title="Higher or Lower?"
      notDismissable
    >
      <Text align="center">
        Guess if the price of the item below is <b>higher</b> or <b>lower</b>{" "}
        than the one above!
      </Text>

      {content}
    </AppDialog>
  );
};
