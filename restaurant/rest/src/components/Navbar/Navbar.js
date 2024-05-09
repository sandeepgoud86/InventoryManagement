// import React, { useState } from "react";
// import { Link, NavLink } from "react-router-dom";
// import { FaBars, FaTimes, FaShoppingCart, FaUser } from "react-icons/fa"; // Import FaUser icon
// import logo from "../../assets/logo.png";
// import "./Navbar.css";

// const Navbar = () => {
//   const [click, setClick] = useState(false);
//   const [color, setColor] = useState(false);

//   const changeColor = () => {
//     if (window.scrollY >= 100) {
//       setColor(true);
//     } else {
//       setColor(false);
//     }
//   };

//   window.addEventListener("scroll", changeColor);

//   const handleClick = () => {
//     setClick(!click);
//   };

//   // Example function to handle adding items to the cart
//   const handleAddToCart = () => {
//     // Implement your logic to add items to the cart here
//     console.log("Item added to cart");
//   };

//   return (
//     <div className={color ? "header header-bg" : "header"}>
//       <div className="container">
//         <div className="nav-bar">
//           <Link to="/">
//             <div style={{ display: "flex" }}>
//               <div>
//                 <img src={logo} alt="logo" width={50} />
//               </div>
//               <div>
//                 <h1 style={{ color: "whitesmoke" }}>FOODIE</h1>
//               </div>
//             </div>
//           </Link>

//           <ul className={click ? "nav-menu active" : "nav-menu"}>
//             <li onClick={handleClick}>
//               <NavLink className="nav-link" to="/AfterHome">
//                 Home
//               </NavLink>
//             </li>
//             <li onClick={handleClick}>
//               <NavLink className="nav-link" to="/menu">
//                 Menu
//               </NavLink>
//             </li>
//             {/* <li onClick={handleClick}>
//               <NavLink className="nav-link" to="/delivery">
//                 Delivery
//               </NavLink> 
//             </li> */}
//             <li onClick={handleClick}>
//               <NavLink className="nav-link" to="/about">
//                 About
//               </NavLink>
//             </li>
//             <li onClick={handleClick}>
//               <NavLink className="nav-link" to="/contact">
//                 Contact
//               </NavLink>
//             </li>
            
//             <li onClick={handleClick}>
//               <NavLink className="nav-link" to="/cart" onClick={handleAddToCart}>
//                 <FaShoppingCart size={20} style={{ color: "#fff" }} />
//               </NavLink>
//             </li>
//             <li onClick={handleClick}>
//               <NavLink className="nav-link" to="/UserProfile">
//                 <FaUser size={20} style={{ color: "#fff" }} />
//               </NavLink>
//             </li>
//           </ul>

//           <div className="hamburger" onClick={handleClick}>
//             {click ? (
//               <FaTimes size={20} style={{ color: "#fff" }} />
//             ) : (
//               <FaBars size={20} style={{ color: "#fff" }} />
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;



import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBars, FaTimes, FaShoppingCart, FaUser } from "react-icons/fa"; // Import FaUser icon
import logo from "../../assets/logo.png";
import "./Navbar.css";
import DessertFood from "../../DessertFood";

const Navbar = () => {
  const [click, setClick] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const handleClick = () => {
    setClick(!click);
  };

  // Function to handle adding items to the cart
  const handleAddToCart = (item) => {
    setCartItems([...cartItems, item]);
    console.log("Item added to cart:", item);
  };

  return (
    <div className="header">
      <div className="container">
        <div className="nav-bar">
          <Link to="/">
            <div style={{ display: "flex" }}>
              <div>
                <img src={logo} alt="logo" width={50} />
              </div>
              <div>
                <h1>FOODIE</h1>
              </div>
            </div>
          </Link>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            {/* Navigation links */}
            <li onClick={handleClick}>
              <NavLink className="nav-link" to="/AfterHome">
                Home
              </NavLink>
            </li>
            <li onClick={handleClick}>
              <NavLink className="nav-link" to="/menu">
                Menu
              </NavLink>
            </li>
            <li onClick={handleClick}>
              <NavLink className="nav-link" to="/about">
                About
              </NavLink>
            </li>
            <li onClick={handleClick}>
              <NavLink className="nav-link" to="/contact">
                Contact
              </NavLink>
            </li>
            
            {/* Cart icon */}
            <li onClick={handleClick}>
              <NavLink className="nav-link" to="/Cart">
                <FaShoppingCart size={20} style={{ color: "#fff" }} />
                {cartItems.length > 0 && <span className="cart-count">{cartItems.length}</span>}
              </NavLink>
            </li>
            
            {/* User icon */}
            <li onClick={handleClick}>
              <NavLink className="nav-link" to="/UserProfile">
                <FaUser size={20} style={{ color: "#fff" }} />
              </NavLink>
            </li>
          </ul>

          {/* Hamburger menu */}
          <div className="hamburger" onClick={handleClick}>
            {click ? <FaTimes size={20} style={{ color: "#fff" }} /> : <FaBars size={20} style={{ color: "#fff" }} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
