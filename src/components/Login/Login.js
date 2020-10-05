import React, { useState } from "react";
import styles from "./Login.module.css"
import { withRouter } from "react-router-dom"
import login from "../../service/LoginService"


const Login = (props) => {
    const [image, setImage] = useState()
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [isInvalidLogin, setIsInvalidLogin] = useState(false)

    const onLogin = () => {
        login(userName, password)
        .then(res => {
            if(res['type']) {
                localStorage.setItem('isLoggedIn', 1)
                localStorage.setItem('type', res['type'])
                props.history.push('/home')

            } else if(res.data === 'login fail') {

            } else  {
                localStorage.setItem('isLoggedIn', 1)
                localStorage.setItem("type", "teacher")
                localStorage.setItem("_id", res.data[0]._id)
                localStorage.setItem("phoneNumber", res.data[0].PhoneNumber)
                props.history.push('/home')
            }
            props.setIsLoggedIn(localStorage.getItem('isLoggedIn'))
        })
        .catch(err => {
            console.log(err)
        })
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
                    style={{boxShadow: "0 0 0 0"}}
                    placeholder="Username"
                    value={userName}
                    onChange={(event) => {setUserName(event.target.value)}}
                    />
                    <input
                    style={{boxShadow: "0 0 0 0"}}
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={(event) => {setPassword(event.target.value)}}
                    />
                </form>
                <button
                className="button"
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
