import { MantineProvider } from "@mantine/core";
import { useSelector } from "react-redux";
import "./App.css";
import Logined from "./components/layout/Logined";
import Login from "./features/login/Login";
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
