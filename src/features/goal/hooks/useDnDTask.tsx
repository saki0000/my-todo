import React, { useRef, useState } from "react";
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
  value: T; // useDnDSort()の引数に渡された配列の要素の値
  key: string; // 要素と紐づいた一意な文字列
  position: Position; // 要素の座標
  element: HTMLElement; // DOM情報
};
type DnDRef<T> = {
  keys: Map<T, string>; // 要素に紐づいたkey文字列を管理するMap
  dndItems: DnDItem<T>[]; // 並び替える全ての要素を保持するための配列
  canCheckHovered: boolean; // 重なり判定ができるかのフラグ
  pointerPosition: Position; // マウスポインターの座標
  dragElement: DnDItem<T> | null; // ドラッグしてる要素
};

const useDnDTask = <T,>(
  defaultTasks: T[],
  ref?: any
): DnDResult<T>[] | undefined => {
  if (defaultTasks) {
    const [items, setItems] = useState<{ tasks: T[]; goalTasks: T[] }>({
      tasks: defaultTasks,
      goalTasks: [],
    });
    const state = useRef<DnDRef<T>>({
      dndItems: [],
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
      if (!state.canCheckHovered) return;

      // 確認できないようにする
      state.canCheckHovered = false;
      setTimeout(() => (state.canCheckHovered = true), 300);
      const dragIndex = dndItems.findIndex(
        ({ key }) => key === dragElement.key
      );
      const hoveredIndex = dndItems.findIndex(
        ({ element }, index) => index !== dragIndex && isHover(event, element)
      );
      console.log(isHover(event, ref.element));

      if (hoveredIndex !== -1) {
        // ホバーしていればコンソール画面に"Hello World!"を表示
        console.log("Hello World!");
      }
    };
    const onMouseUp = (event: MouseEvent) => {
      const { dragElement } = state;

      // ドラッグしていなかったら何もしない
      if (!dragElement) return;

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

    return (
      items &&
      items.tasks.map((value: T): DnDResult<T> => {
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

              const itemIndex = dndItems.findIndex((item) => item.key === key);

              // 要素が無ければ新しく追加して処理を終わる
              if (itemIndex === -1) {
                return dndItems.push({ key, value, element, position });
              }
              // 要素を更新する
              state.dndItems[itemIndex] = { key, value, element, position };
            },

            onMouseDown: (event: React.MouseEvent<HTMLElement>) => {
              // ドラッグする要素(DOM)
              const element = event.currentTarget;

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
              state.dragElement = { key, value, element, position };

              // mousemove, mouseupイベントをwindowに登録する
              window.addEventListener("mouseup", onMouseUp);
              window.addEventListener("mousemove", onMouseMove);
            },
          },
        };
      })
    );
  }
};

export default useDnDTask;
