import { Grid } from "@mantine/core";
import { useRoutes } from "react-router-dom";
import Authed from "../components/page/Authed";
import TasksPage from "../components/page/TasksPage";
import Login from "../features/auth/components/Login";
import SignUp from "../features/auth/components/SignUp";
import Inbox from "../features/fetch/components/Inbox";

const router = [
  {
    path: "/",
    element: <Authed />,
    children: [
      {
        index: true,
        element: (
          <Grid.Col span={10} className="h-full">
            <Inbox />
          </Grid.Col>
        ),
      },
      {
        path: "tasks",
        element: <TasksPage />,
      },
    ],
  },
  { path: "/signIn", element: <Login /> },
  {
    path: "/signUp",
    element: <SignUp />,
  },
];
export const AppRoutes = () => {
  const element = useRoutes(router);

  return <>{element}</>;
};
