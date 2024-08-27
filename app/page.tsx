import HigherLowerGame from "@/components/HigherLowerGame";
import Image from "next/image";

export default function Home() {
  const game = getGame();

  return <HigherLowerGame game={game} />;
}

const getGame = (): Game => {
  const config: HigherLowerGameConfig = {
    retryAllowed: true,
  };

  const slides: Product[] = [
    {
      id: 1,
      brand: "Nike",
      category: "Shoes",
      image: "/images/nike-shoes.jpg",
      link: "https://www.myntra.com/nike",
      name: "Nike Air Max",
      price: 100,
    },
    {
      id: 2,
      brand: "Nike",
      category: "Shoes",
      image: "/images/nike-shoes.jpg",
      link: "https://www.myntra.com/nike",
      name: "Nike Air Max",
      price: 100,
    },
    {
      id: 3,
      brand: "Nike",
      category: "Shoes",
      image: "/images/nike-shoes.jpg",
      link: "https://www.myntra.com/nike",
      name: "Nike Air Max",
      price: 100,
    },
  ];

  return {
    id: "1",
    handle: "higher-lower",
    config,
    slides,
  };
};
