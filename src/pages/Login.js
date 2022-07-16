import { useState } from 'react'
import { Link } from 'react-router-dom'
import { validateEmail } from "../utils"
import { login } from "../db"
import {auth , provider}  from '../db/firebase.js';

function Login(){
    const [email, setEmail] = useState("")
    const [pwd, setPwd] = useState("")

    const [err, setErr] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(loading) return
        setErr("")

        if(!email.trim()) return setErr("Email is required")
        if(!validateEmail(email)) return setErr("Email is not valid")

        if(!pwd.trim()) return setErr("Password is required")
        if(pwd.trim().length < 6 || pwd.trim().length > 20) return setErr("Password should be 6 - 20 characters long")
        
        setLoading(true) 

        try{
            await login(email, pwd)
        }catch(e){
            setLoading(false)
            setErr(e.message)
        }
        
        
    }
    const signin = () => {
        auth.signInWithPopup(provider).catch(alert);
    }
    

    return (
        <form onSubmit={handleSubmit}>
            <h1 className="heading mb-1">Login below</h1>
            <div className="input">
                <label>Email</label>
                <input type="email" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="input">
                <label>Password</label>
                <input type="password" placeholder="Enter your password" onChange={(e) => setPwd(e.target.value)} />
            </div>
            {err && <p className="err mb-1">{err}</p>}
            <Link to="/signup" className="alt">don't have an account?</Link>
            <button className="btn" type="submit">{ loading ? <span className="spinner white"></span> : <span>login</span>}</button>
            <button className="btn" onClick={signin}> <img src='https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg' alt='google' height='12'/>
{ loading ? <span className="spinner white"></span> : <span> Sign in </span>}</button>

        </form>
    )
}

export default Login