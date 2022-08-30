import { Container, Grid, Paper, Stack } from "@mantine/core";
import { useSetState } from "@mantine/hooks";
import Inbox from "./Inbox";
import NextAction from "./NextAction";
import Week from "./Week";
import Calender from "./Calender";

const Main = () => {
  const [state, setState] = useSetState<any>({
    first: "inbox",
    second: "calender",
    third: "nextAction",
    fourth: "someday",
  });

  const components: any = {
    inbox: <Inbox state={state}></Inbox>,
    calender: <Calender state={state}></Calender>,
    nextAction: <NextAction state={state}></NextAction>,
    someday: <Week state={state}></Week>,
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
