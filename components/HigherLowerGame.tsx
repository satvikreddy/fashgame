"use client";

import { ogImageHigherLower } from "./AppImages";
import HigherLowerPlayer from "./HigherLowerPlayer";
import PageScaffold from "./PageScaffold";
import ResponsiveViewport from "./ResponsiveViewport";

const HigherLowerGame = ({ game }: GameProps) => {
  const { id: gameId, handle: gameHandle, slides, config } = game;

  return (
    <PageScaffold
      meta={{
        title: "Fashion Higher Lower",
        description: "Free game forever",
        ogImage: ogImageHigherLower(),
      }}
      pageId="game-higher-lower"
      hideAppBar
    >
      <ResponsiveViewport>
        {({ height, width }) => (
          <HigherLowerPlayer
            items={slides as Product[]}
            config={config}
            height={height}
            width={Math.min(width, (height * 3) / 4)}
            gameHandle={gameHandle}
            gameId={gameId}
          />
        )}
      </ResponsiveViewport>
    </PageScaffold>
  );
};

export default HigherLowerGame;
