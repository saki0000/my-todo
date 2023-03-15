import React, { useRef, useState } from "react";
import { TaskType } from "../../../types/Types";
type DnDResult<T> = {
  key: string;
  value: T;
  events: {
    ref: (element: HTMLElement | null) => void;
    onMouseDown: (event: React.MouseEvent<HTMLElement>) => void;
  };
};
type Position = {
  x: number;
  y: number;
};

// ドラッグ＆ドロップ要素の情報をまとめた型
type DnDItem<T> = {
  value: TaskType; // useDnDSort()の引数に渡された配列の要素の値
  key: string; // 要素と紐づいた一意な文字列
  position: Position; // 要素の座標
  element: HTMLElement; // DOM情報
  parent: string | undefined;
};
type DnDRef<T> = {
  keys: Map<T, string>; // 要素に紐づいたkey文字列を管理するMap
  dndItems: { task: DnDItem<T>[]; goal: DnDItem<T>[] }; // 並び替える全ての要素を保持するための配列
  canCheckHovered: boolean; // 重なり判定ができるかのフラグ
  pointerPosition: Position; // マウスポインターの座標
  dragElement: DnDItem<T> | null; // ドラッグしてる要素
};

const useDnDTask = <T,>(
  defaultTasks: TaskType[],
  goalTasks: TaskType[],
  taskAreaRef?: any,
  goalAreaRef?: any
):
  | {
      tasks: DnDResult<TaskType>[] | undefined;
      goal: DnDResult<TaskType>[] | undefined;
    }
  | undefined => {
  if (!defaultTasks) return;
  const [items, setItems] = useState<{ tasks: TaskType[]; goal: TaskType[] }>({
    tasks: defaultTasks,
    goal: goalTasks,
  });

  const state = useRef<DnDRef<TaskType>>({
    dndItems: { task: [], goal: [] },
    keys: new Map(),
    dragElement: null,
    canCheckHovered: true,
    pointerPosition: { x: 0, y: 0 },
  }).current;

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
        const goal = items.goal;
        const tasks = items.tasks;
        goal.push(dragElement.value);
        tasks.splice(dragIndex, 1);
        console.log(dragElement, dragIndex);
        const { left: x, top: y } = dragElement.element.getBoundingClientRect();
        dragElement.parent = "goal";
        dragElement.position = { x, y };
        setItems({ tasks: tasks, goal: goal });
      }
    } else if (dragElement.parent == "goal") {
      const dragIndex = dndItems.goal.findIndex(
        ({ key }) => key === dragElement.key
      );
      if (isHover(event, taskAreaRef.element)) {
        const goal = items.goal;
        const tasks = items.tasks;
        tasks.push(dragElement.value);
        goal.splice(dragIndex, 1);
        const { left: x, top: y } = dragElement.element.getBoundingClientRect();
        dragElement.position = { x, y };
        dragElement.parent = "task";
        setItems({ tasks: tasks, goal: goal });
      }
    }

    const dragStyle = dragElement.element.style;

    // ドラッグしてる要素に適用していたCSSを削除
    dragStyle.zIndex = "";
    dragStyle.cursor = "";
    dragStyle.transform = "";

    // ドラッグしている要素をstateから削除
    state.dragElement = null;

    // windowに登録していたイベントを削除
    window.removeEventListener("mouseup", onMouseUp);
    window.removeEventListener("mousemove", onMouseMove);
  };

  console.log(items);

  return {
    tasks: items.tasks.map((value: TaskType): DnDResult<TaskType> => {
      const key = state.keys.get(value) || Math.random().toString(16);

      // 生成したkey文字列を保存
      state.keys.set(value, key);
      return {
        value,

        key: Math.random().toString(16),

        events: {
          ref: (element: HTMLElement | null) => {
            if (!element) return;

            const { dndItems } = state;
            // 位置をリセットする
            element.style.transform = "";

            // 要素の位置を取得
            const { left: x, top: y } = element.getBoundingClientRect();
            const position: Position = { x, y };

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
            // 要素を更新する
            state.dndItems.task[itemIndex] = {
              key,
              value,
              element,
              position,
              parent: "task",
            };

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
    }),
    goal:
      items.goal && items.goal.length != 0
        ? items.goal.map((value: TaskType): DnDResult<TaskType> => {
            const key = state.keys.get(value) || Math.random().toString(16);

            // 生成したkey文字列を保存
            state.keys.set(value, key);
            return {
              value,

              key: Math.random().toString(16),

              events: {
                ref: (element: HTMLElement | null) => {
                  if (!element) return;

                  const { dndItems } = state;
                  const parent = element.parentElement?.id;
                  // 位置をリセットする
                  element.style.transform = "";

                  // 要素の位置を取得
                  const { left: x, top: y } = element.getBoundingClientRect();
                  const position: Position = { x, y };

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
                  // 要素を更新する
                  state.dndItems.goal[itemIndex] = {
                    key,
                    value,
                    element,
                    position,
                    parent: "goal",
                  };

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
          })
        : undefined,
  };
};

export default useDnDTask;
