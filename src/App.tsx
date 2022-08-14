import { MantineProvider } from "@mantine/core";
import React from "react";
import "./App.css";
import Loggined from "./components/Loggined";

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Loggined />
    </MantineProvider>
  );
}

export default App;
