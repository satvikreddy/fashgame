"use client";

import { useViewportSize } from "@mantine/hooks";
import React, { ReactNode } from "react";
import { use100vh } from "react-div-100vh";

type Props = {
  children:
    | ReactNode
    | ((size: { height: number; width: number }) => ReactNode);
};

/**Takes full height of viewport. Works in mobile browsers, unlike '100vh' */
const ResponsiveViewport = ({ children }: Props) => {
  const height = use100vh();
  const { width } = useViewportSize();

  if (!height || width === 0) {
    return null;
  }

  return (
    <div className="relative mx-auto flex items-center" style={{ height }}>
      {typeof children === "function" ? children({ height, width }) : children}
    </div>
  );
};

export default ResponsiveViewport;
