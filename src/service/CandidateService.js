import axios from "axios"

export const getCandidateList = () => {

    return axios.get('https://f7c29884d5b6.ngrok.io/call/list')
    // .then((res) => {

    // })
    // .catch(res => {
        
    // })


    // return [
    //     { name: "Joe James", phoneNumber: 9876543210, city: "Yonkers", state: "NY" },
    //     { name: "John Walsh", phoneNumber: 9876543210, city: "Hartford", state: "CT" },
    //     { name: "Bob Herm", phoneNumber: 9876543210, city: "Tampa", state: "FL" },
    //     { name: "James Houston", phoneNumber: 9876543210, city: "Dallas", state: "TX" },
    // ];
}
