

// export default function StudentDashboardLayout() {
//   return (
//     <div>StudentDashboardLayout</div>
//   )


"use client"

import { useEffect, useState } from "react"

import { Menu, GraduationCap, Sun, Moon } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"


import { Sheet, SheetContent, SheetTrigger } from "../../components/ui/sheet"
import { Button } from "../../components/ui/button"
import { LOGIN_ROUTE } from "../../components/router"

export default function  StudentDashboardLayout() {
  const [isOpen, setIsOpen] = useState(false)
   const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);
  const navigate = useNavigate()

useEffect(() => {
  if(window.localStorage.getItem('ACCESS_TOKEN')){
    navigate(LOGIN_ROUTE)
  }
})

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/register", label: "Register" },
    { href: "/users", label: "Users" },
  ]

  const handleLogout = () => {
    window.localStorage.removeItem('ACCESS_TOKEN');
    navigate(LOGIN_ROUTE);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* logo */}
        <Link to="/" className="flex items-center space-x-2">
          <GraduationCap className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold">EduManage</span>
        </Link>

        {/* desktop navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link key={link.href} to={link.href} className="text-sm font-medium transition-colors hover:text-primary">
              {link.label}
            </Link>
          ))}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setDarkMode(!darkMode)}
            className="h-9 w-9"
          >
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            <span className="sr-only">toggle theme</span>
          </Button>
          {/* logout button */}
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            logout
          </Button>
        </nav>

        {/* mobile navigation */}
        <div className="flex items-center space-x-2 md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setDarkMode(!darkMode)}
            className="h-9 w-9"
          >
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            <span className="sr-only">toggle theme</span>
          </Button>
          {/* mobile menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Menu className="h-5 w-5" />
                <span className="sr-only">toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col space-y-4 mt-8">
                <div className="flex items-center space-x-2 pb-4 border-b">
                  <GraduationCap className="h-6 w-6 text-primary" />
                  <span className="text-lg font-semibold">EduManage</span>
                </div>

                <nav className="flex flex-col space-y-3">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      to={link.href}
                      className="text-lg font-medium transition-colors hover:text-primary py-2"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                  {/* logout button for mobile */}
                  <Button
                    variant="ghost"
                    onClick={handleLogout}
                    className="text-lg font-medium transition-colors hover:text-primary py-2"
                  >
                    logout
                  </Button>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
