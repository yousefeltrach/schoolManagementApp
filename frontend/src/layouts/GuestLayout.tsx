import {Link, Outlet, useNavigate} from "react-router-dom";

import {LOGIN_ROUTE, STUDENT_DASHBOARD_ROUTE} from "../components/router/index.tsx";
import {useEffect} from "react";
import {useUserContext} from "../context/StudentContext.tsx";
import {GraduationCap, HomeIcon, LogInIcon} from 'lucide-react'

export default function GuestLayout() {
   const navigate = useNavigate()
  const context = useUserContext()

  useEffect(() => {
    if (context.authenticated) {
      navigate(STUDENT_DASHBOARD_ROUTE)
    }
  }, [context.authenticated, navigate]);
  return (
    <>
      <header>
      <div
        className="items-center justify-between flex bg-gray-800 bg-opacity-90 px-12 py-4 mb-4 mx-auto shadow-2xl">
        <div className="text-2xl text-white font-semibold inline-flex items-center">
          <Link to="/" className="flex items-center space-x-2">
          <GraduationCap className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold">EduManage</span>
        </Link>
        </div>
        <div>
          <ul className="flex text-white">
            <li className="ml-5 px-2 py-1">
              <Link className={'flex'} to={'/'}><HomeIcon className={'mx-1'}/> Home page</Link>
            </li>
            <li className="ml-5 px-2 py-1">
              <Link className={'flex'} to={LOGIN_ROUTE}><LogInIcon className={'mx-1'}/> Login</Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
    <main className={'container'}>
      <Outlet/>
    </main>
    </>
  )
}
