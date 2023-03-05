import { render, RenderOptions, RenderResult } from "@testing-library/react";
import { ReactElement } from "react";
import { AppProvider } from "../providers/App";

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
): RenderResult => render(ui, { wrapper: AppProvider, ...options });

export * from "@testing-library/react";
export { customRender as render };
