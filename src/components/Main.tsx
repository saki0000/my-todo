import { Container, Grid, Paper, Stack } from "@mantine/core";
import { useSetState } from "@mantine/hooks";
import Inbox from "./Inbox";
import Separate from "./Separate";
import Task from "./Task";
import Today from "./Today";
import Week from "./Week";

const Main = () => {
  const [state, setState] = useSetState({
    first: <Inbox></Inbox>,
    second: <Separate></Separate>,
    third: <Today></Today>,
    fourth: <Week></Week>,
  });
  return (
    <>
      <Container style={{ height: "100%" }}>
        <Grid style={{ height: "100%" }}>
          <Grid.Col span={8}>
            <Paper p="xl" style={{ height: "100%" }}>
              {state.first}
            </Paper>
          </Grid.Col>
          <Grid.Col span={4}>
            <Stack justify="space-between" style={{ height: "100%" }}>
              <Paper
                p="md"
                style={{ height: "30%" }}
                onClick={() => {
                  setState({ first: state.second, second: state.first });
                }}
              >
                {state.second}
              </Paper>
              <Paper
                p="md"
                style={{ height: "30%" }}
                onClick={() => {
                  setState({ first: state.third, third: state.first });
                }}
              >
                {state.third}
              </Paper>
              <Paper
                p="md"
                style={{ height: "30%" }}
                onClick={() => {
                  setState({ first: state.fourth, fourth: state.first });
                }}
              >
                {state.fourth}
              </Paper>
            </Stack>
          </Grid.Col>
        </Grid>
      </Container>
    </>
  );
};

export default Main;
