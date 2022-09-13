import { Container, Grid, Paper, Stack } from "@mantine/core";
import { useSetState } from "@mantine/hooks";
import Calender from "./Calender";
import React from "react";
import TaskBox from "./TaskBox";
import { useSetRecoilState } from "recoil";
import { stateAtom } from "../../atoms/stateAtom";
import { stateType } from "../../Types";

const Main: React.FC = () => {
  const [state, setState] = useSetState<stateType>({
    first: "inbox",
    second: "calender",
    third: "nextAction",
    fourth: "someday",
  });
  const setStates = useSetRecoilState(stateAtom);

  const components: any = {
    inbox: <TaskBox box={"inbox"} />,
    calender: <Calender></Calender>,
    nextAction: <TaskBox box={"nextAction"} />,
    someday: <TaskBox box={"someday"} />,
  };

  return (
    <>
      <Container style={{ height: "100%" }}>
        <Grid style={{ height: "100%" }}>
          <Grid.Col span={8}>
            <Paper p="xl" style={{ height: "100%" }}>
              {components[state.first]}
            </Paper>
          </Grid.Col>
          <Grid.Col span={4}>
            <Stack justify="space-between" style={{ height: "100%" }}>
              {Object.entries(state).map((key: any) => (
                <>
                  {key[0] !== "first" ? (
                    <Paper
                      p="md"
                      style={{ height: "30%" }}
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
