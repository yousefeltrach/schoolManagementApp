import { useEffect, useState } from "react";
import { axiosClient } from "../../api/axios";
import { Users, GraduationCap, BookOpen, Library } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        total_students: 0,
        total_teachers: 0,
        total_classes: 0,
        total_subjects: 0,
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const { data } = await axiosClient.get('/api/admin/stats');
                setStats(data);
            } catch (error) {
                console.error("Failed to fetch admin stats", error);
            }
        };
        fetchStats();
    }, []);

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard Overview</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                        <GraduationCap className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.total_students}</div>
                        <p className="text-xs text-muted-foreground">Active students</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Teachers</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.total_teachers}</div>
                        <p className="text-xs text-muted-foreground">Faculty members</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Classes</CardTitle>
                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.total_classes}</div>
                        <p className="text-xs text-muted-foreground">Active classes</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Subjects</CardTitle>
                        <Library className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.total_subjects}</div>
                        <p className="text-xs text-muted-foreground">Curriculum subjects</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
