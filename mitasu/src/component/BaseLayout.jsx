import { Outlet } from "react-router"
import NavBar from "./NavBar"


function BaseLayout() {
    return (
        <>
            <NavBar />
            <Outlet />
        </>
    )
}

export default BaseLayout