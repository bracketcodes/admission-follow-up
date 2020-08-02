import React, {useState, useEffect} from "react"
import styles from "./Call.module.css"
import { Device } from "twilio-client"
import axios from "axios"
import "../../App.css"


const Call = (props) => {
    const [isBackdrop, setIsBackdrop] = useState(false) 
    const [token, setToken] = useState('')
    const [isMute, setIsMute] = useState(false)
    const [isPhone, setIsPhone] = useState(false)
    const [isReady, setIsReady] = useState(false)
    const [connection, setConnection] = useState(null)
    const [isInitiated, setIsinitiated] = useState(false)
    const [feedback, setFeedback] = useState({
        val: ''
    })
    const [isCallStarted, setIsCallStarted] = useState(false)
    const device = new Device();


    // if(isReady && !isPhone && !isCallStarted) {
    //     console.log("hell")
    //     setIsCallStarted(true)
    // }
    
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

     
        console.log('tr')
        setIsinitiated(true)
    }
    
    const onStartCall = () => {
        setConnection(device.connect({phoneNumber: props.number}))
    }
    
    useEffect(() => {
        navigator.mediaDevices.getUserMedia({audio: {
            echoCancellation: true
        }})
        .then((res) => {
            // let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzY29wZSI6InNjb3BlOmNsaWVudDpvdXRnb2luZz9hcHBTaWQ9QVAxMGI1MjRiODg3ZmZhZjFiZTg1ZjVjNGJkOTFiNGI0OSIsImlzcyI6IkFDZmZiNmNmNjg3ODc2NzlmMGMzMzE4MzZkZTIxZmZhMjkiLCJleHAiOjE1OTYxNDA2MTcsImlhdCI6MTU5NjEzNzAxN30.V4s00sjfOAqZ6wBNOAUfqUV_zSw7fk_eSvj0b3XKOwo'
            
            axios.post('https://f7c29884d5b6.ngrok.io/token/generate')
            .then((res) => {
                // console.log(res.data.to)
                setToken(res.data.token)
                
                device.setup(res.data.token, {
                    enableRingingState: true
                })
                

                device.on('ready', () => {
                    setIsReady(true)
                    // console.log('ready')
                    setConnection(device.connect({phoneNumber: props.phoneNumber}))
                })

                device.on('error', () =>{
                    device.destroy()
                    props.toggleCall(false)
                })
                
                device.on('cancel', () =>{
                    device.destroy()
                    props.toggleCall(false)
                    console.log('cancel')
                })
                

                device.on('disconnect', () => {
                    device.destroy()
                    console.log('disconnected')
                    props.toggleCall(false)
                })
        
                device.on('connect', () =>{
                    setIsPhone(true)
                    console.log('connected')
                })

                // setToken(res.data.token)
            })
            .catch((err) => {
                console.log(err)
                props.toggleCall(false)
            })
        })
        .catch((err) => {
            console.log(err)
        })

    }, [])

    const toggleMute = () => {
        if(connection) {
            connection.mute(!isMute)
            setIsMute(!isMute)
        }
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
                        
                    </div>
                </div>
                <div className={styles['feedback-container']}>
                    <h2>
                        feedback
                    </h2>
                    <div className={styles['feedback-subcontainer']}>
                        <div className={styles['feedback-checklist']}>
                        </div>
                        <div className={styles['feedback-checklist']}>
                            <textarea
                            value={feedback.val}
                            onChange={(event) =>{
                                setFeedback(event.target.value)
                            }}
                            placeholder="feedback"
                            />
                            <div className={styles['submit']}>
                                Submit
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Call
