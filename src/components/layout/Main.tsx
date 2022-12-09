import { Grid, Paper, Stack } from "@mantine/core";
import { useSetState } from "@mantine/hooks";
import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import { stateAtom } from "../../atoms/stateAtom";
import Calender from "../../features/calendar/Calender";
import Separate from "../../features/task/subTask/separate/Separate";
import { boxType, orderType } from "../../Types";
import TaskBox from "./taskbox/TaskBox";

type NewBoxType = Exclude<boxType, "inbox">;
type NewOrderType = Exclude<orderType, "fourth">;
type componentsType = {
  [k in NewBoxType]: JSX.Element;
};
type stateType = {
  [k in NewOrderType]: NewBoxType;
};

const Main: React.FC = () => {
  const [state, setState] = useSetState<stateType>({
    // first: "inbox",
    first: "nextAction",
    second: "calender",
    third: "someday",
  });
  const [page, setPage] = useState<boolean>(true);
  const setStates = useSetRecoilState(stateAtom);

  const components: componentsType = {
    // inbox: <TaskBox box={"inbox"} />,
    calender: <Calender></Calender>,
    nextAction: <TaskBox box={"nextAction"} />,
    someday: <TaskBox box={"someday"} />,
  };

  return (
    <div className=" h-full mx-16">
      {/* <Container className="pt-5" style={{ height: "100%" }}> */}
      <Separate />
      <Grid style={{ height: "100%" }}>
        <Grid.Col span={1} className="grid content-center">
          <div>
            <p
              className="font-bold  text-xl text-white"
              onClick={() => setPage(true)}
            >
              Inbox
            </p>
            <p
              className="font-bold  text-xl text-white"
              onClick={() => setPage(false)}
            >
              Tasks
            </p>
          </div>
        </Grid.Col>

        {page ? (
          <Grid.Col span={11}>
            <Paper
              key={state.first}
              p="xl"
              shadow="lg"
              style={{ height: "100%" }}
              radius="md"
            >
              <TaskBox box={"inbox"} />
            </Paper>
          </Grid.Col>
        ) : (
          <>
            <Grid.Col span={8}>
              <Paper
                key={state.first}
                p="xl"
                shadow="lg"
                style={{ height: "100%" }}
                radius="md"
              >
                {components[state.first]}
              </Paper>
            </Grid.Col>
            <Grid.Col span={3}>
              <Stack justify="space-between" style={{ height: "100%" }}>
                {Object.entries(state).map((key: [string, NewBoxType]) => (
                  <>
                    {key[0] !== "first" ? (
                      <Paper
                        key={key[0]}
                        p="md"
                        shadow="sm"
                        style={{ height: "49%" }}
                        radius="md"
                        onClick={() => {
                          setState({ first: key[1], [key[0]]: state.first });
                          setStates({ first: key[1] });
                        }}
                      >
                        {components[key[1]]}
                      </Paper>
                    ) : (
                      <></>
                    )}
                  </>
                ))}
              </Stack>
            </Grid.Col>
          </>
        )}
      </Grid>

      {/* </Container> */}
    </div>
  );
};

export default Main;
