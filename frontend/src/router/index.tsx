import { createBrowserRouter } from "react-router-dom";
import Register from "../pages/Register";
import Users from "../pages/Users";
import Login from "../pages/Login";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import Layout from "../Layout";

export const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/login",
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
                path: "*",
                element: <NotFound />,
            },
        ],
    },
]);
