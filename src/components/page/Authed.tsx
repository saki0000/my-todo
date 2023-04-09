import { AppShell, Header, Navbar } from "@mantine/core";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { RecoilRoot } from "recoil";
import Separate from "../../features/separate/components/Separate";
import { selectUser } from "../../redux/userSlice";
import Head from "../head/Header";
import Nav from "../layout/navbar/Nav";

const Authed = () => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    !user.uid && navigate("/signIn");
  });
  return (
    <RecoilRoot>
      <AppShell
        header={
          <Header height={80} className="bg-darkBlue border-none">
            <Head></Head>
          </Header>
        }
        navbar={
          <Navbar width={{ base: 160 }} className="bg-darkBlue border-none">
            <Nav />
          </Navbar>
        }
        className="bg-darkBlue h-screen rounded"
        styles={() => ({
          body: { height: "100%" },
        })}
      >
        <div className="h-full rounded-lg">
          <Separate />

          <Outlet />
        </div>
      </AppShell>
    </RecoilRoot>
  );
};

export default Authed;
