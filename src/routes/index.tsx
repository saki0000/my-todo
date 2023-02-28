import { useRoutes } from "react-router-dom";
import Authed from "../features/auth/components/Authed";
import Login from "../features/auth/components/Login";
import SignUp from "../features/auth/components/SignUp";

const router = [
  {
    path: "/",
    element: <Authed />,
    children: [],
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
