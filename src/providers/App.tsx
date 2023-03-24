import { MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../app/store";

const queryClient = new QueryClient({
  defaultOptions: { queries: {} },
});

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <MantineProvider
          theme={{
            colors: {
              brown: [
                "#E0E0E0",
                "#CCCCCC",
                "#B8B8B8",
                "#A3A3A3",
                "#8F8F8F",
                "#7A7A7A",
                "#666666",
                "#595959",
                "#4D4D4D",
                "#404040",
              ],
              dullblue: [
                "#5F5C68",
                "#747481",
                "#8B8E9B",
                "#A2AAB5",
                "#bac6ce",
                "#C3D1D5",
                "#CCDBDC",
                "#D5E2E0",
                "#DEE9E5",
                "#E7EFEB",
              ],
            },
          }}
          withGlobalStyles
          withNormalizeCSS
        >
          <BrowserRouter>{children}</BrowserRouter>
        </MantineProvider>
      </QueryClientProvider>
    </Provider>
  );
};
