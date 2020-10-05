import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from "./components/Header/Header"
import { Route, Router, Switch, Redirect } from 'react-router-dom';
import Home from './components/Home/Home';
import CandidateList from './components/CandidateList/CandidateList';
import Login from './components/Login/Login';
import Admin from "./components/Home/Admin/routes"
import SideBar from './ui/Backdrop/SideBar/SideBar';
import HeaderLogo from "./ui/HeaderLogo/HeaderLogo"


function App() {
  const [navLink, setNavLink] = useState([])
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn'))
  const [isBackdrop, setIsBackdrop] = useState(false) 

  const toggleBackDrop = () => {
      setIsBackdrop(!isBackdrop)
  }

  // useEffect(() => {
  //     setNavLink(getNavLinks())
  // }, [])


  const loginRender = () => {
    if(isLoggedIn) {
      return <Redirect to="/"/> 
    }
    
    return <Login setIsLoggedIn={setIsLoggedIn}/>
  }

  return (
    <div className="App">
      {
        isLoggedIn ?
          <Header/>
         : null
        }
        <>
          <main>
            <Switch>
              <Route path="/login" render={loginRender}/>
              {
                isLoggedIn ?
                  
                <Switch>
                  <Route path="/" component={Admin}/>
                  {/* <Route path="/candidates" component={CandidateList}/> */}
                  <Redirect to="/"/>
                </Switch>: 
                null
              }
              
              <Redirect to="/login"/>
            </Switch>
          </main>
        </>
    </div>
  );
}

export default App;
