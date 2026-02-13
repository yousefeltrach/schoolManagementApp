import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { GraduationCap, BookOpen, Users, BarChart3, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Manage Your School with <span className="text-primary">EduManage</span>
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                The all-in-one platform for students, teachers, and administrators. Streamline grading, attendance, and communication.
              </p>
            </div>
            <div className="space-x-4">
              <Link to="/register">
                <Button size="lg" className="h-11 px-8">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="lg" className="h-11 px-8">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-900">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="p-4 bg-primary/10 rounded-full">
                <BookOpen className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Class Management</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Organize classes, schedules, and materials in one central location.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="p-4 bg-primary/10 rounded-full">
                <BarChart3 className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Grade Tracking</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Keep track of student performance with real-time grade updates and reports.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="p-4 bg-primary/10 rounded-full">
                <Users className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-bold">User Roles</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Dedicated dashboards for Students, Teachers, and Administrators.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-6 bg-gray-100 dark:bg-gray-800 border-t">
        <div className="container px-4 md:px-6 mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <GraduationCap className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold">EduManage</span>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © 2026 EduManage Inc. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}