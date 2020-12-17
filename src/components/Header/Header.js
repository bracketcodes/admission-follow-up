import React, {useState, useEffect} from "react"
import styles from "./Header.module.css"
import Backdrop from "../../ui/Backdrop/Backdrop"
import SideBar from "../../ui/Backdrop/SideBar/SideBar"
import HeaderLogo from "../../ui/HeaderLogo/HeaderLogo"
import { getNavLinks, teacherNavLink} from "../../service/SideBarService"
import { withRouter } from "react-router-dom"
import { getThemeProps } from "@material-ui/styles"


const Header = (props) => {
    const [isBackdrop, setIsBackdrop] = useState(false) 
    const [navLink, setNavLink] = useState([])

    const toggleBackDrop = () => {
        setIsBackdrop(!isBackdrop)
    }

    useEffect(() => {
        if(localStorage.getItem("type").toLowerCase() === "admin") {
            setNavLink(getNavLinks())
        } else {
            setNavLink(teacherNavLink())
        }
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
                {/* <div className={styles['tool-bar']}>
                    <i className="fa fa-home"/>
                    <i className="fa fa-users"/>
                </div> */}
                <header className={styles['header-container']}>
                    {/* <HeaderLogo
                    toggleBackDrop={toggleBackDrop}
                    /> */}
                    <p
                    onClick={() => {localStorage.clear(); window.location.reload()}} 
                    style={{color: "white", fontWeight: "bold", marginRight: "1.5rem", cursor: "pointer"}}>Sign out</p>
                </header>
            </div>
        </>
    )
}

export default withRouter(Header)
