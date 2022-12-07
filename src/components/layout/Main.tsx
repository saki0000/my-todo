import { Container, Grid, Paper, Stack } from "@mantine/core";
import { useSetState } from "@mantine/hooks";
import React from "react";
import { useSetRecoilState } from "recoil";
import { stateAtom } from "../../atoms/stateAtom";
import Calender from "../../features/calendar/Calender";
import { boxType, stateType } from "../../Types";
import TaskBox from "./taskbox/TaskBox";

type componentsType = {
  [k in boxType]: JSX.Element;
};

const Main: React.FC = () => {
  const [state, setState] = useSetState<stateType>({
    first: "inbox",
    second: "calender",
    third: "nextAction",
    fourth: "someday",
  });
  const setStates = useSetRecoilState(stateAtom);

  const components: componentsType = {
    inbox: <TaskBox box={"inbox"} />,
    calender: <Calender></Calender>,
    nextAction: <TaskBox box={"nextAction"} />,
    someday: <TaskBox box={"someday"} />,
  };

  return (
    <>
      <Container className="pt-5" style={{ height: "100%" }}>
        <Grid style={{ height: "100%" }}>
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
          <Grid.Col span={4}>
            <Stack justify="space-between" style={{ height: "100%" }}>
              {Object.entries(state).map((key: [string, boxType]) => (
                <>
                  {key[0] !== "first" ? (
                    <Paper
                      key={key[0]}
                      p="md"
                      shadow="sm"
                      style={{ height: "30%" }}
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
        </Grid>
      </Container>
    </>
  );
};

export default Main;
