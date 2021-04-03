import React from "react";
import { BrowserRouter, Route, Switch} from "react-router-dom";
import './App.css';
import Header from './Components/Header';
import TicketGen from "./Pages/Technology/TicketGen";
function App() {

  return (
    <div className="App">
      <BrowserRouter>
        {/* Common Pages for All roles */}
        <Header />
        <Switch>
          <Route path="/" render={props => <TicketGen {...props}></TicketGen>} />
        </Switch>
        {/* <Footer /> */}
      </BrowserRouter>
    </div>
  );
}
export default App;
