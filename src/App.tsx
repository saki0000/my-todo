import { MantineProvider } from "@mantine/core";
import { useSelector } from "react-redux";
import "./App.css";
import Login from "./features/login/Login";
import Logined from "./features/login/Logined";
import { selectUser } from "./redux/userSlice";

function App() {
  const user = useSelector(selectUser);
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      {user.uid ? <Logined /> : <Login />}
    </MantineProvider>
  );
}

export default App;
