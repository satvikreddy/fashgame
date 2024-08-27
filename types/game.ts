type GameProps = {
  game: Game;
};

type Game = {
  id: string;
  handle: string;
  slides: any[];
  config: any;
};

type Product = {
  id: number;
  name: string;
  image: string;
  category: string;
  brand: string;
  price: number;
  link: string;
};

type PlayerScore = {
  ScoreID: number;
  UserID: number;
  InstaHandle: string;
  name: string;
  Score: number;
  rank: number;
};

type Leaderboard = {
  // title: string;
  ownerName: string;

  /**player's current position */
  playerCurrentScore?: PlayerScore;

  /**player's best position on leaderboard */
  playerTopScore: PlayerScore | null;

  topScores: PlayerScore[];
};

type DisplayLeaderboard = {
  ownerName: string;
  scores: (PlayerScore & { highlight?: boolean })[];
  playerCurrentScore?: PlayerScore;
};

type HigherLowerGameConfig = {
  retryAllowed: boolean;
  // playerIgHandleRequired: boolean;
  notRandomSlides?: boolean;
};
