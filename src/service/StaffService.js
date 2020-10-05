import axios from "axios"
import AddStaff from "../components/Home/Admin/Staffs/AddStaff/AddStaff";
import {BASE_URL} from "./constants"

export const getStaffList = () => {

    return axios.get(`${BASE_URL}/teacher/getList`)
    // return axios.get('https://f7c29884d5b6.ngrok.io/call/list')
    // .then((res) => {

    // })
    // .catch(res => {
        
    // })


    // return [
    //     { name: "Joe James", department: 'MBA', phoneNumber: "1234567890", noOfStudentsAllocated: 10, password: "das"},
    //     { name: "John Walsh", department: 'MBA', phoneNumber: "1234567890", noOfStudentsAllocated: 10, password: "das"},
    //     { name: "Bob Herm", department: 'MBA', phoneNumber: "1234567890", noOfStudentsAllocated: 10, password: "das"},
    //     { name: "James Houston", department: 'SER', phoneNumber: "1234567890", noOfStudentsAllocated: 10, password: "das"},
    //     { name: "Joe James", department: 'IT', phoneNumber: "1234567890", noOfStudentsAllocated: 10, password: "das"},
    // ];
}

export const addStaff = (staff) => {
    return axios.post(`${BASE_URL}/teacher/add`, staff)
}

export const getCandidates = (id) => {
    return axios.get(`${BASE_URL}/teacher/getList/${id}`)
}
