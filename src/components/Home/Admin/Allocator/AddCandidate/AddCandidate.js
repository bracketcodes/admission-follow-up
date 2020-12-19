import React, { useState, useEffect } from "react"
import styles from "./AddCandidate.module.css"
import Title from "../../../../../ui/Title/Title"
import Input from "../../../../../ui/Input/Input"
import { withRouter } from "react-router-dom"
import MUIDataTable from "mui-datatables"
import { getCandidateList, addCandidate, uploadCandidate } from "../../../../../service/CandidateService"
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
        name: "Percentage",
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

    if(i === 4) {
        return parseInt(value) <= 100 || value.length === 0
    }

    if(i !== 3) {
        return value.length > 0
    }

    if(i === 3) {
        return value.length == 10
    }
}

const AddCandidate = (props) => {

    const [allocatedCandidates, setAllocatedCandidates] = useState(selectedCandidates)
    const [allocatedCandidatesIndex, setAllocatedCandidatesIndex] = useState(selectedCandidates)
    const [isUpdate, setIsUpdate] = useState(false)
    const [isView, setIsView] = useState(false)
    const [candidateData, setCandidateData] = useState([])
    const [onAddSuccess, setOnAddSuccess] = useState(false)
    const [onAddFailure, setOnAddFailure] = useState(false)
    const [isInitiated, setIsInitiated] = useState(false)
    const [noOfCalls, setNoOfCalls] = useState(0)
    const [currentCallLog, setCurrentCallLog] = useState({})
    let fileReader;

    useEffect(() => {
        selectedCandidates = []
        selectedCandidatesIndex = []
        setAllocatedCandidates([])
        setAllocatedCandidatesIndex([])
        if(window.location.href.search("update") !== -1) { 
            setIsUpdate(true)
            
            if(props.location?.state === undefined) {
                props.history.replace('/candidates')
            }
        }

        setCandidateData(props.location.state ? props.location.state.teacher_feedback : [])
        setNoOfCalls(props.location.state ? props.location.state.teacher_feedback.length : 0)
        
        
    }, [])

    
    const [name, setName] = useState(getInitialValue(props.location.state ? props.location.state.Name : ""))
    const [department, setDepartment] = useState(getInitialValue(props.location.state ? String(props.location.state.Catagory).toUpperCase(): ""))
    const [phoneNumber, setPhoneNumber] = useState(getInitialValue(props.location.state ? props.location.state.PhoneNumber : ""))
    const [percentage, setPercentage] = useState(getInitialValue(props.location.state ? props.location.state.percentage : "", true))
    const [isViewAllocated, setIsViewAllocated] = useState(false)
    const [isViewCallHistory, setIsViewCallHistory] = useState(false)
    const [isFileUpload, setIsFileUpload] = useState(false)
    const [fileValue, setFileValue] = useState()
    const [noOfStudents, setNoOfStudents] = useState({
        value: props.location.state ? props.location.state[3] : 0
    })
    const [isViewCallDetail, setIsViewCallDetail] = useState(false)
    const [missingColumn, setMissingColumn] = useState('')
    const callHistoryColumn = [
        // {
        //     name: "Name",
        //     label: "Name",
        //     options: {
        //   filter: true,
        //   sort: true,
        //  }
        // },
        // {
        //     name: "PhoneNumber",
        //     label: "Phone Number",
        //     options: {
        //   filter: true,
        //   sort: false,
        // }
        // },
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
                        onClick={() => {
                            setCurrentCallLog(candidateData[tableMeta.rowIndex])
                            setIsViewCallDetail(true)
                        }}
                        className="button" 
                        style={{background: "green", margin: "0rem"}}>
                            View
                        </button>
                            
                            );
                        },
                        filter: true,
                        sort: false,
                    }}  ];
                    
    const clearFields = () => {
        setName(getInitialValue())
        setDepartment(getInitialValue())
        setPhoneNumber(getInitialValue())
        setPercentage(getInitialValue())
    }

    const onBack = () => {
        props.history.goBack()
    }

    const setTouchedTrue = () => {
        setDepartment({
            ...department,
            isTouched: true,
        })
        setPercentage({
            ...percentage,
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

    const validateForm = () => {
        let partialValidation = name.isValid && phoneNumber.isValid && department.isValid

        if (percentage.value.length > 0) {
            partialValidation = partialValidation && percentage.isValid
        }

        return partialValidation
     }

    const onAddTeacher = () => {
        if(isFileUpload) {
            let data = new FormData()
            data.append('data', fileValue)
            uploadCandidate(data)
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
            let isValid = validateForm()
            
            if(isValid) {
                setIsInitiated(true)
                addCandidate({
                    "Name": name.value,
                    "PhoneNumber": parseInt('91' + phoneNumber.value),
                    "Catagory": department.value,
                    "percentage": percentage.value
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
    }

    const handleFileRead = (e) => {
        const content = fileReader.result
        try {
            let columns = String(content).split(/\r\n|\n/)[0].toLowerCase()
            for (let column of ['name', 'phone number', 'percentage', 'department']) {
                if(columns.indexOf(column) === -1) {
                    setMissingColumn(column)
                    setFileValue('')
                    throw Error
                }
            } 
            setMissingColumn('')
        } catch(err) {

        }
    }


    return (
        <>
        {
            onAddSuccess || onAddFailure ? 
            <Alert
            onClose={onAddSuccess ? setOnAddSuccess : setOnAddFailure}
            color={onAddSuccess ? "blue" : null}
            message={onAddSuccess ? "Candidate Added Successfully" : null}
            /> : null
        }
        <div className={styles["staffs-block"]}>
             {
                isView || isViewCallHistory ? 
                <div className="backdrop">
                    {
                        isView ?
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
                    </div> : 
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
                                    value={{value: currentCallLog.isInterested ? "YES" : "FALSE"}}
                                    label="Engg / Arts"
                                    />
                                    <Input
                                    width="20rem"
                                    disabled={true}
                                    value={{value: currentCallLog.departmentPreference}}
                                    label="Department Preference"
                                    />
                                    <Input
                                    width="20rem"
                                    disabled={"val"}
                                    value={{value: currentCallLog.isInterested ? "YES" : "NO"}}
                                    label="Is Interested in Nandha"
                                    />
                                     <Input
                                    disabled={true}
                                    width="20rem"
                                    value={"val"}
                                    // options={["ENGINEERING", "ARTS"]}
                                    value={{value: currentCallLog.whyInterested}}
                                    type="textarea"
                                    label={`Reason Why ${!currentCallLog.isInterested ? "not" : ""} interested in Nandha`} 
                                    />
                                    <Input
                                    disabled={true}
                                    width="20rem"
                                    value={{value: currentCallLog.isConvertable ? "YES" : "NO"}}
                                    label="Is Convertable"
                                    />
                                    <Input
                                    width="20rem"
                                    disabled={true}
                                    value={{value: currentCallLog.whyConvertable ? currentCallLog.whyConvertable : currentCallLog.isConvertableMessage}}
                                    type="textarea"
                                    label={`Reason Why ${!currentCallLog.isConvertable ? "not" : ""} convertable`} 
                                    />
                                    <Input
                                    width="20rem"
                                    disabled={true}
                                    value={{value: currentCallLog.isConverted ? "YES" : "NO"}}
                                    label={`Is Converted`} 
                                    />
                                    {
                                        currentCallLog.isConverted ?
                                        <Input
                                        disabled={true}
                                        width="20rem"
                                        value={{value: currentCallLog.allocatedDepartment}}
                                        label={`Allocated Department`} 
                                        /> : null
                                    }
                                    <Input
                                    disabled={true}
                                    width="20rem"
                                    value={{value: currentCallLog.feedback}}
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
                    </div>
                    }
                </div> : 
                null
            }
            <Title
            buttonName="back"
            onClick={onBack} 
            title={isUpdate ? "Update Candidate" : "Add Candidate"}/>
            <div className={styles['addStaff']}>
                <div style={{width: "80%", margin: "auto", maxWidth: "60rem", display: "flex", flexWrap: "wrap"}}>
                {
                    isFileUpload && !isUpdate? 
                    <>
                    {
                        missingColumn ?
                        <p style={{color: "red"}}>{missingColumn}: is mandatory column and its missing</p> : null
                    }
                    <input
                        type="file"
                        accept=".csv, application/vnd.ms-excel"
                        onChange={(event) => {
                            fileReader = new FileReader()
                            fileReader.onloadend = handleFileRead
                            if(event.target.files) {
                                fileReader.readAsText(event.target.files[0])
                                if(!missingColumn) {
                                    setFileValue(event.target.files[0])

                                }
                            } else {
                                setFileValue('')
                            }
                        }}
                        label="No of calls made"
                    />
                    <p
                    onClick={() => {setIsFileUpload(false)}} 
                    style={{color: "blue", cursor: "pointer", textDecoration: "underline"}}>
                        Add Student
                    </p> 
                    </>: <>
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
                    label="Category"
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
                    type="number"
                    i={4}
                    value={percentage}
                    validate={validate}
                    setValue={getInitialValue}
                    onChange={setPercentage}
                    label="Percentage"
                    />
                    <p
                    onClick={() => {if (!isUpdate) setIsFileUpload(true)}} 
                    style={{color: "blue", cursor: "pointer", textDecoration: "underline", width: "100%"}}>
                       {!isUpdate ? "Upload CSV File": ""} 
                    </p>
                    </>
                }
                    {
                        isUpdate ?
                        <>
                        <Input
                        type="text"
                        disabled={true}
                        value={{value: noOfCalls}}
                        onChange={(val) => {}}
                        label="No of calls made"
                        />
                        <div  
                        onClick={() => {setIsViewCallHistory(true)}}
                        style={{marginTop: "1rem", color: "blue", fontWeight: "block", cursor: "pointer"}}
                        className={styles["inputContainer"]}>
                            View Call history
                        </div>
                        <div  
                        style={{marginTop: "1rem", color: "blue", fontWeight: "block", cursor: "pointer", visibility: "hidden"}}
                        className={styles["inputContainer"]}>
                            {!isViewAllocated ?  "View Allocated candidates" : "Hide Allocated candidates"}
                        </div>
                        </> : null
                    }
                    
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
                        {
                            allocatedCandidates.length? 
                            <div className={styles['allocated']}>
                                <MUIDataTable
                                title={"Candidates to be allocated"}
                                data={allocatedCandidates}
                                columns={columns}
                                options={{selectableRows: false}}/>
                            </div> : null
                        }
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

export default withRouter(AddCandidate)
