import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from "./components/Header/Header"
import { Route, Router, Switch, Redirect } from 'react-router-dom';
import Home from './components/Home/Home';
import CandidateList from './components/CandidateList/CandidateList';
import Login from './components/Login/Login';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn'))

  const loginRender = () => {
    if(isLoggedIn) {
      return <Redirect to="home"/> 
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
          <main style={{marginTop: isLoggedIn ? "4rem" : 0}}>
            <Switch>
              <Route path="/login" render={loginRender}/>
              {
                isLoggedIn ?
                <Switch>
                  <Route path="/home" component={Home}/>
                  <Route path="/candidates" component={CandidateList}/>
                  <Redirect to="/home"/>
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
