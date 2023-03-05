import { Grid } from "@mantine/core";
import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import Separate from "../../features/separate/components/Separate";
import InboxNumber from "../button/InboxNumber";

const Main: React.FC = () => {
  const location = useLocation();
  console.log(location.pathname);
  return (
    <div className=" h-full mx-16 pt-4">
      <Separate />
      <Grid className="h-full">
        <Grid.Col span={2} className="grid content-center">
          <div>
            <Link to="/" className="no-underline">
              <div className="relative">
                <p
                  className={`font-bold  text-2xl text-white  ${
                    location.pathname == "/" && "underline"
                  } hover:underline decoration-white cursor-pointer
              `}
                >
                  Inbox
                </p>
                <InboxNumber />
              </div>
            </Link>
            <Link to="/tasks" className="no-underline">
              <div>
                <p
                  className={`font-bold  text-2xl text-white  ${
                    location.pathname == "/tasks" && "underline"
                  } hover:underline decoration-white cursor-pointer`}
                >
                  Tasks
                </p>
              </div>
            </Link>
          </div>
        </Grid.Col>
        <Outlet />
      </Grid>
    </div>
  );
};

export default Main;
