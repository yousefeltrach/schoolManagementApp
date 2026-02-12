export default function TeacherDashboard() {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Teacher Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-white dark:bg-gray-800 rounded shadow">
                    <h3 className="text-lg font-semibold">My Classes</h3>
                    <p className="text-3xl font-bold">4</p>
                </div>
                <div className="p-4 bg-white dark:bg-gray-800 rounded shadow">
                    <h3 className="text-lg font-semibold">Today's Attendance</h3>
                    <p className="text-3xl font-bold text-green-500">Submitted</p>
                </div>
            </div>
        </div>
    );
}
