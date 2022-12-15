import { Grid, Stack } from "@mantine/core";
import { useSetState } from "@mantine/hooks";
import { useSetRecoilState } from "recoil";
import { stateAtom } from "../../../atoms/stateAtom";
import TaskBox from "../../../components/layout/TaskBox";
import { boxType, orderType } from "../../../Types";
import Calender from "../../calendar/Calender";

type NewBoxType = Exclude<boxType, "inbox">;
type NewOrderType = Exclude<orderType, "fourth">;
type componentsType = {
  [k in NewBoxType]: JSX.Element;
};
type stateType = {
  [k in NewOrderType]: NewBoxType;
};

const TasksPage = () => {
  const [state, setState] = useSetState<stateType>({
    first: "nextAction",
    second: "calender",
    third: "someday",
  });
  const setStates = useSetRecoilState(stateAtom);

  const components: componentsType = {
    calender: <Calender></Calender>,
    nextAction: <TaskBox box={"nextAction"} />,
    someday: <TaskBox box={"someday"} />,
  };
  return (
    <>
      <Grid.Col span={7} className="h-full">
        {components[state.first]}
      </Grid.Col>
      <Grid.Col span={3} className="h-full">
        <Stack justify="space-between" style={{ height: "100%" }}>
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
