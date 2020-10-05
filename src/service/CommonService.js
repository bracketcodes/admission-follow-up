import axios from "axios"
import { BASE_URL } from "./constants"


export const allocateStaff = (teacherId, body) => {
    return axios.post(`${BASE_URL}/student/allocate/${teacherId}`, {
        student_id: body
    })
}