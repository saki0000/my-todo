import { AppShell, Header, MantineProvider } from "@mantine/core";
import { RecoilRoot } from "recoil";
import Head from "../head/Header";
import Main from "./Main";

const Logined = () => {
  return (
    <RecoilRoot>
      <MantineProvider
        theme={{
          colors: {
            brown: [
              "#E0E0E0",
              "#CCCCCC",
              "#B8B8B8",
              "#A3A3A3",
              "#8F8F8F",
              "#7A7A7A",
              "#666666",
              "#595959",
              "#4D4D4D",
              "#404040",
            ],
          },
        }}
      >
        <AppShell
          header={
            <Header height={70} className="bg-darkBlue">
              <Head></Head>
            </Header>
          }
          className="bg-darkBlue h-screen"
          styles={(theme) => ({
            body: { height: "100%" },
          })}
        >
          <div className="h-full">
            <Main />
          </div>
        </AppShell>
      </MantineProvider>
    </RecoilRoot>
  );
};

export default Logined;
