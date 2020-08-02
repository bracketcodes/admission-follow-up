import React, {useState, useEffect} from "react"
import styles from "./HeaderLogo.module.css"
import Backdrop from "../../ui/Backdrop/Backdrop"
import {getLogo} from "../../service/LogoService"
import SideBar from "../../ui/Backdrop/SideBar/SideBar"


const HeaderLogo = (props) => {

    const [logo, setLogo] = useState('')

    useEffect(() => {
        let logo = getLogo()
        setLogo(logo.url)
    }, [])

    return (
        <div 
        className={styles['logo-container']}>
            <div>
                <i
                onClick={props.toggleBackDrop} 
                className="fa fa-bars" 
                aria-hidden="true"/>
            </div>
            <div>
                {/* <img
                src={require("../../assets/logo_1.png")}
                alt="logo"
                /> */}
            </div>
        </div>
    )
}

export default HeaderLogo
