import { Container, Grid, Paper, Stack } from "@mantine/core";
import { useSetState } from "@mantine/hooks";
import Inbox from "./Inbox";
import Separate from "./Separate";
import Today from "./Today";
import Week from "./Week";

const Main = () => {
  const [state, setState] = useSetState<any>({
    first: <Inbox first={true}></Inbox>,
    second: <Separate first={false}></Separate>,
    third: <Today first={false}></Today>,
    fourth: <Week first={false}></Week>,
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
              {Object.entries(state).map((key: any) => (
                <>
                  {key[0] !== "first" ? (
                    <Paper
                      p="md"
                      style={{ height: "30%" }}
                      onClick={() => {
                        key[1].props = false;
                        setState({ first: key[1], [key[0]]: state.first });
                        console.log(state);
                      }}
                    >
                      {key[1]}
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
