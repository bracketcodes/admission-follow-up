import React, {useEffect, useState} from "react"
import styles from "./BroadCast.module.css"
import MUIDataTable from "mui-datatables"
import { getCandidateList, getUnAllocatedCandidates } from "../../../../service/CandidateService"
import Title from "../../../../ui/Title/Title"
import { withRouter } from "react-router-dom"
import { getThemeProps } from "@material-ui/styles"
import Input from "../../../../ui/Input/Input"
import axios from "axios"


export const options = {
    selectableRows: false,
};

function useForceUpdate(){
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update the state to force render
}


const BroadCast = (props) => {
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
         name: "Catagory",
         label: "Category",
         options: {
          filter: true,
          sort: false,
         }
        },
        {
            name: "PhoneNumber",
            label: "Phone Number",
            options: {
             filter: true,
             sort: false,
            }
        }
       ];
    
    const forceUpdate = useForceUpdate()
    const [video, setVideo] = useState()
    const [isGenerate, setIsGenerate] = useState(false)
    const [message, setMessage] = useState()
    const [videoList, setVideoList] = useState([])
    const [qrCode, setQrCode] = useState({})
    const [data, setData] = useState([])
    const [isRecepients, setIsRecepients] = useState(false)
    const [recepientList, setRecepientList] = useState([])
    const [isSelectVideo, SetIsSelectVideo] = useState(false)
    const [totalSent, setTotalSent] = useState(0)
    const [isBroadCasting, setIsBroadcasting] = useState(false)
    const [successfullySent, setSuccessfullySent] = useState(0)
    const [unSuccessfull, setUnSuccessfull] = useState(0)
    let [timer, setTimer] = useState(40)
    let [int, setInt] = useState()
 

    useEffect(() => {
        if(data.length == 0) {
            (getUnAllocatedCandidates())
            .then(res => {
                if(res.status === 200) {
                    setData(res.data)
                }
            })
            .catch(err => {

            })
        }
        if(videoList.length == 0) {
            setVideoList([{link:'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4', fileName: 'filenmae'}])
        }
        
        if(qrCode['accountStatus'] === undefined) {
            startQrCode()
        }
    }, [])


    const startQrCode = async () => {
        await getQrCode()
        setTimer(40)
        clearInterval(int)
        setInt(setInterval(() => {setTimer(timer => timer -1)}, 1000))
    }

    if (timer == 0) {
        clearInterval(int)
    }

    const getQrCode = () => {
        axios.get("https://eu9.chat-api.com/instance159432/status?token=qqvxy98bhlo9j0n4")
        .then(res => {
            if(res.status == 200) {
                setQrCode(res.data)
            } else {
            }
        })
    }
    
    const onBroadCast = () => {
        setIsRecepients(false)
        setIsBroadcasting(true)
        let tempTotalSent = 0
        let tempSuccessfullySent = 0
        console.log(recepientList)
        for (let recepient of recepientList) {
            let data = new FormData()
            console.log('91' + recepient)
            data.append('phone', '91' + recepient)
            data.append('body', String(message).trim() + ' ' + `${video ? String(video.link).trim() : ''}`)
            axios.post("https://eu9.chat-api.com/instance159432/sendMessage?token=qqvxy98bhlo9j0n4",
            data=data).
            then(res => {
                tempTotalSent +=1 
                setTotalSent(tempTotalSent)
                if (res.status == 200) {
                    if(res.data.sent == true) {
                        tempSuccessfullySent += 1 
                        setSuccessfullySent(tempSuccessfullySent)
                    } 
                } 
            })
            .catch(err => {
                tempTotalSent +=1 
                setTotalSent(tempTotalSent)
            })
            
        }
        // setRecepientList([])
    }

    const logout = () => {
        axios.get("https://eu9.chat-api.com/instance159432/logout?token=qqvxy98bhlo9j0n4")
        .then(res => {
            if(res.status == 200) {
                startQrCode()
            } else {
            }
        })

    }

    return (
        <>
        {
        qrCode['accountStatus'] == "authenticated" ? 
        <div className={styles["broadcast-block"]}>
            <div className={styles['inputContainer']}>
                <div style={{width: "50%", margin: "auto", height: "auto"}}>
                <label>Message*</label>
                <textarea
                placeholder="Message"
                style={{marginTop: 0}} 
                onChange={(event) => {
                    setMessage(event.target.value)
                }}/>
                {
                    // video ?
                    // <div 
                    // style={{color: "blue", marginTop: "1rem", textAlign: "left", position: "relative", height: "auto"}}>
                    //     <p>video: </p> 
                    //     <i
                    //     onClick={() => {setVideo(null)}}
                    //     style={{right: 0, position: "absolute", color: "red", cursor: "pointer"}} 
                    //     className="fa fa-close"></i>
                    //     <a
                    //     style={{display: 'block'}} 
                    //     href={video.link}>video link</a>
                    // </div>: 
                // <div
                // onClick={() => {SetIsSelectVideo(true)}} 
                // style={{textDecoration: "underline", color: "blue", marginTop: "1rem", textAlign: "left", cursor: "pointer"}}>
                //     Attach Video
                // </div>
                }
                </div>
                <button
                disabled={!message}
                className="button"
                style={{background: "blue", color: "white"}} 
                onClick={() => {setIsRecepients(true)}}>
                {props.buttonName ? props.buttonName : "Select Recepients"}
                </button>
                <p
                onClick={logout} 
                style={{color: "red", cursor: "pointer"}}>
                    Disconnect Whatsapp
                </p>
            </div>
            {
                isSelectVideo ? 
                <div className="backdrop">
                    <div
                    style={{position: "relative"}} 
                    className={styles['videoList']}>
                        <i
                        onClick={() => {SetIsSelectVideo(false)}}
                        style={{position: "absolute", fontSize: "1rem", top: 1, right: 1}} 
                        className="fa fa-close"/>
                        {
                            videoList.length ? 
                            videoList.map(el => {
                                return (
                                <div
                                key={el.fileName}
                                onClick={() => {setVideo(el); SetIsSelectVideo(false)}} 
                                style={{width: "100%", height: "7rem", display: "flex", cursor: "pointer", 
                                marginTop: "1rem"}}>
                                    <div style={{flex: 0.5}}>
                                        <video style={{height: "100%", width: "100%"}} controls>
                                            <source src={el.link}/>
                                        </video>
                                    </div>
                                    <div style={{flex:0.5, padding: "0.3rem"}}>
                                        {el.fileName}
                                    </div>
                                </div>)

                            }) : "No videos has been uploaded"
                        }
                    </div>
                </div> : null
            }
            {
                isRecepients ?
                <div className="backdrop">
                <div
                style={{position: "relative"}} 
                className={styles['table']}>
                    <div className={styles['broadcast']}>
                    <i
                    onClick={() => {setIsRecepients(false)}}
                    style={{position: "absolute", fontSize: "1rem", top: 1, right: 1, cursor: "pointer"}} 
                    className="fa fa-close"/>
                        <button 
                        onClick={() => {onBroadCast()}}
                        disabled={!recepientList.length > 0}
                        style={{margin: 0, marginLeft: "2rem"}}
                        className="button">BroadCast</button>
                    </div>
                    <div className={styles['recepients']}>
                        <MUIDataTable
                        title={"Select recepients"}
                        data={data}
                        columns={columns}
                        options={
                            {
                                onRowSelectionChange: (a, b) => {
                                    let tempList = b.map(el => {
                                        return data[el.dataIndex]['PhoneNumber']
                                    })
                                    setRecepientList(tempList)
                                }
                            }
                        }
                    />
                    </div>
                </div>
                </div> : null
            }
            {
                isBroadCasting ?
                <div className="backdrop">
                <div 
                className={styles['progressbar-block']}>
                    <p><i className="fa fa-bullhorn"/> BroadCast in Progress...</p>
                    <p
                    style={{display: "block"}}
                    >{totalSent} / {recepientList.length}</p>
                    <div>
                        <div 
                        style={
                            {height: "100%", 
                             width: `${(totalSent / recepientList.length) * 100}%`,
                             borderRadius: "10px",
                             background: 'blue'}}>
                        </div>
                    </div>
                        <p>successfull Broadcast: {successfullySent} </p>
                        <p>Unsuccessful BroadCast: {totalSent - successfullySent}</p>
                    <button
                    onClick={() => {setIsBroadcasting(false);setSuccessfullySent(0); setTotalSent(0)}}
                    className="button"
                    >OK</button>
                </div>
                </div> : null
            }
        </div>: 
        qrCode['accountStatus'] == 'got qr code' ?
        <div style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
            <img
            style={{height: "300px", width: "300px"}} 
            src={timer == 0 ? require("../../../../assets/reload.png") :  qrCode['qrCode']}/>
            <div>{timer == 0 ? 
            <p
            style={{color: "blue", cursor: "pointer"}} 
            onClick={startQrCode}>Reload QR code</p> : timer}</div>
        <button
            className="button"
            style={{background: "blue", color: "white"}} 
            onClick={() => {startQrCode()}}>
            Authenticate
        </button>
    </div> : null
        }
        </>
    )
}

export default withRouter(BroadCast)
