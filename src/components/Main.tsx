import { Grid } from "@mantine/core";
import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { inboxNumber } from "../atoms/inboxNumberAtom";
import TaskBox from "../features/box/TaskBox";
import Separate from "../features/separate/components/Separate";
import TasksPage from "./layout/tasks/TasksPage";

const Main: React.FC = () => {
  const [page, setPage] = useState<boolean>(true);
  const inbox = useRecoilValue(inboxNumber);

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
              {inbox !== 0 && inbox && (
                <div className="bg-brown h-6 w-6  rounded-full text-center absolute top-0 left-16">
                  <p className="text-white m-0 font-semibold">{inbox}</p>
                </div>
              )}
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
