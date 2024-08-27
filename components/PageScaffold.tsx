"use client";

import {
  AppShell,
  Avatar,
  Group,
  Header,
  Text,
  UnstyledButton,
  useMantineTheme,
} from "@mantine/core";
import Head from "next/head";
import React, { useState } from "react";

type Props = {
  meta: {
    title: string;
    description: string;
    ogImage?: string;
  };
  /** unique identifier, will be logged */
  pageId: string;
  children: React.ReactNode;

  /** By default app bar is shown */
  hideAppBar?: boolean;
};

/**
 * Used to render a next page.
 * Logs an onload event
 */
const PageScaffold = ({ children, meta, pageId, hideAppBar }: Props) => {
  const { title, description, ogImage } = meta;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.png" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        {ogImage && (
          <meta
            property="og:image"
            content={ogImage} // TODO: provide default
          />
        )}
      </Head>
      {/* p-4 for padding */}
      <AppShellDemo hideAppBar={hideAppBar}>
        <main className="container mx-auto flex flex-col items-center justify-center">
          {children}
        </main>
      </AppShellDemo>
    </>
  );
};

const AppShellDemo = ({
  children,
  hideAppBar,
}: {
  children: any;
  hideAppBar?: boolean;
}) => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  if (hideAppBar) {
    return children;
  }

  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      header={
        <Header
          // height={54}
          height={40}
          p={8}
        >
          <Group
            position="center"
            // position="apart"
            // style={{ display: "flex", alignItems: "center", height: "100%" }}
          >
            <Text>fash.club</Text>

            {/* <UnstyledButton onClick={() => setOpened((o) => !o)}>
              <Avatar src={user?.image} alt={user?.name} radius="xl"></Avatar>
            </UnstyledButton> */}
          </Group>
        </Header>
      }
    >
      {children}
    </AppShell>
  );
};

export default PageScaffold;
