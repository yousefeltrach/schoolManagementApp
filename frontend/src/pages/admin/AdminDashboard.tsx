export default function AdminDashboard() {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-white dark:bg-gray-800 rounded shadow">
                    <h3 className="text-lg font-semibold">Total Users</h3>
                    <p className="text-3xl font-bold">120</p>
                </div>
                <div className="p-4 bg-white dark:bg-gray-800 rounded shadow">
                    <h3 className="text-lg font-semibold">Total Classes</h3>
                    <p className="text-3xl font-bold">15</p>
                </div>
                <div className="p-4 bg-white dark:bg-gray-800 rounded shadow">
                    <h3 className="text-lg font-semibold">Total Subjects</h3>
                    <p className="text-3xl font-bold">8</p>
                </div>
            </div>
        </div>
    );
}
