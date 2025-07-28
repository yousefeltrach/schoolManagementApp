import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <p>Hello from HomePage</p>,
  },
  {
    path: "/login",
    element: <p>Hello from LoginPage</p>,
  },
  {
    path: "/register",
    element: <p>Hello from RegisterPage</p>,
  },
  {
    path: "/users",
    element: <p>Hello from UsersPage</p>,
  },
]);