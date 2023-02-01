import { TaskType } from "../../../Types";

export type AddTaskType = Omit<TaskType, "updated_at" | "created_at" | "id">;
export type AddSubTaskType = AddTaskType & { task_id: number };
