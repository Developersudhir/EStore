import React, { useState } from "react";
import "./sidenav.css";

const SideNav = ({ isOpen, onClose, category ,filterCat,setFilterCat}) => {
  const [isShowCat, setisShowCat] = useState(true);
  
  const toggleCategory = () => {
    setisShowCat((prev) => !prev);
  };


  const handleChange = (cat, e) => {
    const isChecked = e.target.checked;
    console.log("Category ", cat, e.target.checked);
  
    if (isChecked) {
      const updatedCat = [...filterCat, cat];
      setFilterCat(updatedCat);
      console.log("Applied Filter", updatedCat);
    } else {
      const updatedCat = filterCat.filter((item) => item !== cat);
      setFilterCat(updatedCat);
      console.log("Removed Filter ", updatedCat);
    }
  };
  
  return (
    <div className={isOpen ? "sidenav w300" : "sidenav"}>
      <div className="crossIcon">
        <i className="fa-solid fa-xmark cross" onClick={onClose}></i>
      </div>
      <h2>
        Filters <i className="fa-solid fa-filter"></i>
      </h2>
      <ul className="filterArea">
        <li onClick={toggleCategory} className="collapsible-header">
          Category{" "}
          <i
            className={`fa-solid catIcon ${
              isShowCat ? "fa-angle-up" : "fa-angle-down"
            }`}
          ></i>
        </li>
        {isShowCat && (
          <ul className="collapsible-content">
            {category.map((item,index) => (
              <li key={index}>
                {item}
                <input
                  type="checkbox"
                  name=""
                  id=""
                  className="filterCheckbox"
                  onChange={(e)=>{handleChange(item,e)}}
                />
              </li>
            ))}

            {/* <li>
              Electronics{" "}
              <input type="checkbox" name="" id="" className="filterCheckbox" />
            </li>
            <li>
              Food{" "}
              <input type="checkbox" name="" id="" className="filterCheckbox" />
            </li>
            <li>
              Drink{" "}
              <input type="checkbox" name="" id="" className="filterCheckbox" />
            </li> */}
          </ul>
        )}
        <li>Price</li>
        <li>
          <input type="range" name="" id="" />
        </li>
      </ul>
    </div>
  );
};

export default SideNav;
