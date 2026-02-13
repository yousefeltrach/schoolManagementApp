import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import Layout from "../Layout";
import GuestLayout from "../layouts/GuestLayout";
import StudentDashboardLayout from "../layouts/student/StudentDashboardLayout";
import StudentDashboard from "../pages/student/StudentDashboard";
import AdminDashboardLayout from "../layouts/admin/AdminDashboardLayout";
import TeacherDashboardLayout from "../layouts/teacher/TeacherDashboardLayout";
import RootLayout from "../layouts/RootLayout";
import ProtectedRoute from "../components/ProtectedRoute";
import AdminDashboard from "../pages/admin/AdminDashboard";
import TeacherDashboard from "../pages/teacher/TeacherDashboard";
import CreateTeacher from "../pages/admin/CreateTeacher";

import Register from "../pages/Register";

export const LOGIN_ROUTE = "/login";
export const REGISTER_ROUTE = "/register";
export const STUDENT_DASHBOARD_ROUTE = "/student/dashboard";
export const TEACHER_DASHBOARD_ROUTE = "/teacher/dashboard";
export const ADMIN_DASHBOARD_ROUTE = "/admin/dashboard";

export const router = createBrowserRouter([
    {
        element: <RootLayout />,
        children: [
            // Public Routes
            {
                element: <Layout />,
                children: [
                    {
                        path: "/",
                        element: <Home />,
                    },
                    {
                        path: "*",
                        element: <NotFound />,
                    },
                ],
            },
            // Guest Routes (Login/Register)
            {
                element: <GuestLayout />,
                children: [
                    {
                        path: LOGIN_ROUTE,
                        element: <Login />,
                    },
                    {
                        path: REGISTER_ROUTE,
                        element: <Register />,
                    },
                ],
            },
            // Protected Routes
            {
                element: <ProtectedRoute allowedRoles={['student']} />,
                children: [
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
            {
                element: <ProtectedRoute allowedRoles={['teacher']} />,
                children: [
                    {
                        element: <TeacherDashboardLayout />,
                        children: [
                            {
                                path: TEACHER_DASHBOARD_ROUTE,
                                element: <TeacherDashboard />,
                            },
                        ],
                    },
                ],
            },
            {
                element: <ProtectedRoute allowedRoles={['admin']} />,
                children: [
                    {
                        element: <AdminDashboardLayout />,
                        children: [
                            {
                                path: ADMIN_DASHBOARD_ROUTE,
                                element: <AdminDashboard />,
                            },
                            {
                                path: "/admin/teachers/create",
                                element: <CreateTeacher />,
                            },
                        ],
                    },
                ],
            },
        ],
    },
]);
