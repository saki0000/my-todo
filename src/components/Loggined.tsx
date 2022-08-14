import { AppShell, Header, Navbar, Text } from "@mantine/core";
import React, { useState } from "react";
import Head from "./Header";
import Main from "./Main";

const Loggined = () => {
  const [opened, setOpened] = useState(true);
  return (
    <div>
      <AppShell
        navbar={
          opened ? (
            <Navbar width={{ base: 300 }} hidden={true} p="xl">
              <Navbar.Section>
                <Text>Task</Text>
              </Navbar.Section>
              <Navbar.Section>
                <Text>今日</Text>
              </Navbar.Section>
              <Navbar.Section>
                <Text>今週</Text>
              </Navbar.Section>
            </Navbar>
          ) : (
            <></>
          )
        }
        header={
          <Header height={70}>
            <Head setOpened={setOpened} opened={opened}></Head>
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
        <Main />
      </AppShell>
    </div>
  );
};

export default Loggined;
