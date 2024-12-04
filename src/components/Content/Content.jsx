import React, { useEffect, useState } from "react";
import "./content.css";
import SideNav from "../SideNav/SideNav";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { add } from "../Store/cartSlice";
import { useDispatch } from "react-redux";
import Loader from "../Loader/Loader";
const Content = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [filterCat,setFilterCat]=useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [showFullDescription, setShowFullDescription] = useState(false);

  // const notify = (e) => {

  //   // readMorepage()
  // };
  const handleAdd = (product, e) => {
    dispatch(add(product));
    e.stopPropagation();
    toast.success("Added to Cart !");
  };
  const openNav = () => {
    setIsNavOpen(true);
    // console.log("Nav Opened:", isNavOpen);
  };

  const closeNav = () => {
    setIsNavOpen(false);
    // console.log("Nav Closed");
  };
  const readMorepage = (itemId) => {
    navigate(`/readmore/${itemId}`);
    // navigate(`/readmore/:${itemId}`)
  };

  // const Desc = `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Est
  // adipisci nostrum ipsam magnam omnis et cupiditate repellat nobis
  // ea voluptas cum, tempore exercitationem at? Libero laborum
  // laudantium ipsa! Esse, corporis?`;
  useEffect(() => {
    const getProduct = async () => {
      const API = "https://api.escuelajs.co/api/v1/products";
      try {
        const data = await fetch(API);
        const response = await data.json();
        // filtering products does not contain images
        const filteredProducts = response.filter(
          (item) =>
            Array.isArray(item.images) &&
            item.images.length > 0 &&
            item.images[0].includes("[") !== true
        );
        // set all categories
        const uniqueCategories = [];
        filteredProducts.forEach((item) => {
          if (!uniqueCategories.includes(item.category.name)) {
            uniqueCategories.push(item.category.name);
          }
        });
        // console.log(response);
        // console.log(filteredProducts, "Filter");
        setProducts(filteredProducts);
        setCategory(uniqueCategories);
        setIsLoading(false);
        // console.log(uniqueCategories);
      } catch (err) {
        console.log(err);
      }
    };
    getProduct();
  }, []);
  const filteredProducts =
  filterCat.length > 0
    ? products.filter((product) => filterCat.includes(product.category.name))
    : products;

  return isLoading ? (
    <Loader />
  ) : (
    <div>
      {!isNavOpen && (
        <div className="MenuIcon">
          <i className="fa-solid fa-bars" onClick={openNav}></i>
        </div>
      )}
      <SideNav 
      isOpen={isNavOpen}
       onClose={closeNav} 
       category={category} 
       filterCat={filterCat}
       setFilterCat={setFilterCat}

       />

      <div className="rowCard">
        {/* <div className="card">
          <div className="imgPart">
            <img
              src="https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fFByb2R1Y3RzfGVufDB8fDB8fHww"
              alt="NO IMAGE"
            />
          </div>
          <div className="info">
            <h4>Product Name :1</h4>
            <p>$300</p>
            <p className="cat">Category</p>
            <p>{Desc.slice(0, 60)}...</p>
          </div>
        </div> */}
        {filteredProducts.map((item, index) => (
          <div
            className="card"
            key={index}
            onClick={() => {
              readMorepage(item.id);
            }}
          >
            <div className="imgPart">
              <img src={item.images[0]} alt="NO IMAGE" />
            </div>
            <div className="info">
              <h4>{item.title}</h4>
              <p>${item.price}</p>
              <p className="cat">{item.category.name}</p>
              <p>{item.description.slice(0, 60)}...</p>
              <button onClick={(e) => handleAdd(item, e)}>Add To Cart</button>
            </div>
          </div>
        ))}
        <ToastContainer 
        autoClose={1500} 
        pauseOnHover={false}
        position="top-left" />
      </div>
    </div>
  );
};

export default Content;
