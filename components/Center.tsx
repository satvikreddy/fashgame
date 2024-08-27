import React from "react";

type Props = {
  children: any;
};

const Center = ({ children }: Props) => {
  return (
    <div
      style={{
        margin: 0,
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      {children}
    </div>
  );
};

export default Center;
