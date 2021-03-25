import React, { useEffect, useState } from "react"
import { Route, Switch, Redirect } from "react-router-dom"

import Dashboard from "../Dashboard/Dashboard"
import Allocator from "./Allocator/Allocator"
import Staffs from "./Staffs/Staffs"
import AssetManager from "./AssetManager/AssetManager"
import AddStaff from "./Staffs/AddStaff/AddStaff"
import AddCandidate from "./Allocator/AddCandidate/AddCandidate"
import CandidateList from "../../CandidateList/CandidateList"
import ConvertedCandidates from "../../ConvertedCandidates/ConvertedCandidates"
import { getNavLinks, teacherNavLink } from "../../../service/SideBarService"
import { withRouter } from "react-router-dom"
import "../../../App.css"
import BroadCast from "./Broadcast/BroadCast"

const Admin = (props) => {

    const [location, setLocation] = useState(props.match.url)
    const [navLinks, setNavLinks] = useState([])
    const [currUrl, setCurrUrl] = useState("/")
    const [isAdmin, setIsAdmin] = useState(false)

    const getLocation = () => {
        return props.history.location.pathname
    }

    useEffect(() => {
        setLocation(getLocation())
        // if(localStorage.getItem("type").toLowerCase() === "admin") {
        //     setNavLinks(getNavLinks())
        // }
        setNavLinks(getNavLinks())
        setIsAdmin(localStorage.getItem('type').toLowerCase() === "admin")
    }, [])

    // const renderFunction = (url) => {

    // }

    return(
        <div style={{height: "100%", width: "100%", paddingTop: "3rem", display: "flex", position: "fixed"}}>
            <div className='tool-bar'>
                {
                    navLinks.map(el => {
                        return (
                            <div
                            key={el.name}
                            onClick={() => {
                                setCurrUrl(el.url)
                                props.history.push(el.url)
                            }}
                            style={{display: "flex", width: "90%", borderRadius: "10px", padding: "1rem", justifyContent: "center", alignItems: "center", cursor: "pointer", background: el.url === currUrl ? "darkgray" : null, color: el.url === currUrl ? "lightblue" : null}}>
                                <i style={{flex: 0.3, color: el.url === currUrl ? "lightblue" : null}} className={el.className}/>
                                <div style={{flex: 0.7, textAlign: "left", fontSize: "0.9rem", fontFamily: 'Roboto', textTransform: "capitalize", fontWeight: "bold"}}>
                                    {el.name}
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className='main'>
            <Switch>
                <Route path="/candidates/add" render={() => {
                    if(isAdmin) {
                        return <AddCandidate/>
                    } else {
                        return <Redirect to="/candidates"/>
                    }
                }}/>
                <Route path="/candidates/update" render={() => {
                    if(isAdmin) {
                        return <AddCandidate/>
                    }else {
                        return <Redirect to="/candidates"/>
                    }
                }}/>
                <Route path="/candidates" render={() => {
                    if(isAdmin) {
                        return <CandidateList/>
                    } else {
                        return <Redirect to="/candidates"/>
                    }
                }}/>
                {/* <Route path="/convertedCandidates" render={() => {
                    if(isAdmin) {
                        return <ConvertedCandidates/>
                    } else {
                        return <Redirect to="/candidates"/>
                    }
                }}/>
                <Route path="/staffs/update" render={() => {
                    if(isAdmin) {
                        return <AddStaff/>
                    } else {
                        return <Redirect to="/candidates"/>
                    }
                }}/>
                <Route path="/staffs/add" render={() => {
                    if(isAdmin) {
                        return <AddStaff/>
                    } else {
                        return <Redirect to="/candidates"/>
                    }
                }}/>
                <Route path="/staffs" render={() => {
                    if(isAdmin) {
                        return <Staffs/>
                    } else {
                        return <Redirect to="/candidates"/>
                    }
                }}/> */}
                <Route path="/candidates" component={CandidateList}/>
                <Route path="/assets" component={AssetManager}/>
                <Route path="/whatsapp-broadcast" component={BroadCast}/>
                <Route path={`/`} render={() => {
                    if(isAdmin) {
                        return <Dashboard/>
                    } else {
                        return <Redirect to="/candidates"/>
                    }
                }}/>
            </Switch>
            </div>
        </div>
    )
}

export default withRouter(Admin)
