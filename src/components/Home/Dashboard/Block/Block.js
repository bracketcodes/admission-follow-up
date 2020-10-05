import React from "react"
import styles from "./Block.module.css"
import {withRouter} from "react-router-dom"


const Block = (props) => {

    const onGoToLink = (link) => {
        props.history.push(link)
    }

    return (
        <div 
        onClick={() => {onGoToLink(props.link)}}
        className={styles["block"]}>
            <p>
                {props.title}
            </p>
            <i
            style={{fontSize: "2rem", color: props.color}} 
            className={props.iconClass}/>
            <p>
                {props.count}
            </p>
        </div>
    )
}

export default withRouter(Block)
