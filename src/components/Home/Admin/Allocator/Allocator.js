import React, { useState, useEffect } from "react"
import Table from "../Table/Table"
import styles from "./Allocator.module.css"
import Title from "../../../../ui/Title/Title"
import MUIDataTable from "mui-datatables"
import { withRouter } from "react-router-dom"
import { getStaffList } from "../../../../service/StaffService"
import { columns, options } from "../Staffs/Staffs"
import { getCandidateList, getUnAllocatedCandidates } from "../../../../service/CandidateService"
import { allocateStaff } from "../../../../service/CommonService"
import Alert from "../../../../ui/Alert/Alert"


const Allocator = (props) => {
    const [selectedRows, setSelectedRows] = useState([])
    const [staffAllocated, setStaffAllocated] = useState([])
    const [isView, setIsView] = useState(false)
    const [staffs, setStaffs] = useState([])
    const [candidate, setCandidate] = useState([])
    const [allocationSuccessful, setAllocationSuccessful] = useState(false)
    const [allocationFailure, setAllocationFailure] = useState(false)
    const [isInitiated, setIsInitiated] = useState(false)

    useEffect(() => {
        getStaffList()
        .then(res => {
            if(res.status == 200) {
                let mappedData = res.data.map(el => {
                    return {
                        ...el,
                        noOfStudentsAllocated: el.allocateted_teachers.length
                    }
                })
                setStaffs(mappedData)
            }
        })
        .catch(err => {

        })


        getUnAllocatedCandidates()
        .then(res => {
            if(res.status == 200) {
                let filteredData = res.data.filter(el => {
                    if(el.PhoneNumber) {
                        return el
                    }
                })
                setCandidate(filteredData)
            }
        })
        .catch(err => {

        })
    }, [])

    const onRowSelect = (rows) => {
        setSelectedRows(rows)
    }

    const onAddStudent = () => {
        props.history.push('/candidates/add')
    }

    const onSetIsView = () => {
        setIsView(true)
    }

    const onAllocateStaff = () => {
        let teacherId = staffAllocated[0]._id
        let studentId = selectedRows.map(el => {
            return el._id
        })

        setIsInitiated(true)
        allocateStaff(teacherId, studentId)
        .then(res => {
            setIsInitiated(false)
            if(res.status == 200) {
                setAllocationSuccessful(true)
                setSelectedRows([])
                setStaffAllocated([])
                getUnAllocatedCandidates()
                .then(res => {
                    if(res.status == 200) {
                        let filteredData = res.data.filter(el => {
                            if(el.PhoneNumber) {
                                return el
                            }
                        })
                        setCandidate(filteredData)
                    }
                })
                .catch(err => {
                })
            }else {
                setAllocationFailure(true)
                setSelectedRows([])
                setStaffAllocated([])
            }
            setIsView(false)
        })
        .catch(err => {
            setIsInitiated(false)
            setIsView(false)
            setSelectedRows([])
                setStaffAllocated([])
            setAllocationFailure(true)
        })
    }
    
    return(
        <>
        {
            allocationFailure || allocationSuccessful ? 
            <Alert
            onClose={allocationSuccessful ? setAllocationSuccessful : setAllocationFailure}
            color={allocationSuccessful ? "blue" : null}
            message={allocationSuccessful ? "Staff Allocated Successfully" : null}
            /> : null
        }
        <div style={{height: "100%", width: "100%"}}>
           <Title
            color={selectedRows.length ? "blue" : "red"}
            onClick={selectedRows.length ? onSetIsView : onAddStudent} 
            buttonName={selectedRows.length ? "Allocate to" : "Add candidate"}
            title="Candidates" />
            {
                isView ? 
                <div className="backdrop">
                    <div
                    style={{position: "relative"}} 
                    className="view-container">
                        <h2>
                            Staffs
                        </h2>
                        <i
                        onClick={() => {setIsView(false)}}
                        style={{position: "absolute", top: "2%", right: "2%", cursor: "pointer"}} 
                        className="fa fa-close"/>
                        <div className={styles['table']}>
                            <MUIDataTable
                            title={"Staff List"}
                            data={staffs}
                            columns={columns}
                            options={{
                                isRowSelectable: (a, b, c) => {
                                    for (let obj of b.data) {
                                        return obj.index == a
                                    } 

                                    if(!b.data.length) {
                                        return true
                                    }
                                },
                                onRowsSelect: (a, b) => {
                                    let staff = b.map(el => {
                                        return staffs[el.index]
                                    })
                                    setStaffAllocated(staff)
                                }
                            }}
                            />
                        </div>
                        <button
                        disabled={staffAllocated.length === 0 || isInitiated}
                        onClick={() => {
                            onAllocateStaff()
                            // setStaffAllocated(allocatedStaff)
                            // setNoOfStudents({value: selectedCandidatesIndex.length})
                            // setIsView(false)
                            // setSelectedRows([])
                            // setCandidate(getCandidateList())
                        }}
                        className="button" 
                        style={{margin: "auto", marginTop: "2rem"}}>
                            Allocate
                        </button>
                    </div>
                </div> : 
                null
            }
            <div style={{width: "90%", margin: "auto"}}>
                <div style={{height: "100%"}}>
                    <Table
                    data={candidate}
                    setSelectedRows={onRowSelect}
                    />
                </div>
            </div>
        </div>
        </>
    )
}

export default withRouter(Allocator)
