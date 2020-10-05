import React from "react"
import styles from "./Title.module.css"

const Title = (props) => {

    return (
            <div className={styles["title"]}>
                <h2>
                    {props.title}
                </h2>
                {
                    !props.hideButton ?
                <button
                className="button"
                style={{background: props.color ? props.color : "red", color: "white"}} 
                onClick={props.onClick}>
                {props.buttonName ? props.buttonName : "Add"}
                </button> : null
                }
            </div>
    )
}

export default Title
