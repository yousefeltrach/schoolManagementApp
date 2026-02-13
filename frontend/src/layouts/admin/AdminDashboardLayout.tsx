import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Button } from "../../components/ui/button";

export default function AdminDashboardLayout() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
            {/* Sidebar */}
            <aside className="w-64 bg-white dark:bg-gray-800 shadow-md">
                <div className="p-4 border-b">
                    <h1 className="text-xl font-bold">Admin Panel</h1>
                    <p className="text-sm text-gray-500">{user?.name}</p>
                </div>
                <nav className="p-4 space-y-2">
                    <Link to="/admin/dashboard" className="block p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700">Dashboard</Link>
                    <Link to="/admin/users" className="block p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700">Manage Users</Link>
                    <Link to="/admin/teachers/create" className="block p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700">Add Teacher</Link>
                    <Link to="/admin/classes" className="block p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700">Manage Classes</Link>
                    <Link to="/admin/subjects" className="block p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700">Manage Subjects</Link>
                </nav>
                <div className="p-4 border-t mt-auto">
                    <Button variant="destructive" onClick={handleLogout} className="w-full">Logout</Button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-8">
                <Outlet />
            </main>
        </div>
    );
}
