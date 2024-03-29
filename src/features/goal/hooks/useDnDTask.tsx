import React, { useRef } from "react";
import { TaskType } from "../../../types/Types";
import { DnDRef, DnDResult, Position } from "../type/type";
import useUpdateGoal from "./useUpdateGoal";

const useDnDTask = <T,>(
  defaultTasks: TaskType[],
  goalTasks: TaskType[],
  taskAreaRef?: any,
  goalAreaRef?: any
):
  | {
      hover?: { tasks: boolean; goal: boolean };
      tasks: DnDResult<TaskType>[] | undefined;
      goal: DnDResult<TaskType>[] | undefined;
    }
  | undefined => {
  if (!defaultTasks) return;
  // const [items, setItems] = useState<{ tasks: TaskType[]; goal: TaskType[] }>({
  //   tasks: defaultTasks,
  //   goal: goalTasks,
  // });

  const state = useRef<DnDRef<TaskType>>({
    dndItems: { task: [], goal: [] },
    keys: new Map(),
    dragElement: null,
    canCheckHovered: true,
    pointerPosition: { x: 0, y: 0 },
  }).current;
  const { dragElement, dndItems } = state;
  const dragIndex = dndItems.goal.findIndex(
    ({ key }) => key === dragElement?.key
  );
  const mutation = useUpdateGoal();
  const deleteMutation = useUpdateGoal(dragIndex, "delete");

  const isHover = (event: MouseEvent, element: HTMLElement): boolean => {
    // マウスポインターの座標を取得
    const clientX = event.clientX;
    const clientY = event.clientY;

    // 重なりを判定する要素のサイズと座標を取得
    const rect = element.getBoundingClientRect();

    // マウスポインターが要素と重なっているかを判定する
    return (
      clientY < rect.bottom &&
      clientY > rect.top &&
      clientX < rect.right &&
      clientX > rect.left
    );
  };

  const onMouseMove = (event: MouseEvent) => {
    const { clientX, clientY } = event;
    const { dndItems, dragElement, pointerPosition } = state;
    // ドラッグして無ければ何もしない
    if (!dragElement) return;

    // マウスポインターの移動量を計算
    const x = clientX - pointerPosition.x;
    const y = clientY - pointerPosition.y;

    const dragStyle = dragElement.element.style;

    // ドラッグ要素の座標とスタイルを更新
    dragStyle.zIndex = "100";
    dragStyle.cursor = "grabbing";
    dragStyle.transform = `translate(${x}px,${y}px)`;
    dragStyle.border = "1px solid #cbd5e1";
    state.canCheckHovered = false;
    setTimeout(() => (state.canCheckHovered = true), 300);

    const goalAddAreaStyle = goalAreaRef.element.lastElementChild.style;
    const taskAddAreaStyle = taskAreaRef.element.lastElementChild.style;

    if (isHover(event, goalAreaRef.element) && dragElement.parent == "task") {
      goalAddAreaStyle.visibility = "visible";
    } else {
      goalAddAreaStyle.visibility = "hidden";
    }
    if (isHover(event, taskAreaRef.element) && dragElement.parent == "goal") {
      taskAddAreaStyle.visibility = "visible";
    } else {
      taskAddAreaStyle.visibility = "hidden";
    }
  };

  const onMouseUp = (event: MouseEvent) => {
    const { dragElement, dndItems } = state;
    state.canCheckHovered = false;
    setTimeout(() => (state.canCheckHovered = true), 300);
    // ドラッグしていなかったら何もしない
    if (!dragElement) return;
    if (dragElement.parent === "task") {
      const dragIndex = dndItems.task.findIndex(
        ({ key }) => key === dragElement.key
      );
      if (isHover(event, goalAreaRef.element)) {
        const goal = goalTasks;
        const tasks = defaultTasks;
        goal.push(dragElement.value);
        tasks.splice(dragIndex, 1);
        dndItems.task.splice(dragIndex, 1);
        const { left: x, top: y } = dragElement.element.getBoundingClientRect();
        dragElement.parent = "goal";
        dragElement.position = { x, y };
        // setItems({ tasks: tasks, goal: goal });
        mutation.mutate({ ...dragElement.value, goal: goalAreaRef.today });
      }
    } else if (dragElement.parent == "goal") {
      const dragIndex = dndItems.goal.findIndex(
        ({ key }) => key === dragElement.key
      );
      if (isHover(event, taskAreaRef.element)) {
        const goal = goalTasks;
        const tasks = defaultTasks;
        tasks.push(dragElement.value);
        goal.splice(dragIndex, 1);
        dndItems.goal.splice(dragIndex, 1);
        const { left: x, top: y } = dragElement.element.getBoundingClientRect();
        dragElement.position = { x, y };
        dragElement.parent = "task";
        // setItems({ tasks: tasks, goal: goal });
        deleteMutation.mutate({ ...dragElement.value, goal: "" });
      }
    }
    const goalAddAreaStyle = goalAreaRef.element.lastElementChild.style;
    const taskAddAreaStyle = taskAreaRef.element.lastElementChild.style;
    goalAddAreaStyle.visibility = "hidden";
    taskAddAreaStyle.visibility = "hidden";

    const dragStyle = dragElement.element.style;

    // ドラッグしてる要素に適用していたCSSを削除
    dragStyle.zIndex = "";
    dragStyle.cursor = "";
    dragStyle.transform = "";
    dragStyle.border = "";

    // ドラッグしている要素をstateから削除
    state.dragElement = null;

    // windowに登録していたイベントを削除
    window.removeEventListener("mouseup", onMouseUp);
    window.removeEventListener("mousemove", onMouseMove);
  };

  const mapFunc = (value: TaskType, type: string): DnDResult<TaskType> => {
    const key = state.keys.get(value) || Math.random().toString(16);

    // 生成したkey文字列を保存
    state.keys.set(value, key);
    return {
      value,

      key: Math.random().toString(16),

      events: {
        ref: (element: HTMLElement | null) => {
          if (!element) return;

          const { dndItems, pointerPosition } = state;
          // 位置をリセットする
          element.style.transform = "";

          // 要素の位置を取得
          const { left: x, top: y } = element.getBoundingClientRect();
          const position: Position = { x, y };

          if (type === "task") {
            const itemIndex = dndItems.task.findIndex(
              (item) => item.key === key
            );
            if (itemIndex === -1) {
              return dndItems.task.push({
                key,
                value,
                element,
                position,
                parent: "task",
              });
            }
            if (dragElement?.key === key) {
              // ドラッグ要素のズレを計算する
              const dragX = dragElement.position.x - position.x;
              const dragY = dragElement.position.y - position.y;

              // 入れ替え時のズレを無くす
              element.style.transform = `translate(${dragX}px,${dragY}px)`;

              // マウスポインターの位置も再計算してズレを無くす
              pointerPosition.x -= dragX;
              pointerPosition.y -= dragY;
            }
            // 要素を更新する
            state.dndItems.task[itemIndex] = {
              key,
              value,
              element,
              position,
              parent: "task",
            };
          } else {
            const itemIndex = dndItems.goal.findIndex(
              (item) => item.key === key
            );
            if (itemIndex === -1) {
              return dndItems.goal.push({
                key,
                value,
                element,
                position,
                parent: "goal",
              });
            }
            if (dragElement?.key === key) {
              // ドラッグ要素のズレを計算する
              const dragX = dragElement.position.x - position.x;
              const dragY = dragElement.position.y - position.y;

              // 入れ替え時のズレを無くす
              element.style.transform = `translate(${dragX}px,${dragY}px)`;

              // マウスポインターの位置も再計算してズレを無くす
              pointerPosition.x -= dragX;
              pointerPosition.y -= dragY;
            }
            // 要素を更新する
            state.dndItems.goal[itemIndex] = {
              key,
              value,
              element,
              position,
              parent: "goal",
            };
          }

          // 要素が無ければ新しく追加して処理を終わる
        },

        onMouseDown: (event: React.MouseEvent<HTMLElement>) => {
          // ドラッグする要素(DOM)
          const element = event.currentTarget;
          const parent = element.parentElement?.id;

          // マウスポインターの座標を保持しておく
          state.pointerPosition.x = event.clientX;
          state.pointerPosition.y = event.clientY;

          // ドラッグしている要素のスタイルを上書き
          element.style.transition = ""; // アニメーションを無効にする
          element.style.cursor = "grabbing"; // カーソルのデザインを変更

          // 要素の座標を取得
          const { left: x, top: y } = element.getBoundingClientRect();
          const position: Position = { x, y };

          // ドラッグする要素を保持しておく
          state.dragElement = { key, value, element, position, parent };

          // mousemove, mouseupイベントをwindowに登録する
          window.addEventListener("mouseup", onMouseUp);
          window.addEventListener("mousemove", onMouseMove);
        },
      },
    };
  };

  const returnItems = {
    tasks: defaultTasks.map((v) => mapFunc(v, "task")),
    goal:
      goalTasks && goalTasks.length != 0
        ? goalTasks.map((v) => mapFunc(v, "goal"))
        : undefined,
  };

  return returnItems;
};

export default useDnDTask;
