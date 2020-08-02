import React, { useState } from "react";
import styles from "./Login.module.css"
import { withRouter } from "react-router-dom"


const Login = (props) => {
    const [image, setImage] = useState()
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [isInvalidLogin, setIsInvalidLogin] = useState(false)

    const onLogin = () => {
        if(userName == "admin" && password == "admin") {
            localStorage.setItem('isLoggedIn', 1)
            props.setIsLoggedIn(localStorage.getItem('isLoggedIn'))
            props.history.push('/home')
        } else{
            setIsInvalidLogin(true)
        }
    }

    return (
        <div className={styles['login-container']}>
            <div className={styles['logo-container']}>
                <img
                src={require('../../assets/bracketcodes.svg')}
                alt='logo'
                />
            </div>
            <div className={styles['login']}>
                <h2>
                    Login
                </h2>
                <h2>
                    Good Morning
                </h2>
                <div style={{marginTop: "1rem", marginBottom: "1rem"}}>
                    {isInvalidLogin ?
                    <p>
                        Incorrect Username or password :(
                    </p> : null
                    }
                </div>
                <form>
                    <input
                    placeholder="Username"
                    value={userName}
                    onChange={(event) => {setUserName(event.target.value)}}
                    />
                    <input
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={(event) => {setPassword(event.target.value)}}
                    />
                </form>
                <button
                onClick={onLogin}
                style={{backgroundColor: !userName || !password ? "lightgray" : "blue"}}
                disabled={!userName || !password}
                >
                    Login
                </button>
            </div>
        </div>
    )
}

export default withRouter(Login)
