import { AppShell, Center, Header, Navbar, Text } from "@mantine/core";
import React, { useState } from "react";
import DoneTask from "../templates/DoneTask";
import Head from "../parts/Header";
import Main from "../templates/Main";

const Logined = () => {
  const [opened, setOpened] = useState<boolean>(false);
  const [page, setPage] = useState<boolean>(true);
  return (
    <div>
      <AppShell
        navbar={
          opened ? (
            <Navbar width={{ base: 300 }} hidden={true} p="xl">
              <Navbar.Section style={{ marginTop: 30 }}>
                <Center>
                  <Text
                    onClick={() => {
                      setPage(true);
                    }}
                  >
                    Task
                  </Text>
                </Center>
              </Navbar.Section>
              <Navbar.Section style={{ marginTop: 30 }}>
                <Center>
                  <Text
                    onClick={() => {
                      setPage(false);
                    }}
                  >
                    Done Task
                  </Text>
                </Center>
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
        {page ? <Main /> : <DoneTask />}
      </AppShell>
    </div>
  );
};

export default Logined;
