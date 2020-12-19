import axios from "axios"
import { BASE_URL } from "./constants";

export const getCandidateList = () => {
    return axios.get(`${BASE_URL}/student/list/1`)

    // return axios.get('https://f7c29884d5b6.ngrok.io/call/list')
    // .then((res) => {

    // })
    // .catch(res => {
        
    // })


    // return [
    //     { Name: "Joe James", PhoneNumber: 9876543210, Percentage: "30", state: "NY", currentFollower: "Mark", department: "Engineering" },
    //     { Name: "John Walsh", PhoneNumber: 9876543210, Percentage: "40", state: "CT", currentFollower: "Mark", department: "Engineering" },
    //     { Name: "Bob Herm", PhoneNumber: 9876543210, Percentage: "80", state: "FL", currentFollower: "Mark", department: "Engineering" },
    //     { Name: "James Houston", PhoneNumber: 9876543210, Percentage: "50", state: "TX", currentFollower: "Mark", department: "Engineering" },
    //     { Name: "Joe James", PhoneNumber: 9876543210, Percentage: "30", state: "NY", currentFollower: "Mark", department: "Engineering" },
    //     { Name: "John Walsh", PhoneNumber: 9876543210, Percentage: "40", state: "CT", currentFollower: "Mark", department: "Engineering" },
    //     { Name: "Bob Herm", PhoneNumber: 9876543210, Percentage: "80", state: "FL", currentFollower: "Mark",department: "Engineering" },
    //     { Name: "James Houston", PhoneNumber: 9876543210, Percentage: "50", state: "TX", currentFollower: "Mark", department: "Engineering" },
    //     { Name: "Joe James", PhoneNumber: 9876543210, Percentage: "30", state: "NY", currentFollower: "Mark", department: "Engineering" },
    //     { Name: "John Walsh", PhoneNumber: 9876543210, Percentage: "40", state: "CT", currentFollower: "Mark", department: "Engineering" },
    //     { Name: "Bob Herm", PhoneNumber: 9876543210, Percentage: "80", state: "FL", currentFollower: "Mark",department: "Engineering" },
    //     { Name: "James Houston", PhoneNumber: 9876543210, Percentage: "50", state: "TX", currentFollower: "Mark", department: "Engineering" },
    // ];
}

export const addCandidate = (student) => {
    return axios.post(`${BASE_URL}/student/add`, student)
}

export const uploadCandidate = (student) => {
    return axios.post(`${BASE_URL}/student/add_csv`, student, {'Content-Type': 'multipart/form-data' })
}

export const getUnAllocatedCandidates = () => {
    return axios.get(`${BASE_URL}/student/list/0`)
}

export const updateStudentInfo = (studentId, data) => {
    return axios.post(`${BASE_URL}/student/updateInfo/${studentId}`, data)
}

export const getConvertedCandidateList = () => {
    return axios.get(`${BASE_URL}/student/converted`)
}

export const getInterestedCandidateList = () => {
    return axios.get(`${BASE_URL}/student/interested`)
}
