import HigherLowerGame from "@/components/HigherLowerGame";
import { getGameSlides } from "./data";

export default function Home() {
  const game = getGame();

  return <HigherLowerGame game={game} />;
}

const getGame = (): Game => {
  const config: HigherLowerGameConfig = {
    retryAllowed: true,
  };

  const slides: Product[] = getGameSlides();

  return {
    id: "1",
    handle: "higher-lower",
    config,
    slides,
  };
};
