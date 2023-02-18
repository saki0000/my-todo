import { AppShell, Header } from "@mantine/core";
import { RecoilRoot } from "recoil";
import Head from "../../../components/head/Header";
import Main from "../../../components/page/Main";

const Authed = () => {
  return (
    <RecoilRoot>
      <AppShell
        header={
          <Header height={70} className="bg-darkBlue">
            <Head></Head>
          </Header>
        }
        className="bg-darkBlue h-screen"
        styles={() => ({
          body: { height: "100%" },
        })}
      >
        <div className="h-full">
          <Main />
        </div>
      </AppShell>
    </RecoilRoot>
  );
};

export default Authed;
