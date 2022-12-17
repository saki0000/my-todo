import { MantineProvider } from "@mantine/core";
import { useSelector } from "react-redux";
import "./App.css";
import Login from "./features/auth/Login";
import Authed from "./features/auth/Logined";
import { selectUser } from "./redux/userSlice";

function App() {
  const user = useSelector(selectUser);
  return (
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
        },
      }}
      withGlobalStyles
      withNormalizeCSS
    >
      {user.uid ? <Authed /> : <Login />}
    </MantineProvider>
  );
}

export default App;
