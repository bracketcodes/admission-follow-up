import React, { useState, useEffect } from "react"
import styles from "./AddStaff.module.css"
import Title from "../../../../../ui/Title/Title"
import Input from "../../../../../ui/Input/Input"
import { withRouter } from "react-router-dom"
import MUIDataTable from "mui-datatables"
import { getCandidateList } from "../../../../../service/CandidateService"
import { addStaff, getCandidates } from "../../../../../service/StaffService"
import Alert from "../../../../../ui/Alert/Alert"

let selectedCandidates = []
let selectedCandidatesIndex = []
const columns = [
    {
     name: "Name",
     label: "Name",
     options: {
      filter: true,
      sort: true,
     }
    },
    {
     name: "PhoneNumber",
     label: "Phone Number",
     options: {
      filter: true,
      sort: false,
     }
    },
    {
        name: "percentage",
        label: "Percentage",
        options: {
         filter: true,
         sort: false,
        }} ];
    
        
   
   
    const options = {
      selectableRows: false,
    };


export const getInitialValue = (value="", isValid=false, isTouched=false) => {
    return {
        value: value,
        isValid: isValid,
        isTouched: isTouched
    }
}

export const validate = (value, i) => {

    if(i !== 3) {
        return value.length > 0
    }

    if(i === 3) {
        return value.length == 10
    }
}

const AddStaff = (props) => {

    const [allocatedCandidates, setAllocatedCandidates] = useState(selectedCandidates)
    const [allocatedCandidatesIndex, setAllocatedCandidatesIndex] = useState(selectedCandidates)
    const [isUpdate, setIsUpdate] = useState(false)
    const [isView, setIsView] = useState(false)
    const [isViewCallHistory, setIsViewCallHistory] = useState(false)
    const [candidateData, setCandidateData] = useState([])
    const [isViewCallDetail, setIsViewCallDetail] = useState(false)
    const callHistoryColumn = [
        {
         name: "Name",
         label: "Name",
         options: {
          filter: true,
          sort: true,
         }
        },
        {
         name: "PhoneNumber",
         label: "Phone Number",
         options: {
          filter: true,
          sort: false,
         }
        },
        {
            name: "duration",
            label: "duration",
            options: {
             filter: true,
             sort: false,
            },
        },
        {
            name: "duration",
            label: "View",
            options: {
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <button
                        onClick={() => {setIsViewCallDetail(true)}}
                        className="button" 
                        style={{background: "green", margin: "0rem"}}>
                            View
                        </button>
                            
                    );
                  },
             filter: true,
             sort: false,
            }}  ];
    
    useEffect(() => {
        selectedCandidates = []
        selectedCandidatesIndex = []
        setAllocatedCandidates([])
        setAllocatedCandidatesIndex([])
        if(window.location.href.search("update") !== -1) { 
            setIsUpdate(true)
            
            if(props.location?.state === undefined) {
                props.history.replace('/staffs')
            } else {
                getCandidates(props.location.state._id)
                .then(res => {
                    if(res.status === 200) {
                        setAllocatedCandidates(res.data)
                        setNoOfStudents(res.data.length)
                    } 
                })
                .catch(err => {
                    
                })

            }

            

        }
        
        getCandidateList()
        .then(res => {
            if(res.status == 200) {
                setCandidateData(res.data)
            }
        })
        .catch(err => {
            
        })
    }, [])
    
    const [name, setName] = useState(getInitialValue(props.location.state ? props.location.state.Name : ""))
    const [department, setDepartment] = useState(getInitialValue(props.location.state ? props.location.state.Catagory : ""))
    const [phoneNumber, setPhoneNumber] = useState(getInitialValue(props.location.state ? props.location.state.PhoneNumber : ""))
    const [password, setPassword] = useState(getInitialValue(props.location.state ? props.location.state.password : ""))
    const [isViewAllocated, setIsViewAllocated] = useState(false)
    const [onAddSuccess, setOnAddSuccess] = useState(false)
    const [onAddFailure, setOnAddFailure] = useState(false)
    const [noOfStudents, setNoOfStudents] = useState(0)
    const [isInitiated, setIsInitiated] = useState(false)
    
    const onBack = () => {
        props.history.goBack()
    }

    const validateForm = () => {
        return name.isValid && phoneNumber.isValid && department.isValid && password.isValid
    }

    const clearFields = () => {
        setName(getInitialValue())
        setPassword(getInitialValue())
        setDepartment(getInitialValue())
        setPhoneNumber(getInitialValue())
    }

    const setTouchedTrue = () => {
        setDepartment({
            ...department,
            isTouched: true,
        })
        setPassword({
            ...password,
            isTouched: true,
        })
        setName({
            ...name,
            isTouched: true,
        })
        setPhoneNumber({
            ...phoneNumber,
            isTouched: true
        })
    }
    
    const onAddTeacher = () => {
        let isValid = validateForm()
        
        if(isValid) {
            setIsInitiated(true)
            addStaff({
                "Name": name.value,
                "Catagory": department.value,
                "password": password.value,
                "PhoneNumber": parseInt('91' + phoneNumber.value)
            })
            .then(res => {
                if(res.status === 200) {
                    clearFields()
                    setOnAddSuccess(true)
                    setIsInitiated(false)
                }
            })
            .catch(err => {
                setIsInitiated(false)
                setOnAddFailure(true)
            })
        } else {
            setTouchedTrue()
        }
    }
    
    
    return (
        <>
         {
            onAddSuccess || onAddFailure ? 
            <Alert
            onClose={onAddSuccess ? setOnAddSuccess : setOnAddFailure}
            color={onAddSuccess ? "blue" : null}
            message={onAddSuccess ? "Staff Added Successfully" : null}
            /> : null
        }
        <div className={styles["staffs-block"]}>
             {
                 isView || isViewCallHistory ? 
                 <div className="backdrop">
                    {isView ?
                    <div
                    style={{position: "relative"}} 
                    className="view-container">
                        <h2>
                            Candidates
                        </h2>
                        <i
                        onClick={() => {setIsView(false)}}
                        style={{position: "absolute", top: "2%", right: "2%", cursor: "pointer"}} 
                        className="fa fa-close"/>
                        <div className={styles['table']}>
                            <MUIDataTable
                            title={"Candidate List"}
                            data={candidateData}
                            columns={columns}
                            options={{
                                rowsSelected: allocatedCandidatesIndex,
                                onRowsSelect: (a, b) => {
                                    console.log(allocatedCandidatesIndex)
                                    let canditates = b.map(el => {
                                        return candidateData[el.index]
                                    })
                                    let candidateIndex = b.map(el => {
                                        return el.index
                                    }) 

                                    selectedCandidates = canditates
                                    selectedCandidatesIndex = candidateIndex
                                }
                            }}
                            />
                        </div>
                        <button
                        onClick={() => {
                            setAllocatedCandidates(selectedCandidates)
                            // setNoOfStudents({value: selectedCandidatesIndex.length})
                            setAllocatedCandidatesIndex(selectedCandidatesIndex)
                            setIsView(false)
                        }}
                        className="button" 
                        style={{margin: "auto", marginTop: "2rem"}}>
                            Allocate
                        </button>
                    </div>: 
                    <div
                    style={{position: "relative"}} 
                    className="view-container">
                        <h2>
                            Call History
                        </h2>
                        {
                            !isViewCallDetail ?
                        <i
                        onClick={() => {setIsView(false); setIsViewCallHistory(false)}}
                        style={{position: "absolute", top: "2%", right: "2%", cursor: "pointer"}} 
                        className="fa fa-close"/> : 
                        <p
                        style={{position: "absolute", top: "2%", right: "2%", cursor: "pointer", color: "gray"}} 
                        onClick={() => {setIsViewCallDetail(false)}}>back</p>
                        }
                        <div className={styles['table']}>
                            {
                                isViewCallDetail ? 
                                <div>
                                    <Input
                                    disabled={true}
                                    width="20rem"
                                    value={"val"}
                                    label="Engg / Arts"
                                    />
                                    <Input
                                    width="20rem"
                                    disabled={true}
                                    value={"val"}
                                    label="Department Preference"
                                    />
                                    <Input
                                    width="20rem"
                                    disabled={"val"}
                                    value={""}
                                    label="Is Interested in Nandha"
                                    />
                                     <Input
                                    disabled={true}
                                    width="20rem"
                                    value={"val"}
                                    // options={["ENGINEERING", "ARTS"]}
                                    type="textarea"
                                    // label={`Reason Why ${isInterested.value.toLowerCase() === "no" ? "not" : ""} interested in Nandha`} 
                                    />
                                    <Input
                                    disabled={true}
                                    width="20rem"
                                    value={"val"}
                                    label="Is Convertable"
                                    />
                                    <Input
                                    width="20rem"
                                    disabled={true}
                                    value="val"
                                    type="textarea"
                                    // label={`Reason Why ${isConvertable.value.toLowerCase() === "no" ? "not" : ""} convertable`} 
                                    />
                                    <Input
                                    width="20rem"
                                    disabled={true}
                                    value="val"
                                    label={`Is Converted`} 
                                    />
                                    <Input
                                    disabled={true}
                                    width="20rem"
                                    // visibility={isConverted.value.toLowerCase() === "yes" ? "" : "hidden"}
                                    value={""}
                                    label={`Allocated Department`} 
                                    />
                                    <Input
                                    disabled={true}
                                    width="20rem"
                                    value={""}
                                    disabled={true}
                                    type="textarea"
                                    label={`Feebback`} 
                                    />
                                </div>:
                                    <MUIDataTable
                                    title={"Total Calls made"}
                                    data={candidateData}
                                    columns={callHistoryColumn}
                                    options={{
                                        ...options
                                    }}
                                    />
                            }
                        </div>
                    </div>}
                </div> : 
                null
            }
            <Title
            buttonName="back"
            onClick={onBack} 
            title={isUpdate ? "Update Staff" : "Add Staff"}/>
            <div className={styles['addStaff']}>
                <div style={{width: "80%", margin: "auto", maxWidth: "60rem", display: "flex", flexWrap: "wrap"}}>
                    <Input
                    i={1}
                    value={name}
                    onChange={setName}
                    setValue={getInitialValue}
                    type="text"
                    validate={validate}
                    label="Name"
                    />
                    <Input
                    i={2}
                    setValue={getInitialValue}
                    value={department}
                    validate={validate}
                    onChange={setDepartment}
                    options={["ENGINEERING", "ARTS"]}
                    type="select"
                    label="Department"
                    />
                    <Input
                    type="number"
                    i={3}
                    value={phoneNumber}
                    validate={validate}
                    setValue={getInitialValue}
                    onChange={setPhoneNumber}
                    label="Phone Number"
                    />
                    <Input
                    type="text"
                    i={4}
                    value={password}
                    validate={validate}
                    setValue={getInitialValue}
                    onChange={setPassword}
                    label="Password"
                    />
                    {/* <Input
                    disabled={true}
                    // type="number"
                    i={5}
                    value={{value: noOfStudents}}
                    validate={() => {}}
                    setValue={getInitialValue}
                    onChange={(val) => {}}
                    label="No of Students Allocated"
                    /> */}
                    <div
                    style={{visibility: "hidden"}} 
                    className={styles["inputContainer"]}>
                        <button
                        onClick={() => {setIsView(true)}}
                        style={{margin: 0, color: "white", width: "auto"}} 
                        className="button">
                            Allocate Students
                        </button>
                    </div>
                    {isUpdate ?
                    <>
                        <div  
                        onClick={() => {setIsViewAllocated(!isViewAllocated)}}
                        style={{marginTop: "1rem", color: "blue", fontWeight: "block", cursor: "pointer"}}
                        className={styles["inputContainer"]}>
                            {!isViewAllocated ?  "View Allocated candidates" : "Hide Allocated candidates"}
                        </div>
                        <div
                        onClick={() => { 
                            setIsView(false)
                            setIsViewCallHistory(true) }}
                        style={{marginTop: "1rem", color: "blue", fontWeight: "block", cursor: "pointer"}}
                        className={styles["inputContainer"]}>
                            View Call History
                        </div>
                    </> : null}
                    {
                            isUpdate && isViewAllocated && allocatedCandidates.length? 
                            <div className={styles['allocated']}>
                                <MUIDataTable
                                title={name.value + "  follows"}
                                data={allocatedCandidates}
                                columns={columns}
                                options={{selectableRows: false}}/>
                            </div> : null
                        }
                        {/* {
                            allocatedCandidates.length? 
                            <div className={styles['allocated']}>
                                <MUIDataTable
                                title={"Candidates to be allocated"}
                                data={allocatedCandidates}
                                columns={columns}
                                options={{selectableRows: false}}/>
                            </div> : null
                        } */}
                    <div style={{width: "100%"}}>
                        <button
                        disabled={isInitiated}
                        className="button"
                        style={{color: "white", visibility: isUpdate ? "hidden" : ""}} 
                        onClick={() => {onAddTeacher()}}>
                            {
                                isUpdate ? "Update" : "Submit"
                            }
                        </button>
                        <button
                        className="button"
                        style={{color: "white", background: isUpdate ? "red" : "blue", visibility: isUpdate ? "hidden" : ""}}
                        > {
                            isUpdate ? "Delete" : "Clear"
                        }</button>
                    </div>  
                </div>
                </div>
        </div>
        </>
    )
}

export default withRouter(AddStaff)
