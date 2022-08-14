import { AppShell, Navbar } from "@mantine/core";
import React from "react";
import Header from "./Header";

const Loggined = () => {
  return (
    <div>
      <AppShell
        padding="md"
        // navbar={<Navbar width={{ base: 300 }} height={500} p="xs"></Navbar>}
        header={<Header></Header>}
        styles={(theme) => ({
          main: {
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
          },
        })}
      >
        {/* Your application here */}
      </AppShell>
    </div>
  );
};

export default Loggined;
