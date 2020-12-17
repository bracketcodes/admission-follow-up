import React, {useEffect, useState} from "react"
import styles from "./AssetManager.module.css"
import MUIDataTable from "mui-datatables"
import Title from "../../../../ui/Title/Title"
import { withRouter } from "react-router-dom"
import axios from "axios"
import Input from "../../../../ui/Input/Input"

const AssetManager = (props) => {
    const [data, setData] = useState([])
    const [isAdd, setIsAdd] = useState(false)
    const [fileValue, setFilevalue] = useState()
    const [description, setDescription] = useState()

    useEffect(() => {
        if(data.length == 0) {
            setData(['https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4','https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4'])
        }
    }, [])

    const onUpload = () => {
        let data = new FormData()
        if(fileValue) {
            data.append('data', fileValue)
            data.append('description', description ?  description : '')
            axios.post('http://localhost:3000/api/media/videoUpload', data=data)
            .then(res => {
                if(res.status == 200) {
                    console.log('file uploaded successfully')
                }
            })
            .catch(err => {
                console.log(err)
            })
        }
    }

    return (
        <div className={styles['asset-block']}>
            <Title
            buttonName={isAdd ? "Back": "Add"}
            onClick={() => {setIsAdd(!isAdd)}} 
            title="Assets" />
            {
                isAdd ? 
                <div className={styles['onAdd']}>
                    <div className={styles['inputContainer']}>
                        <div style={{width: "50%", margin: "auto", height: "auto"}}>
                        <label>Video File(mp4)*</label>
                        <input
                        placeholder="Video File (mp4)"
                        type="file"
                        accept="video/mp4"
                        style={{marginTop: 0}} 
                        onChange={(event) => {
                            setFilevalue(event.target.files[0])
                        }}/>
                        </div>
                        <input
                        placeholder="Description"
                        onChange={(event) => {
                            setDescription(event.target.value)
                        }}
                        />
                        <button
                        className="button"
                        style={{background: "blue", color: "white"}} 
                        onClick={onUpload}>
                        {props.buttonName ? props.buttonName : "Upload"}
                        </button>
                    </div>
                </div> : data.length ?
                <div style={{width: "100%", height: "auto", display: "flex", flexWrap: "wrap", flexDirection: "row", justifyContent: "center"}}>
                {data.map(el => {
                    return (<div className={styles['asset-grid']}>
                                <video
                                style={{width: "100%", height: "80%"}} 
                                controls>
                                    <source src={el} type="video/mp4"/>
                                </video>
                                <p>
                                    Test description
                                </p>
                            </div>)
                })} 
                </div>
                 : 
                <p>No Assets to Show</p>
            }
        </div>
    )
}

export default withRouter(AssetManager)
