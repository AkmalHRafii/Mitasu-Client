import { NavLink, useNavigate } from "react-router";


function NavBar() {
    const navigate = useNavigate()
    function handleLogout() {
        localStorage.removeItem("access_token")
        navigate("/")
    }
    return (
        <>
            {localStorage.access_token ? (
                <nav className="flex m-5">
                    <div className="grow m-auto">
                        <NavLink to="/">
                            <span className="mr-15 ml-5 hover:bg-neutral-500 cursor-pointer rounded-full p-2">Mitasu</span>
                        </NavLink>
                        <NavLink to="/mybookmark">
                            <span className="mr-15 ml-15 hover:bg-neutral-500 cursor-pointer rounded-full p-2">MyBookmark</span>
                        </NavLink>
                        <NavLink to="/recommend">
                            <span className="mr-15 ml-15 hover:bg-neutral-500 cursor-pointer rounded-full p-2">Recommend</span>
                        </NavLink>
                        <NavLink to="/top-anime">
                            <span className="mr-15 ml-15 hover:bg-neutral-500 cursor-pointer rounded-full p-2">Top Anime</span>
                        </NavLink>
                        <NavLink to="/search-anime">
                            <span className="mr-15 ml-15 hover:bg-neutral-500 cursor-pointer rounded-full p-2">Search</span>
                        </NavLink>
                        <NavLink to="/mywork">
                            <span className="mr-15 ml-15 hover:bg-neutral-500 cursor-pointer rounded-full p-2">My Work</span>
                        </NavLink>
                    </div>
                    <div className="m-auto">
                        <a className="cursor-pointer hover:bg-neutral-500 cursor-pointer rounded-full p-2" onClick={handleLogout}>Log out</a>
                    </div>
                </nav>
            ) : (
                <nav className="flex m-5">
                    <div className="grow m-auto">
                        <NavLink to="/">
                            <span className="mr-15 ml-5 hover:bg-neutral-500 cursor-pointer rounded-full p-2">Mitasu</span>
                        </NavLink>
                        <NavLink to="/top-anime">
                            <span className="mr-15 ml-15 hover:bg-neutral-500 cursor-pointer rounded-full p-2">Top Anime</span>
                        </NavLink>
                        <NavLink to="/search-anime">
                            <span className="mr-15 ml-15 hover:bg-neutral-500 cursor-pointer rounded-full p-2">Search</span>
                        </NavLink>
                    </div>
                    <div className="m-auto">
                        <NavLink to="/login">
                            <span className="mr-15 ml-15 hover:bg-neutral-500 cursor-pointer rounded-full p-2">Log in</span>
                        </NavLink>
                        <NavLink to="/register">
                            <span className="mr-15 ml-15 hover:bg-neutral-500 cursor-pointer rounded-full p-2">Register</span>
                        </NavLink>
                    </div>
                </nav>
            )}
        </>
    )
}

export default NavBar