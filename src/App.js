import "./App.css";
import Header from "./components/mainPage/Header";
import Home from "./components/mainPage/Home";
import Checkout from "./components/checkout/Checkout";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import { useStateValue } from "./components/stateProvider";
import { useEffect } from "react";
import { auth } from "./components/auth/firebase";
import Payment from "./components/checkout/Payment";
import Order from "./components/checkout/Order";

function App() {
  const[,dispatch] = useStateValue();
  useEffect(() => {
    auth.onAuthStateChanged(user => {
      console.log('The user is >>> ', user)
      if(user){
        dispatch({
          type: 'Set_User',
          user: user
        })
      }else{
        dispatch({
          type: 'Set_User',
          user: null
        })
      }
    })
  },[dispatch])

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/checkout">
            <Header />
            <Checkout/>
          </Route>
          <Route path="/login">
            <Login/>
          </Route>
          <Route path="/payment">
            <Header/>
            <Payment/>
          </Route>
          <Route path="/final">
            <Header/>
            <Order/>
          </Route>
          <Route path="/">
            <Header />
            <Home/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
