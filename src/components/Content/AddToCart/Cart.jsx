import React from "react";
import NavBar from "../../NavBar/NavBar";
import "./cart.css";
import { useSelector,useDispatch } from "react-redux";
import Ghost from '../../Loader/Ghost.gif'
import { remove,reset } from "../../Store/cartSlice";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const products = useSelector((state) => state.cart);
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const handleRemove=(id)=>{
    dispatch(remove(id));
  }
  const handleCancel=()=>{
    dispatch(reset());
    navigate('/');
    
  }
  return (
    <>
      <NavBar />
      {/* <div className="cartRow">
        <div className="leftimgPart">
          <img
            src="https://images.unsplash.com/photo-1549049950-48d5887197a0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Ym90dGxlfGVufDB8fDB8fHww"
            alt=""
          />
        </div>
        <div className="rightInfoPart">
          <h2>Product Name</h2>
          <div className="buttonsDiv">
            <button className="btndanger">
              <i className="fa-solid fa-minus"></i>
            </button>
            0
            <button className="btnsuccess">
              <i className="fa-solid fa-plus"></i>
            </button>
          </div>
        </div>
      </div> */}
      {products.length > 0 ? (
        <>
          {products.map((item) => (
            <div className="cartRow" key={item.id}>
              <div className="leftimgPart">
                <img src={item.images?.[0]} alt={item.title} />
              </div>
              <div className="rightInfoPart">
                <h3>{item.title}</h3>
                {/* <div className="buttonsDiv">
                  <button className="btndanger">
                    <i className="fa-solid fa-minus cartOprIcon"></i>
                  </button>
                  <span className="quant">2</span>
                  <button className="btnsuccess">
                    <i className="fa-solid fa-plus cartOprIcon"></i>
                  </button>
                </div> */}
                <div className="trashIcon">
                <i className="fa-solid fa-trash" onClick={()=>{handleRemove(item.id)}}></i>
                </div>
              </div>
            </div>
          ))}
          <div className="orderArea">
            <button className="btndanger" onClick={handleCancel}>Cancel</button>
            <button className="btnsuccess">Order Now</button>
          </div>
        </>
      ) : (
        <div className="notFound">
            <p>No Product Found ... <img src={Ghost} alt="" /></p>
        </div>
      )}
    </>
  );
};

export default Cart;
