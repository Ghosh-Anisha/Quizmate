import { useEffect } from "react"
import { Link, useLocation, useHistory } from "react-router-dom"

import { useAuthenticated, logout } from "../db"

function Navbar(){
    const user = useAuthenticated()
    const location = useLocation()
    const history = useHistory()

    useEffect(() => {
        if(user){
            localStorage.setItem("gfc-user", JSON.stringify(user))
            if(location.pathname === "/signup" || location.pathname === "/login"){
                history.push("/")
            }
        }else{
            if(location.pathname === "/create" || location.pathname === "/forms" || location.pathname.slice(0, 12) === "/submissions"){
                history.push("/login")
            }
        }
    }, [user, location, history])


    return (
        <div className="navbar container">
            <a href="/"><img src="data:image/png;base64,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" alt="logo" width='40' height='40' /> </a>
            <nav className="nav">
                { user ? (
                    <span>
                        <Link to="/" className='brand'>Quizmate</Link>
                        <Link to="/forms">My Quizzes</Link>
                        <Link to="/create">Create</Link>
                        <span onClick={logout}>Logout</span>
                    </span>
                ) : (
                    <span>
                        <Link to="/signup">Signup</Link>
                        <Link to="/login">Login</Link>
                    </span>
                )}
            </nav>
        </div>
    )
}

export default Navbar