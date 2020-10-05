import React, { useState, useEffect } from "react"
import styles from "./Dashboard.module.css"
import Block from "./Block/Block"
import Title from "../../../ui/Title/Title"
import { getCandidateList, 
        getConvertedCandidateList, 
        getUnAllocatedCandidates,
        getInterestedCandidateList } from "../../../service/CandidateService"
import { getStaffList } from "../../../service/StaffService"

const Dashboard = (props) => {

    const [staffCount, setStaffCount] = useState(0)
    const [allocatedStudentsCount, setAllocatedStudentsCount] = useState(0)
    const [unAllocatedStudentsCount, setUnAllocatedStudentsCount] = useState(0)
    const [convertedCount, setConvertedCount] = useState(0)
    const [interestedCount, setInterestedCount] = useState(0)

    useEffect(() => {
        getCandidateList()
        .then(res => {
            if (res.status === 200) {
                setAllocatedStudentsCount(res.data.length)
            }
        })
        .catch(err => {
            
        })

        getConvertedCandidateList()
        .then(res => {
            if (res.status === 200) {
                setConvertedCount(res.data.length)
            }
        })
        .catch(err => {
            
        })

        getUnAllocatedCandidates()
        .then(res => {
            if (res.status === 200) {
                setUnAllocatedStudentsCount(res.data.length)
            }
        })
        .catch(err => {
            
        })

        getInterestedCandidateList()
        .then(res => {
            if (res.status === 200) {
                setInterestedCount(res.data.length)
            }
        })
        .catch(err => {
            
        })

        getStaffList()
        .then(res => {
            if (res.status === 200) {
                setStaffCount(res.data.length)
            }
        })
        .catch(err => {
            
        })

    }, [])

    let blocks = [
        {title: "students", color: "#61dafb", className: "fa fa-user-graduate", count: allocatedStudentsCount + unAllocatedStudentsCount},
        {title: "allocated students", color: "#fbcc61", className: "fa fa-check-circle", count: allocatedStudentsCount},
        {title: "unallocated students", color: "red", className: 'fas fa-hand-holding-water', count: unAllocatedStudentsCount},
        {title: "Staffs", color: "orange", className: 'fa fa-user-tie', count: staffCount},
        {title: "Converted Students", color: "green", className:"fa fa-check-circle", count: convertedCount},
        {title: "Interested Count", color: "blue", className:"fa fa-thumbs-up", count: interestedCount}
    ]

    const getBlocks = () => {
        return blocks.map((el, i) => {
            return(
                <Block
                key={i}
                color={el.color}
                iconClass={el.className}
                count={el.count}
                title={el.title}
                />
            )
        })
    }

    return (
        <div className={styles["dashboard"]}>
            <Title
            hideButton={true}
            title="Dashboard"
            />
            <div className={styles["blocks"]}>
                {getBlocks()}
            </div>
        </div>
    )
}

export default Dashboard
