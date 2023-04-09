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
          <div className="h-full p-4">
            <Inbox />
          </div>
        ),
      },
      {
        path: "tasks",
        element: (
          <div className="h-full m-4">
            <TasksPage />
          </div>
        ),
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
