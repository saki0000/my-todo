import { Grid } from "@mantine/core";
import React, { useState } from "react";
import Separate from "../features/subTask/separate/Separate";
import TasksPage from "../features/task/tasks/TasksPage";
import TaskBox from "./layout/TaskBox";

const Main: React.FC = () => {
  const [page, setPage] = useState<boolean>(true);

  console.log("main");

  return (
    <div className=" h-full mx-16 pt-4">
      <Separate />
      <Grid style={{ height: "100%" }}>
        <Grid.Col span={2} className="grid content-center">
          <div>
            <p
              className={`font-bold  text-2xl text-white  ${
                page && "underline"
              } hover:underline decoration-white cursor-pointer`}
              onClick={() => setPage(true)}
            >
              Inbox
            </p>
            <p
              className={`font-bold  text-2xl text-white  ${
                page || "underline"
              } hover:underline decoration-white cursor-pointer`}
              onClick={() => setPage(false)}
            >
              Tasks
            </p>
          </div>
        </Grid.Col>

        {page ? (
          <Grid.Col span={10} className="h-full">
            <TaskBox box={"inbox"} />
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
