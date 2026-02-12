import { Link, Outlet, useNavigate } from "react-router-dom";
import { MoveLeft } from 'lucide-react';
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { STUDENT_DASHBOARD_ROUTE } from "../router/index";

export default function GuestLayout() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      // Redirect logged-in users to their dashboard
      if (user.role === 'admin') navigate('/admin/dashboard');
      else if (user.role === 'teacher') navigate('/teacher/dashboard');
      else navigate(STUDENT_DASHBOARD_ROUTE);
    }
  }, [user, navigate]);

  return (
    <div className="h-screen w-screen overflow-hidden relative bg-gray-50 dark:bg-gray-900 flex flex-col">
      <header className="absolute top-0 left-0 p-4 z-10">
        <Link to="/" className="flex items-center text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
          <MoveLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
      </header>
      <main className="flex-1 flex items-center justify-center w-full px-4">
        <Outlet />
      </main>
    </div>
  )
}
