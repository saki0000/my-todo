export type task = {
  box?: "calender" | "inbox" | "nextAction" | "someday";
  created_at?: Date;
  date?: string;
  due_date?: DateFormat | string;
  id?: number;
  memo?: string;
  name?: string;
  statement?: boolean;
  subtasks?: [];
  updated_at?: Date;
  user_id?: string;
  weight?: number;
};
export type DateFormat = `${number}-${number}-${number}`;
