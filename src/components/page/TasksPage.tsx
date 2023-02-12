import { Grid, Stack } from "@mantine/core";
import { useSetState } from "@mantine/hooks";
import { useSetRecoilState } from "recoil";
import { stateAtom } from "../../atoms/stateAtom";
import Calender from "../../features/calendar/components/CalenderTasks";
import NextActionBox from "../../features/fetch/components/NextActionBox";
import SomedayBox from "../../features/fetch/components/SomedayBox";
import { BoxType, OrderType } from "../../Types";

type NewBoxType = Exclude<BoxType, "inbox">;
type NewOrderType = Exclude<OrderType, "fourth">;
type ComponentsType = {
  [k in NewBoxType]: JSX.Element;
};
type StateType = {
  [k in NewOrderType]: NewBoxType;
};

const TasksPage: React.FC = () => {
  const [state, setState] = useSetState<StateType>({
    first: "nextAction",
    second: "calender",
    third: "someday",
  });
  const setStates = useSetRecoilState(stateAtom);

  const components: ComponentsType = {
    calender: <Calender></Calender>,
    nextAction: <NextActionBox />,
    someday: <SomedayBox />,
  };
  return (
    <>
      <Grid.Col span={7} className="h-full">
        {components[state.first]}
      </Grid.Col>
      <Grid.Col span={3} className="h-full">
        <Stack justify="space-between" className="h-full">
          {Object.entries(state).map((key: [string, NewBoxType]) => (
            <>
              {key[0] !== "first" ? (
                <div
                  key={key[0]}
                  style={{ height: "49%" }}
                  onClick={() => {
                    setState({ first: key[1], [key[0]]: state.first });
                    setStates({ first: key[1] });
                  }}
                  className="cursor-pointer hover:shadow-2xl"
                >
                  {components[key[1]]}
                </div>
              ) : (
                <></>
              )}
            </>
          ))}
        </Stack>
      </Grid.Col>
    </>
  );
};

export default TasksPage;
