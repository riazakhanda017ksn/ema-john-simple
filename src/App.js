import React, { createContext, useContext, useState } from 'react';
import './App.css';
import Header from './component/Header/Header';
import Product from './component/Product/Product';
import Shop from './component/Shop/Shop';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Review from './component/Review/Review';
import Inventory from './component/Inventory/Inventory';
import NotFound from './component/NotFound/NotFound';
import ProductDetails from './component/ProductDetails/ProductDetails';
import LogIn from './component/LogIn/LogIn';
import Shiftment from './component/Shiftment/Shiftment';
import PrivataRoute from './component/PrivataRoute/PrivataRoute';

export const UserContext =createContext()
function App() {
const [loggedUser, setLoggedUser]=useState({})
  return (
   
    <UserContext.Provider value={[loggedUser, setLoggedUser]}>
      <p><code>your email - {loggedUser.email}</code></p>
      <Router>
      <Header></Header>
        <Switch>
          <Route exact path="/shop">
            <Shop></Shop>  
          </Route>
          <Route path="/review">
             <Review> </Review>
          </Route>
          <PrivataRoute path="/Inventory">
           <Inventory></Inventory>
          </PrivataRoute>
          <Route path="/logIn">
           <LogIn></LogIn>
          </Route>
          <PrivataRoute path="/shiftment">
           <Shiftment></Shiftment>
          </PrivataRoute>
          <Route path="/product/:productKey">
            <ProductDetails></ProductDetails>
          </Route>
          <Route path="/*">
          <NotFound></NotFound>
          </Route>
        </Switch>
      </Router>
      
      
      
    </UserContext.Provider>
  );
}

export default App;
