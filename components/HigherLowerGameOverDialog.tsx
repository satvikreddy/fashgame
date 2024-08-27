"use client";

import { Text, Title } from "@mantine/core";
import { useRouter } from "next/router";
import GameLeaderboard from "./GameLeaderboard";
import AppButton from "./AppButton";
import { openAppDialog, openSingleActionDialog } from "./AppDialog";
import AppImage from "./AppImage";

type DialogProps = {
  currentStreak: number;
  bestScore: number;
  config: HigherLowerGameConfig;
  leaderboard?: DisplayLeaderboard;
  onSeeProductLinks: () => void;
};

const openHigherLowerGameOverDialog = ({
  bestScore,
  currentStreak,
  config,
  leaderboard,
  onSeeProductLinks,
}: DialogProps) => {
  let oneLinerWithImage = null;
  let actions = null;

  const logProps = {
    score: currentStreak,
    bestScore,
    playerPosition: leaderboard?.playerCurrentScore?.rank,
    source: "game-over-dialog",
  };

  // oneLinerWithImage = (
  //   <GameOverOneLiner bestScore={bestScore} currentStreak={currentStreak} />
  // );

  oneLinerWithImage = <GameLeaderboard leaderboard={leaderboard!} />;

  const { retryAllowed } = config;
  const channel = "post";

  actions = (
    <>
      {retryAllowed ? (
        <RetryPlayAgainButton />
      ) : (
        <NoRetryPlayAgainButton channel={channel} />
      )}

      <div>
        <WantDressLinksButton
          onClick={() => {
            onSeeProductLinks();
          }}
        />
      </div>
    </>
  );

  return openAppDialog({
    notDismissable: true,
    children: (
      <>
        {oneLinerWithImage}
        {actions}
      </>
    ),
  });
};

const WantDressLinksButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <AppButton
      variant="subtle"
      onClick={() => {
        onClick();
      }}
    >
      Want the links of these dresses? 👗
    </AppButton>
  );
};

export const RetryPlayAgainButton = ({ onClick }: { onClick?: () => void }) => {
  return (
    <AppButton
      loader="click"
      onClick={() => {
        if (onClick) onClick();

        window.location.reload();
      }}
    >
      Play again
    </AppButton>
  );
};

/**Show a dialog to reply to creator */
export const NoRetryPlayAgainButton = ({
  onClick,
  channel,
}: {
  onClick?: () => void;
  channel: "story" | "post";
}) => {
  return (
    <AppButton
      onClick={() => {
        if (onClick) onClick();
        openSingleActionDialog({
          id: "play-again-id",
          children: (
            <>
              <Text size="md">To play again, reply to my {channel} with:</Text>

              <Text size="md">&quot;Want to play again.&quot;</Text>
            </>
          ),
        });
      }}
    >
      Play again
    </AppButton>
  );
};

export const InstaMoreGames = ({
  onClick,
  channel,
}: {
  onClick?: () => void;
  channel: "story" | "post";
}) => {
  return (
    <AppButton
      onClick={() => {
        if (onClick) onClick();
        openSingleActionDialog({
          id: "more-games",
          children: (
            <>
              <Text size="md">
                For <b>early access</b> to upcoming games, reply to my {channel}{" "}
                with:
              </Text>
              <Text size="md">&quot;Want more games.&quot;</Text>
            </>
          ),
        });
      }}
    >
      More games
    </AppButton>
  );
};

const GameOverOneLiner = ({
  bestScore,
  currentStreak,
}: {
  currentStreak: number;
  bestScore: number;
}) => {
  let title = "That was embarrassing 🤦‍♀️";
  let image =
    "https://firebasestorage.googleapis.com/v0/b/fash-358308.appspot.com/o/game-high-low%2Fhigh-low-embarrasing.jpeg?alt=media&token=3a9e8161-756c-4756-8a4e-673299148f38";

  if (currentStreak <= 3) {
  } else if (currentStreak <= 9) {
    title = "Impressive! You're above average 😎";
    image =
      "https://firebasestorage.googleapis.com/v0/b/fash-358308.appspot.com/o/game-high-low%2Fhigh-low-cool.jpeg?alt=media&token=6039a1ac-ecb4-41f7-92bf-673abd4d64d2";
  } else {
    title = "Excellent score! You're awesome 🤩";
    image =
      "https://firebasestorage.googleapis.com/v0/b/fash-358308.appspot.com/o/game-high-low%2Fhigh-low-amazing.jpeg?alt=media&token=494ac4e5-eaa1-48c5-9d5b-a0cfdc854932";
  }

  const isNewBest = bestScore > 0 && bestScore === currentStreak;

  return (
    <>
      <Title size="h4">{title}</Title>
      <AppImage src={image} height={200} />
      {!isNewBest && <Text>Score: {currentStreak}</Text>}
      {!isNewBest && bestScore > 0 && <Text>Best: {bestScore}</Text>}
      {isNewBest && <Text>New personal best: {bestScore}</Text>}
    </>
  );
};

export { openHigherLowerGameOverDialog };
