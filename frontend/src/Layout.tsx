import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";


export default function Layout() {
  return (
    <>
    <NavBar/>
    <main className="container mx-auto">
        <Outlet />
    </main>
    {/* <footer>footer</footer> */}
    </>
  )
}

