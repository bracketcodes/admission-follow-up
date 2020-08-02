import React, {useState, useEffect} from "react"
import styles from "./Header.module.css"
import Backdrop from "../../ui/Backdrop/Backdrop"
import SideBar from "../../ui/Backdrop/SideBar/SideBar"
import HeaderLogo from "../../ui/HeaderLogo/HeaderLogo"
import {getNavLinks} from "../../service/SideBarService"


const Header = (params) => {
    const [isBackdrop, setIsBackdrop] = useState(false) 
    const [navLink, setNavLink] = useState([])

    const toggleBackDrop = () => {
        setIsBackdrop(!isBackdrop)
    }

    useEffect(() => {
        setNavLink(getNavLinks())
    }, [])

    return (
        <>
            {
                isBackdrop ? 
                <>
                    <Backdrop
                    onClick={toggleBackDrop}
                    /> 
                    <SideBar
                    toggleBackDrop={toggleBackDrop}
                    items={navLink}/>
                </> : 
                null
            }
            <div className={styles['header-box']}>
                <div className={styles['tool-bar']}>
                    <i className="fa fa-home"/>
                    <i className="fa fa-users"/>
                </div>
                <header className={styles['header-container']}>
                    <HeaderLogo
                    toggleBackDrop={toggleBackDrop}
                    />
                </header>
            </div>
        </>
    )
}

export default Header
