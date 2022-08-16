import { Container, Grid, Paper, Stack } from "@mantine/core";
import { useSetState } from "@mantine/hooks";
import Inbox from "../parts/Inbox";
import Separate from "../parts/Separate";
import Today from "../parts/Today";
import Week from "../parts/Week";

const Main = () => {
  const [state, setState] = useSetState<any>({
    first: "inbox",
    second: "separate",
    third: "today",
    fourth: "week",
  });
  const components: any = {
    inbox: <Inbox state={state}></Inbox>,
    separate: <Separate state={state}></Separate>,
    today: <Today state={state}></Today>,
    week: <Week state={state}></Week>,
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
