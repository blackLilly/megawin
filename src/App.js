import React from "react";
import { BrowserRouter, Route, Switch, Redirect, useHistory, useLocation, } from "react-router-dom";
import { createBrowserHistory } from "history";
import './App.css';
import Header from './Components/Header';
import Home from './Pages/Home/Home';
import Calculator from './Pages/Calculator';
import Footer from "./Components/Footer";
import TicketGen from "./Pages/Technology/TicketGen";
function App() {

  return (
    <div className="App">
      <BrowserRouter>
        {/* Common Pages for All roles */}
        <Header />
        <Switch>
          <Route exact path="/" render={props => <Home {...props}></Home>} />
          <Route exact path="/calculator" render={props => <Calculator {...props} />} />
          <Route exact path="/ins-trans-ticket-generation" render={props => <TicketGen />} />
        </Switch>
        {/* <Footer /> */}
      </BrowserRouter>
    </div>
  );



}

export default App;
