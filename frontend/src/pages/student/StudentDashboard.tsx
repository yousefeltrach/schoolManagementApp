import { useAuth } from "../../context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../components/ui/card";
import { BookOpen, Calendar, GraduationCap, Clock, Award } from "lucide-react";
// import { useEffect, useState } from "react";
// import { axiosClient } from "../../api/axios";

export default function StudentDashboard() {
    const { user } = useAuth();
    // const [enrolledClasses, setEnrolledClasses] = useState([]);

    // useEffect(() => {
    //   const fetchClasses = async () => {
    //       try {
    //           // const response = await axiosClient.get('/api/student/classes');
    //           // setEnrolledClasses(response.data);
    //       } catch (error) {
    //           console.error("Failed to fetch classes", error);
    //       }
    //   }
    //   fetchClasses();
    // }, []);

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <div className="text-sm text-muted-foreground">
                    Welcome back, <span className="font-semibold text-primary">{user?.name}</span>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Enrolled Classes</CardTitle>
                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">0</div>
                        <p className="text-xs text-muted-foreground">Active courses this semester</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Average Grade</CardTitle>
                        <Award className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">N/A</div>
                        <p className="text-xs text-muted-foreground">Calculated from 0 subjects</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Attendance</CardTitle>
                        <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">100%</div>
                        <p className="text-xs text-muted-foreground">Present for all classes</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Assignments</CardTitle>
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">0</div>
                        <p className="text-xs text-muted-foreground">Due this week</p>
                    </CardContent>
                </Card>
            </div>

            {/* Main Content Area */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">

                {/* Class Schedule / List */}
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>My Classes</CardTitle>
                        <CardDescription>Your enrolled subjects and schedule</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {/* Placeholder for when no classes */}
                            <div className="flex flex-col items-center justify-center p-8 text-center border-2 border-dashed rounded-lg">
                                <GraduationCap className="h-10 w-10 text-muted-foreground mb-4" />
                                <h3 className="text-lg font-semibold">No Classes Enrolled</h3>
                                <p className="text-sm text-muted-foreground mb-4">You haven't been assigned to any classes yet.</p>
                                {/* <Button variant="outline">Browse Classes</Button> */}
                            </div>

                            {/* Example of what a class item might look like:
               <div className="flex items-center">
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">Mathematics 101</p>
                    <p className="text-sm text-muted-foreground">Mr. Smith • Mon, Wed 10:00 AM</p>
                  </div>
                  <div className="ml-auto font-medium">Room 3B</div>
                </div>
                */}
                        </div>
                    </CardContent>
                </Card>

                {/* Recent Activity / Notifications */}
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                        <CardDescription>Latest updates from your teachers</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex flex-col items-center justify-center p-8 text-center text-sm text-muted-foreground">
                                No recent activity to show.
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
