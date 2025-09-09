import { createBrowserRouter } from "react-router-dom";
import Register from "../pages/Register";
import Users from "../pages/Users";
import Login from "../pages/Login";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import Layout from "../Layout";
import StudentDashboard from "../components/student/StudentDashboard";
import GuestLayout from "./GuestLayout";
import StudentDashboardLayout from "./student/StudentDashboardLayout";


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
                path: "/register",
                element: <Register />,
            },
            {
                path: "/users",
                element: <Users />,
            },
           
            {
                path: "*",
                element: <NotFound />,
            },
            {
                element: <GuestLayout />,
                children: [
                     {
                path: LOGIN_ROUTE,
                element: <Login />,
            },
                ],
            },
            {
                element: <StudentDashboardLayout />,
                children: [
                  
             {
                path: STUDENT_DASHBOARD_ROUTE,
                element: <StudentDashboard />,
            },
                   
                ],
            },
        ],
    },
]);
