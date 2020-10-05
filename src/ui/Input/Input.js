import React from "react"
import styles from "./Input.module.css"

const Input = (props) => {
    let inputBlock = (
        <input
        disabled={props.disabled ? true : false}
        style={props.style ? {...props.style} : null}
        onBlur={() => {
            props.onChange({
                ...props.value,
                isTouched: true
            })}}
            onChange={(event) => {
                if(props.type == "number") {
                    console.log(/^[0-9]*$/.test(event.target.value))
                    if(/^[0-9]*$/.test(event.target.value) || event.target.value === "") {
                        console.log(props.value)
                        props.onChange({
                        ...props.setValue(event.target.value, props.validate(event.target.value, props.i), props.value?.isTouched)
                        })
                    }
                    } else {
                        props.onChange({
                            ...props.setValue(event.target.value, props.validate(event.target.value, props.i), props.value?.isTouched)
                            })
                }
    }}
    value={props.value ? props.value.value : ""}
    />)


    if(props.type == "textarea") {
        inputBlock = (
            <textarea
            style={{width: "100%", fontSize: "1rem"}}
            disabled={props.disabled ? true : false}
            onBlur={() => {
                props.onChange({
                    ...props.value,
                    isTouched: true
                })}}
                onChange={(event) => {
                    if(props.type == "number") {
                        console.log(/^[0-9]*$/.test(event.target.value))
                        if(/^[0-9]*$/.test(event.target.value) || event.target.value === "") {
                            console.log(props.value)
                            props.onChange({
                            ...props.setValue(event.target.value, props.validate(event.target.value, props.i), props.value?.isTouched)
                            })
                        }
                        } else {
                            props.onChange({
                                ...props.setValue(event.target.value, props.validate(event.target.value, props.i), props.value?.isTouched)
                                })
                    }
        }}
        value={props.value ? props.value.value : ""}
        />)
    }


    if(props.type == "select") {
        let optionsList = props.options ? props.options : []
        inputBlock = (
            <select
            style={{visibility: props.visibility == "hidden" ? "hidden" : "unset"}}
            onBlur={() => {props.onChange({
                ...props.value,
                isTouched: true
            })}}
            onChange={(event) => {
                props.onChange({
                ...props.setValue(event.target.value, props.validate(event.target.value, props.i), props.value.isTouched),
            })}}
            value={props.value ? props.value.value : ""}
            >
                <option value="">{props.emptyValue ? props.emptyValue : "SELECT"}</option>
                {
                    optionsList.map((el,i) => {
                        return <option key={`${i}`} value={el}>{el}</option>
                    })
                }
            </select>
        )
    }

    return (
        <div
        style={props.width ? {width: props.width} : null}
        className={styles["inputContainer"]}>
            <label style={{color: props.value?.isTouched && !props.value?.isValid ? "red" : "gray"}}>
                {props.visibility === "hidden" ? "" : props.label}
            </label>
            {inputBlock}
        </div>
    )
}

export default Input
