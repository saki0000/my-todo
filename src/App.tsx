import { MantineProvider } from "@mantine/core";
import React from "react";
import "./App.css";
import Login from "./components/templates/Login";
import Logined from "./components/templates/Logined";

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      {/* <Login /> */}
      <Logined />
    </MantineProvider>
  );
}

export default App;
