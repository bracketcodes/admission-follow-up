import React, {useState, useEffect} from "react"
import styles from "./Call.module.css"
import { Device } from "twilio-client"
import axios from "axios"
import "../../App.css"
import Input from "../../ui/Input/Input"
import { getInitialValue } from "../../components/Home/Admin/Allocator/AddCandidate/AddCandidate"
import { updateStudentInfo } from "../../service/CandidateService"

const Call = (props) => {
    const [isBackdrop, setIsBackdrop] = useState(false) 
    const [callStartTime, setCallStartTime] = useState(new Date()) 
    const [token, setToken] = useState('')
    const [isMute, setIsMute] = useState(false)
    const [isPhone, setIsPhone] = useState(false)
    const [isReady, setIsReady] = useState(false)
    const [connection, setConnection] = useState(null)
    const [isInitiated, setIsinitiated] = useState(false)
    const [feedback, setFeedback] = useState(getInitialValue())
    const [isCallStarted, setIsCallStarted] = useState(false)
    const [isEngineering, setIsEngineering] = useState(getInitialValue())
    const [department, setDepartment] = useState(getInitialValue())
    const [isInterested, setIsInterested] = useState(getInitialValue())
    const [whyInterested, setWhyInterested] = useState(getInitialValue())
    const [whyConvertable, setWhyConvertable] = useState(getInitialValue())
    const [isConvertable, setIsConvertable] = useState(getInitialValue())
    const [isConverted, setIsConverted] = useState(getInitialValue())
    const [allocatedDepartment, setAllocatedDepartment] = useState(getInitialValue())
    // const [feedback, setFeedback] = useState("")
    const device = new Device();


    // if(isReady && !isPhone && !isCallStarted) {
    //     console.log("hell")
    //     setIsCallStarted(true)
    // }

    const validateForm = () => {
        let partialValidation = feedback.isValid && whyInterested.isValid && whyConvertable.isValid &&
            isConverted.isValid && isConvertable.isValid && isInterested.isValid && department.isValid
            && isEngineering.isValid
        
        if(isConverted.value.toLowerCase() === "yes") {
            partialValidation = partialValidation && allocatedDepartment.isValid
        }

        return partialValidation
    }

    const onSubmit = () => {
    
        setIsEngineering({
            ...isEngineering,
            isTouched: true
        })
        setDepartment({
            ...department,
            isTouched: true
        })
        setWhyConvertable({
            ...whyConvertable,
            isTouched: true
        })
        setWhyInterested({
            ...whyInterested,
            isTouched: true
        })
        setIsInterested({
            ...isInterested,
            isTouched: true
        })
        setIsConvertable({
            ...isConvertable,
            isTouched: true
        })
        setIsConverted({
            ...isConverted,
            isTouched: true
        })
        setFeedback( {
            ...feedback,
            isTouched: true
        })
        let isValid = validateForm()

        if(isValid) {
            updateStudentInfo(props.id, {
                "Message": whyInterested.value,
                "Catagory": isEngineering.value,
                "lastcall": new Date(),
                "teacher_feedback": {
                    teacher_id: localStorage.getItem('id'),
                    whyInterested: whyInterested.value,
                    category: isEngineering.value,
                    Catogory: isEngineering.value,
                    departmentPreference: department.value,
                    isInterested: isInterested.value.toLowerCase() === "yes",
                    isConvertable: isConvertable.value.toLowerCase() === "yes",
                    whyConvertable: whyConvertable.value,
                    duration: "dur",
                    isConverted: isConverted.value.toLowerCase() === "yes",
                    feedback: feedback.value,
                    allocatedDepartment: allocatedDepartment.value
                },
                "departmentPreference": department.value,
                "isInterested": isInterested.value.toLowerCase() === "yes",
                "isConvertable": isConvertable.value.toLowerCase() === "yes",
                "isConvertableMessage": whyConvertable.value,
                // "isConverted": isConverted.value
            }).then(res => {
                props.toggleCall(false)
            }).catch(err => {
                props.toggleCall(false)
            }) 
        }
    }
    
    if(connection && !isInitiated) {
        connection.on('mute', () => {
            setIsMute(connection.isMuted())
        })

        connection.on('ringing', () => {
            console.log('ringing')
        })

        connection.on('disconnect', () => {
            console.log('disconnect')
        })

        setIsinitiated(true)
    }
    
    const onStartCall = () => {
        setConnection(device.connect({phoneNumber: props.number}))
    }
    
    useEffect(() => {
        // navigator.mediaDevices.getUserMedia({audio: {
        //     echoCancellation: true
        // }})
        // .then((res) => {
        //     let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzY29wZSI6InNjb3BlOmNsaWVudDpvdXRnb2luZz9hcHBTaWQ9QVAxMGI1MjRiODg3ZmZhZjFiZTg1ZjVjNGJkOTFiNGI0OSIsImlzcyI6IkFDZmZiNmNmNjg3ODc2NzlmMGMzMzE4MzZkZTIxZmZhMjkiLCJleHAiOjE1OTYxNDA2MTcsImlhdCI6MTU5NjEzNzAxN30.V4s00sjfOAqZ6wBNOAUfqUV_zSw7fk_eSvj0b3XKOwo'
            
        //     axios.post('https://e19406e9dc45.ngrok.io/token/generate')
        //     .then((res) => {
        //         // console.log(res.data.to)
        //         setToken(res.data.token)
                
        //         device.setup(res.data.token, {
        //             enableRingingState: true
        //         })
                

        //         device.on('ready', () => {
        //             setIsReady(true)
        //             // console.log('ready')
        //             // setConnection(device.connect({phoneNumber: props.phoneNumber}))
        //         })

        //         device.on('error', () =>{
        //             device.destroy()
        //             // props.toggleCall(false)
        //         })
                
        //         device.on('cancel', () =>{
        //             device.destroy()
        //             // props.toggleCall(false)
        //             console.log('cancel')
        //         })
                

        //         device.on('disconnect', () => {
        //             device.destroy()
        //             console.log('disconnected')
        //             // props.toggleCall(false)
        //         })
        
        //         device.on('connect', () =>{
        //             setIsPhone(true)
        //             console.log('connected')
        //         })

        //         // setToken(res.data.token)
        //     })
        //     .catch((err) => {
        //         console.log(err)
        //         // props.toggleCall(false)
        //     })
        // })
        // .catch((err) => {
        //     console.log(err)
        // })
        // setCallStartTime(new Date())
    }, [])

    const toggleMute = () => {
        if(connection) {
            connection.mute(!isMute)
            setIsMute(!isMute)
        }
    }

    const validate = (val, i) => {
        return val.length > 0
    }

    const onCallEnd = () => {
        if(connection) {
            connection.disconnect()
            props.toggleCall(false)
        }
    }

    return ( 
        <div className="backdrop-container">
            <div className={styles["call-container"]}>
                <div className={styles['call']}>
                    <div className={styles["image-container"]}>
                        <div className={styles["image"]}>
                            <i className="fa fa-user"/>
                        </div>
                        <p style={{textAlign: "center"}}>
                            {props.phoneNumber}
                        </p>
                    </div>
                    {
                        isReady && !isPhone? <div>Start Call</div> : null
                    }
                     {
                         isReady && isPhone ?
                    <div className={styles["control-container"]}>
                            <div
                            onClick={() => {onCallEnd()}} 
                            className={styles["call-end"]}>
                                <img src={require("../../assets/call-end.png")}></img>
                            </div>
                            <div
                            style={{backgroundColor: isMute ? "orange" : "gray"}} 
                            onClick={() => {toggleMute()}} 
                            className={styles["mute"]}>
                                <i
                                className={isMute ? "fa fa-microphone-slash" : "fa fa-microphone"}/>
                            </div>
                        
                    </div> : null
                    }
                </div>
                <div className={styles['feedback-container']}>
                    <h2>
                        feedback
                    </h2>
                    <div 
                    style={{overflowY: "scroll", height: "90%", padding: "1rem"}}
                    className={styles['feedback-subcontainer']}>
                        <div
                        style={{width: "90%",  margin: "auto", display: "flex", flexWrap: "wrap"}} 
                        className={styles['feedback-checklist']}>
                            <Input
                            i={1}
                            width="20rem"
                            setValue={getInitialValue}
                            value={isEngineering}
                            validate={validate}
                            onChange={setIsEngineering}
                            options={["ENGINEERING", "ARTS"]}
                            type="select"
                            label="Engg / Arts"
                            />
                            <Input
                            width="20rem"
                            i={2}
                            setValue={getInitialValue}
                            value={department}
                            validate={validate}
                            onChange={setDepartment}
                            options={["B.COM", "BBA"]}
                            type="select"
                            label="Department Preference"
                            />
                            <Input
                            width="100%"
                            i={3}
                            setValue={getInitialValue}
                            value={isInterested}
                            validate={validate}
                            onChange={setIsInterested}
                            options={["YES", "NO"]}
                            type="select"
                            label="Is Interested in Nandha"
                            />
                             <Input
                            i={4}
                            width="100%"
                            setValue={getInitialValue}
                            value={whyInterested}
                            validate={validate}
                            onChange={setWhyInterested}
                            // options={["ENGINEERING", "ARTS"]}
                            type="textarea"
                            label={`Reason Why ${isInterested.value.toLowerCase() === "no" ? "not" : ""} interested in Nandha`} 
                            />
                            <Input
                            i={5}
                            width="100%"
                            setValue={getInitialValue}
                            value={isConvertable}
                            validate={validate}
                            onChange={setIsConvertable}
                            options={["YES", "NO"]}
                            type="select"
                            label="Is Convertable"
                            />
                            <Input
                            i={6}
                            width="100%"
                            setValue={getInitialValue}
                            value={whyConvertable}
                            validate={validate}
                            onChange={setWhyConvertable}
                            // options={["ENGINEERING", "ARTS"]}
                            type="textarea"
                            label={`Reason Why ${isConvertable.value.toLowerCase() === "no" ? "not" : ""} convertable`} 
                            />
                            <Input
                            i={7}
                            width="20rem"
                            setValue={getInitialValue}
                            value={isConverted}
                            validate={validate}
                            onChange={setIsConverted}
                            options={["Yes", "No"]}
                            type="select"
                            label={`Is Converted`} 
                            />
                            <Input
                            i={8}
                            width="20rem"
                            visibility={isConverted.value.toLowerCase() === "yes" ? "" : "hidden"}
                            setValue={getInitialValue}
                            value={allocatedDepartment}
                            validate={validate}
                            onChange={setAllocatedDepartment}
                            options={["Dept1", "Dept2"]}
                            type="select"
                            label={`Allocated Department`} 
                            />
                            <Input
                            i={9}
                            width="100%"
                            setValue={getInitialValue}
                            value={feedback}
                            validate={validate}
                            onChange={setFeedback}
                            // options={["Dept1", "Dept2"]}
                            type="textarea"
                            label={`Feebback`} 
                            />
                        </div>
                        <div className={styles['feedback-checklist']}>
                            <button
                            onClick={() => {onSubmit()}} 
                            className="button">
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Call
