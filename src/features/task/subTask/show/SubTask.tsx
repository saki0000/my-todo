import { ActionIcon, Badge, Checkbox, Group, Stack, Text } from "@mantine/core";
import { useSetState } from "@mantine/hooks";
import React, { useState } from "react";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineEnter } from "react-icons/ai";
import { useRecoilValue } from "recoil";
import { deleteSubTask } from "../../../../api";
import { separateAtom } from "../../../../atoms/openAtom";
import { stateAtom } from "../../../../atoms/stateAtom";
import { task } from "../../../../Types";
import UpdateTask from "../../update/layout/UpdateTask";

type props = { task: task & { id: number }; mutate: any };
const SubTask = React.memo(({ task, mutate }: props) => {
  const modalValue = useRecoilValue(separateAtom);
  const [tasks, setTasks] = useSetState(task);
  const [open, setOpen] = useState(false);
  const state = useRecoilValue(stateAtom);
  return (
    <>
      {open ? (
        <UpdateTask
          task={tasks}
          setOpen={setOpen}
          setTasks={setTasks}
          mutate={mutate}
          sub={true}
        />
      ) : (
        <Stack key={task.id}>
          <Group
            position="apart"
            style={{
              marginTop: 10,
              // marginBottom: 10,
              marginRight: 30,
              marginLeft: 40,
            }}
            key={tasks.id}
          >
            <Group>
              <AiOutlineEnter
                style={{ transform: "scale(-1,1)" }}
              ></AiOutlineEnter>
              <Checkbox checked={false} onChange={() => {}} />
              <Text>{tasks?.name}</Text>
            </Group>
            {state.first === task.box && (
              <Group>
                <ActionIcon
                  onClick={() => {
                    setOpen(true);
                  }}
                >
                  <AiOutlineEdit></AiOutlineEdit>
                </ActionIcon>
                <ActionIcon
                  onClick={() => {
                    mutate(deleteSubTask(modalValue.id, task.id));
                  }}
                >
                  <AiOutlineDelete></AiOutlineDelete>
                </ActionIcon>
              </Group>
            )}
          </Group>
          {tasks.weight === 0 &&
          (tasks.due_date === "" || tasks.due_date === "期日") ? (
            <></>
          ) : (
            <>
              <Group style={{ marginLeft: 30 }}>
                {tasks.weight !== 0 && <Badge>{tasks?.weight}</Badge>}
                {tasks.due_date && tasks.due_date !== "期日" && (
                  <Badge>{tasks?.due_date}</Badge>
                )}
              </Group>
            </>
          )}

          <Text color="gray" style={{ marginLeft: 70 }}>
            {tasks.memo}
          </Text>
        </Stack>
      )}
    </>
  );
});

export default SubTask;