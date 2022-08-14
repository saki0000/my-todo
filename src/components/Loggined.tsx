import { AppShell, Header, Navbar } from "@mantine/core";
import React, { useState } from "react";
import Head from "./Header";

const Loggined = () => {
  const [opened, setOpened] = useState(true);
  return (
    <div>
      <AppShell
        navbar={
          opened ? (
            <Navbar width={{ base: 300 }} hidden={true} height={700} p="xs">
              <Navbar.Section grow>Task</Navbar.Section>
            </Navbar>
          ) : (
            <></>
          )
        }
        header={
          <Header height={70}>
            <Head></Head>
          </Header>
        }
        styles={(theme) => ({
          main: {
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
          },
        })}
      >
        app
      </AppShell>
    </div>
  );
};

export default Loggined;
