import { TaskType } from "../../../types/Types";

export type DnDResult<T> = {
  key: string;
  value: T;
  events: {
    ref: (element: HTMLElement | null) => void;
    onMouseDown: (event: React.MouseEvent<HTMLElement>) => void;
  };
};
export type Position = {
  x: number;
  y: number;
};

// ドラッグ＆ドロップ要素の情報をまとめた型
export type DnDItem<T> = {
  value: TaskType; // useDnDSort()の引数に渡された配列の要素の値
  key: string; // 要素と紐づいた一意な文字列
  position: Position; // 要素の座標
  element: HTMLElement; // DOM情報
  parent: string | undefined;
};
export type DnDRef<T> = {
  keys: Map<T, string>; // 要素に紐づいたkey文字列を管理するMap
  dndItems: { task: DnDItem<T>[]; goal: DnDItem<T>[] }; // 並び替える全ての要素を保持するための配列
  canCheckHovered: boolean; // 重なり判定ができるかのフラグ
  pointerPosition: Position; // マウスポインターの座標
  dragElement: DnDItem<T> | null; // ドラッグしてる要素
};
