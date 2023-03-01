import { AppShell, Header } from "@mantine/core";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { selectUser } from "../../redux/userSlice";
import Head from "../head/Header";
import Main from "./Main";

const Authed = () => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  useEffect(() => {
    !user.uid && navigate("/signIn");
  });
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
