import { APP_BASE_PATH } from "@/app/_app";

export const ogImageHigherLower = () => {
  return ogImage("og-higher-lower.png");
};

export const ogImageFash = () => {
  return ogImage("og-guess-price.png");
};

const ogImage = (fileName: string) => {
  return `${APP_BASE_PATH}/images/${fileName}`;
};
