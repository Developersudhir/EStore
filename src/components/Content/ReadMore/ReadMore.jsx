import { useEffect } from "react";
import React from "react";
import NavBar from "../../NavBar/NavBar";
import { useDispatch, useSelector } from "react-redux";
import "./readmore.css";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../../Store/productSlice";
import Loader from "../../Loader/Loader";
import { ToastContainer, toast } from "react-toastify";
import { add } from "../../Store/cartSlice";

const ReadMore = () => {
  const { id } = useParams();
  const { product, loading } = useSelector((state) => state.product);
  const cart = useSelector((state) => state.cart);
  const isProductInCart = cart.some((item) => item.id == id);
  // console.log("isProductInCart:- ",isProductInCart);
  const dispatch = useDispatch();
  useEffect(() => {
    // console.log(id);
    window.scrollTo(0, 0);
    dispatch(fetchProductById(id));

  }, [id, dispatch]);

  if (loading) {
    // const LoaderContent = (
    //   <div className="loaderContent">
    //     <p>Loading...</p>
    //   </div>
    // );
    // return LoaderContent;
    return <Loader/>;
  }
  const handleAdd = (product) => {
    dispatch(add(product));
    toast.success("Added to Cart !");
  };

  return (
    <>
      <div className="readContainer">
        <NavBar />
        <div className="readMore">
          <div className="leftPart">
            <div className="smallImage">
              <img
                src={product?.images?.[1]}
                alt=""
                // onClick={() => changeMainImage("https://images.unsplash.com/photo-1629198688000-71f23e745b6e?w=500&auto=format&fit=crop&q=60&ixib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZHVjdHN8ZW58MHx8MHx8fDA%3D")}
              />
              <img
               src={product?.images?.[2]}
                alt=""
                // onClick={() => changeMainImage("https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fFByb2R1Y3RzfGVufDB8fDB8fHww")}
              />
            </div>
            <div className="mainImage">
              <img src={product?.images?.[0]} alt="" />
            </div>
          </div>
          <div className="rightPart">
            <h2>{product?.title}</h2>
            <p>${product?.price}</p>
            <p>{product?.category?.name}</p>
            <p>{product?.description}</p>

            <button disabled={isProductInCart} onClick={()=>{handleAdd(product)}}>Add To Cart </button>
          </div>
        </div>
        <ToastContainer 
        autoClose={1500} 
        pauseOnHover={false}
        position="top-left" />
      </div>
    </>
  );
};

export default ReadMore;
