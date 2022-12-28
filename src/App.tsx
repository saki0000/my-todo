import { MantineProvider } from "@mantine/core";
import { useSelector } from "react-redux";
import "./App.css";
import Authed from "./features/auth/Authed";
import Login from "./features/auth/Login";
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
      {user.uid ? <Authed /> : <Login />}
    </MantineProvider>
  );
}

export default App;
