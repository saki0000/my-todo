export type TaskType = {
  box: BoxType;
  created_at: Date;
  date: DateFormat | string;
  due_date: DateFormat | string;
  id: number;
  memo: string;
  name: string;
  statement: boolean;
  subtasks: never[];
  updated_at: Date;
  user_id: string;
  weight: string;
  goal: string;
  parent_id: number | null;
};
export type SubTaskType = TaskType & { task_id: number };
export type StateType = {
  [k in OrderType]: BoxType;
};
export type OrderType = "first" | "second" | "third" | "fourth";
export type User = { uid: string; displayName: string };
export type DateFormat = `${number}-${number}-${number}`;
export type BoxType = "calender" | "inbox" | "nextAction" | "someday";
