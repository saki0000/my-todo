import { Grid } from "@mantine/core";
import React, { useState } from "react";
import Inbox from "../../features/fetch/components/Inbox";
import Separate from "../../features/separate/components/Separate";
import InboxNumber from "../button/InboxNumber";
import TasksPage from "./TasksPage";

const Main: React.FC = () => {
  const [page, setPage] = useState<boolean>(true);
  return (
    <div className=" h-full mx-16 pt-4">
      <Separate />
      <Grid className="h-full">
        <Grid.Col span={2} className="grid content-center">
          <div>
            <div className="relative">
              <p
                className={`font-bold  text-2xl text-white  ${
                  page && "underline"
                } hover:underline decoration-white cursor-pointer
              `}
                onClick={() => setPage(true)}
              >
                Inbox
              </p>
              <InboxNumber />
            </div>
            <div>
              <p
                className={`font-bold  text-2xl text-white  ${
                  page || "underline"
                } hover:underline decoration-white cursor-pointer`}
                onClick={() => setPage(false)}
              >
                Tasks
              </p>
            </div>
          </div>
        </Grid.Col>

        {page ? (
          <Grid.Col span={10} className="h-full">
            <Inbox />
          </Grid.Col>
        ) : (
          <>
            <TasksPage />
          </>
        )}
      </Grid>
    </div>
  );
};

export default Main;
