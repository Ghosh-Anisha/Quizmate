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
            <a href="/"><img src="https://img.icons8.com/color/48/000000/neural_connections.png" alt="logo"/> </a>
            <nav className="nav">
                { user ? (
                    <span>
<<<<<<< HEAD
                        <Link to="/" className='brand'>Neural Correlates</Link>
                        <Link to="/forms">My Quizzes</Link>
=======
                        <Link to="/" className='brand'>FORM EZ</Link>
                        <Link to="/forms">My Forms</Link>
>>>>>>> 7127c50c0782847dfdf2e9f3a99180020a3ec073
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