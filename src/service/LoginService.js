import axios from "axios"
import { BASE_URL } from "./constants";


export const login = (username, password) => {
    if(username === 'admin' && password === 'admin') {
        localStorage.setItem("type", "admin")
        return new Promise((resolve, reject) => {
            resolve({
                type: 'admin'
            })
        })
    } else {
        return axios.post(`${BASE_URL}/teacher/login`, {
            PhoneNumber: username,
            password: password
        })
    }
}

export default login
