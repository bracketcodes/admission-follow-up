import React from "react"
import styles from "./Alert.module.css"

const Alert = (props) => {

    return (
            <div className="backdrop">
                <div className={styles["alert-box"]}>
                    {
                        props.color === "blue" ?
                        <i
                        style={{fontSize: "40px", color: "blue"}} 
                        className="fa fa-check-circle"/> : 
                        <i
                        style={{fontSize: "40px", color: "red"}} 
                        className="fa fa-check-circle"/>
                    }
                    
                    <p>
                        {props.message ? props.message : "Something went wrong"}
                    </p>
                    <button
                    style={{background: props.color ? props.color : "red", color: "white"} }
                    className="button"
                    onClick={() => {props.onClose(false)}}
                    >
                        OK
                    </button>
                </div>
            </div>
    )
}

export default Alert
