import React, { useEffect, useState } from "react"
import styles from "./SideBar.module.css"
import {useHistory, withRouter} from "react-router-dom"
import HeaderLogo from "../../HeaderLogo/HeaderLogo"


const SideBar = (props) => {
    const history = useHistory()
    const [navStyle, setNavStyle] = useState([styles['nav-bar-container']])

    useEffect(() => {
        setTimeout(() =>{
            setNavStyle([...navStyle, styles['nav-bar-container-on']])
        }, 50)
    }, [])

    return (
        <div className={navStyle.join(" ")}>
            <div style={{height: "3rem", width: "100%", marginTop: "0.5rem"}}>
                <HeaderLogo
                toggleBackDrop={props.toggleBackDrop}
                />
            </div>
            <ul className={styles['nav-bar-list']}>
                {
                    props.items ? 
                    props.items.map((el, i) => {
                        return (
                        <li
                        className={styles['nav-bar-list-item']}
                        onClick={() => {
                            props.toggleBackDrop()
                            props.history.push(el.url)
                        }} 
                        key={i}>
                            <i className={el.className}/>
                            {el.name.toUpperCase()}
                        </li>)
                    }) : 
                    null
                }
            </ul>
        </div>
    )
}

export default withRouter(SideBar)
