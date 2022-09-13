export type task = {
  box?: boxType;
  created_at?: Date;
  date?: DateFormat | string;
  due_date?: DateFormat | string;
  id?: number;
  memo?: string;
  name?: string;
  statement?: boolean;
  subtasks?: never[];
  updated_at?: Date;
  user_id?: string;
  weight?: number;
};
export type stateType = {
  first: boxType;
  second: boxType;
  third: boxType;
  fourth: boxType;
};
export type user = { uid: string; displayName: string };
export type DateFormat = `${number}-${number}-${number}`;
export type boxType = "calender" | "inbox" | "nextAction" | "someday";
