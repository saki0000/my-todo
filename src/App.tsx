import { MantineProvider } from "@mantine/core";
import React from "react";
import { useSelector } from "react-redux";
import "./App.css";
import Login from "./components/views/Login";
import Logined from "./components/views/Logined";
import { selectUser } from "./features/userSlice";

function App() {
  const user = useSelector(selectUser);
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      {user.uid ? <Logined /> : <Login />}
    </MantineProvider>
  );
}

export default App;
