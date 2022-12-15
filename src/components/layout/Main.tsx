import { Grid, Stack } from "@mantine/core";
import { useSetState } from "@mantine/hooks";
import React, { useState } from "react";
import { useSetRecoilState } from "recoil";
import { stateAtom } from "../../atoms/stateAtom";
import Separate from "../../features/subTask/separate/Separate";
import { boxType, orderType } from "../../Types";
import Calender from "./Calender";
import TaskBox from "./TaskBox";

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
    first: "nextAction",
    second: "calender",
    third: "someday",
  });
  const [page, setPage] = useState<boolean>(true);
  const setStates = useSetRecoilState(stateAtom);

  const components: componentsType = {
    calender: <Calender></Calender>,
    nextAction: <TaskBox box={"nextAction"} />,
    someday: <TaskBox box={"someday"} />,
  };
  console.log("main");

  return (
    <div className=" h-full mx-16 pt-4">
      <Separate />
      <Grid style={{ height: "100%" }}>
        <Grid.Col span={2} className="grid content-center">
          <div>
            <p
              className={`font-bold  text-2xl text-white  ${
                page && "underline"
              } hover:underline decoration-white cursor-pointer`}
              onClick={() => setPage(true)}
            >
              Inbox
            </p>
            <p
              className={`font-bold  text-2xl text-white  ${
                page || "underline"
              } hover:underline decoration-white cursor-pointer`}
              onClick={() => setPage(false)}
            >
              Tasks
            </p>
          </div>
        </Grid.Col>

        {page ? (
          <Grid.Col span={10}>
            <TaskBox box={"inbox"} />
          </Grid.Col>
        ) : (
          <>
            <Grid.Col span={7}>{components[state.first]}</Grid.Col>
            <Grid.Col span={3}>
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
        )}
      </Grid>
    </div>
  );
};

export default Main;
