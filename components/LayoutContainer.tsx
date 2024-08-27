"use client";

import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { NotificationsProvider } from "@mantine/notifications";
import React, { Component } from "react";
import ErrorBoundary from "./ErrorBoundary";

type Props = {
  children: React.ReactNode;
};

const LayoutContainer = (props: Props) => {
  return (
    <ErrorBoundary>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          // colorScheme: "dark",
          fontFamily: "Chivo, sans-serif",
          headings: { fontFamily: "Chivo, sans-serif" },
          colors: {
            niceteal: [
              "#e8f5f6",
              "#B8F9FF",
              "#8AF6FE",
              "#5DF2FE",
              "#2FEFFE",
              "#02EBFD",
              "#018f9a",
              "#018f9a",
              "#016e77",
              "#002F33",
            ],
          },
          primaryColor: "niceteal",
        }}
      >
        <NotificationsProvider>
          <ModalsProvider>{props.children}</ModalsProvider>
        </NotificationsProvider>
      </MantineProvider>
    </ErrorBoundary>
  );
};

export default LayoutContainer;
