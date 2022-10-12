import { AppShell, Header } from "@mantine/core";
import { RecoilRoot } from "recoil";
import Head from "../parts/Header";
import Main from "../templates/Main";

const Logined = () => {
  return (
    <RecoilRoot>
      <AppShell
        header={
          <Header height={70}>
            <Head></Head>
          </Header>
        }
        className="bg-indigo-200"
      >
        <Main />
      </AppShell>
    </RecoilRoot>
  );
};

export default Logined;
