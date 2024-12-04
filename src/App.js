import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Content from "./components/Content/Content";
import LogIn from "./components/Auth/LogIn";
import SignIn from "./components/Auth/SignIn";
import ReadMore from "./components/Content/ReadMore/ReadMore";
import  { Provider } from "react-redux";
import store from '../src/components/Store/store'
import Cart from "./components/Content/AddToCart/Cart";

function App() {
  return (
    <>
    <Provider store={store}>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <NavBar />
              <Content />
            </>
          }
        />
        <Route path="/login" element={<LogIn />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/orders" element={<><p>Hello Order Page</p></>} />
        <Route path="/readmore/:id" element={<ReadMore />} />
      </Routes>
      </Provider>
    </>
  );
}

export default App;
