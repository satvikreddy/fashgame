import Image from "next/image";
import React from "react";

type Props = {
  src: string;
  alt?: string;
  height?: any;
  width?: any;
  className?: string;
};

const AppImage = ({ src, alt, height, width, className }: Props) => {
  return (
    <div
      style={{
        position: "relative",
        height: height ?? "100%",
        width: width ?? "100%",
      }}
    >
      <Image
        className={className}
        src={src}
        alt={alt ?? ""}
        layout="fill"
        style={{
          objectFit: "contain",
        }}
      />
    </div>
  );
};

export default AppImage;
