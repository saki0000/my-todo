import { AppShell, Header } from "@mantine/core";
import { RecoilRoot } from "recoil";
import Head from "../head/Header";
import Main from "./Main";

const Logined = () => {
  return (
    <RecoilRoot>
      <AppShell
        header={
          <Header height={70} className="bg-indigo-200 border-none">
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
