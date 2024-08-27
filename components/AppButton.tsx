import React, { useState } from "react";
import { Button } from "@mantine/core";

type Props = {
  children: string;
  withLoader?: boolean;
  loader?: "async" | "click";
  onClick?: (() => void) | (() => Promise<void>);
  style?: React.CSSProperties;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  variant?: "default" | "gradient" | "subtle";
  submit?: boolean;
};

const AppButton = ({
  children,
  onClick,
  style,
  leftIcon,
  rightIcon,
  variant,
  submit,
  loader,
}: Props) => {
  const [loading, setLoading] = useState(false);

  return (
    <Button
      variant={variant ?? "gradient"}
      size={variant === "subtle" ? "sm" : "md"}
      gradient={{ from: "#ed6ea0", to: "#ec8c69", deg: 35 }}
      style={{
        color: variant === "subtle" ? "#ed6ea0" : undefined,
        fontWeight: variant === "default" ? "normal" : undefined,
        ...style,
      }}
      leftIcon={leftIcon}
      rightIcon={rightIcon}
      onClick={
        loader
          ? async () => {
              setLoading(true);

              if (onClick) {
                await onClick();

                if (loader === "async") {
                  setLoading(false);
                }
              }
            }
          : onClick
      }
      type={submit ? "submit" : undefined}
      loading={loading}
    >
      {children}
    </Button>
  );
};

export default AppButton;
