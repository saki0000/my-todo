import { Divider, ScrollArea, Stack, Text } from "@mantine/core";
import { useElementSize } from "@mantine/hooks";
import AddTask from "./AddTask";
import Task from "../parts/Task";

const TaskBox = ({ tasks, setTasks, state, box }: any) => {
  const { ref, height } = useElementSize();
  const boxes: any = {
    inbox: "Inbox",
    // today: "今日",
    someday: "Someday",
    nextAction: "Next Action",
  };

  return (
    <>
      {state.first === box ? (
        <>
          {console.log(state.first)}
          <Stack style={{ height: "100%" }}>
            <Text>{boxes[box]}</Text>
            <Divider />
            <div style={{ height: "100%" }} ref={ref}>
              <ScrollArea.Autosize maxHeight={height}>
                {tasks &&
                  tasks.map((task: any, index: number) => (
                    <Task
                      task={task}
                      first={true}
                      allTask={tasks}
                      setAllTask={setTasks}
                      index={index}
                    />
                  ))}
                <AddTask
                  box={state.first}
                  tasks={tasks}
                  setTasks={setTasks}
                  done={true}
                />
                <Divider />
              </ScrollArea.Autosize>
            </div>
          </Stack>
        </>
      ) : (
        <>
          <div>
            <Stack>
              <Text>{boxes[box]}</Text>
              <Divider />
              {tasks && <Task task={tasks[0]} first={false} />}
            </Stack>
          </div>
        </>
      )}
    </>
  );
};

export default TaskBox;
