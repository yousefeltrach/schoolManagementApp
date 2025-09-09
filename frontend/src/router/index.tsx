import { createBrowserRouter } from "react-router-dom";
import Register from "../pages/Register";
import Users from "../pages/Users";
import Login from "../pages/Login";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import Layout from "../Layout";
import StudentDashboard from "../components/studentlog/StudentDashboard";

export const STUDENT_DASHBOARD_ROUTE = "/student/dashboard";
export const LOGIN_ROUTE: string = "/login";
// export const REGISTER_ROUTE: string = "/register";
// export const USERS_ROUTE: string = "/users";
// export const HOME_ROUTE: string = "/";
// export const NOT_FOUND_ROUTE: string = "*";

export const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: LOGIN_ROUTE,
                element: <Login />,
            },
            {
                path: "/register",
                element: <Register />,
            },
            {
                path: "/users",
                element: <Users />,
            },
            {
                path: STUDENT_DASHBOARD_ROUTE,
                element: <StudentDashboard />,
            },
            {
                path: "*",
                element: <NotFound />,
            },
        ],
    },
]);
