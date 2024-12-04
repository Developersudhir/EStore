import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import {useSelector} from 'react-redux'


const NavBar = () => {

  const items=useSelector((state)=>state.cart);
  return (
    <>
      <nav>
        <ul className="navList">
          <li>
            <Link to={"/"}>HOME</Link>
          </li>
          <li><Link to={"/cart"}>
            {/* MY CART  */}
            <i className="fa-solid fa-cart-shopping cartIcon"></i>
            {items.length}
            </Link></li>
          <li><Link to={"/orders"}>MY ORDER</Link></li>
        </ul>
      </nav>
     
    </>
  );
};

export default NavBar;
