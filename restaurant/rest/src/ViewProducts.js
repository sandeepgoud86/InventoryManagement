// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './ViewProducts.css';
// import ProductDetail from './ProductDetail';
// import CartButton from './CartButton';

// const ViewProducts = () => {
//   const [products, setProducts] = useState([]);
//   const [selectedProduct, setSelectedProduct] = useState(null);

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       const response = await axios.get('http://localhost:8081/listProduct');
//       setProducts(response.data);
//     } catch (error) {
//       console.error('Error fetching products:', error);
//     }
//   };

//   const openProductDetail = (product) => {
//     setSelectedProduct(product);
//   };

//   const closeProductDetail = () => {
//     setSelectedProduct(null);
//   };

//   return (
//     <>
//       <h1 style={{ marginLeft: '40%', fontSize: '2.5rem' }}>Our Menu</h1> <br />
//       <h3 style={{ marginLeft: '35%', marginTop: '-1%' }}>Eat well, live simply, laugh often.</h3>
//       <div className="product-list">
//         {products.map((product) => (
//           <div key={product.id} className="product-card">
//             <img
//               alt=""
//               src={`data:image/jpeg;base64,${product.image}`}
//               style={{ width: '100%', height: 'auto' }}
//               className="product-image"
//               onClick={() => openProductDetail(product)}
//             />
//             <div className="product-details">
//               <div className="product-name" style={{ textAlign: 'center' }}>
//                 {product.name}
//               </div>
//               <div className="product-price" style={{ textAlign: 'center' }}>
//                 Rs: {product.price}
//               </div>
//               <CartButton product={product} style={{marginLeft: "30%"}}/>
//             </div>
//           </div>
//         ))}
//         {selectedProduct && <ProductDetail product={selectedProduct} onClose={closeProductDetail} />}
//       </div>
//     </>
//   );
// };

// export default ViewProducts;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './ViewProducts.css';
// import ProductDetail from './ProductDetail';
// import { useCart } from './CartContext'; // Import useCart hook from CartContext

// const ViewProducts = () => {
//   const [products, setProducts] = useState([]);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const { cartItems, addToCart } = useCart(); // Access cartItems and addToCart function from CartContext

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       const response = await axios.get('http://localhost:8081/listProduct');
//       setProducts(response.data);
//     } catch (error) {
//       console.error('Error fetching products:', error);
//     }
//   };

//   const openProductDetail = (product) => {
//     setSelectedProduct(product);
//   };

//   const closeProductDetail = () => {
//     setSelectedProduct(null);
//   };

//   return (
//     <>
//       <h1 style={{ marginLeft: '40%', fontSize: '2.5rem' }}>Our Menu</h1> <br />
//       <h3 style={{ marginLeft: '35%', marginTop: '-1%' }}>Eat well, live simply, laugh often.</h3>
//       <div
//         style={{
//           display: 'flex',
//           listStyle: 'none',
//           backgroundColor: 'whitesmoke',
//           height: '7vh',
//           width: '90%',
//           marginLeft: '5%',
//           borderRadius: '2rem',
//           marginTop: '2%',
//         }}
//         className="list-container"
//       >
//         <li style={{ marginLeft: '12%', borderRadius: '2rem' }} className="btn btn-primary">
//           All
//         </li>
//         <li style={{ marginLeft: '5%', borderRadius: '2rem' }} className="btn btn-primary">
//           Lunch
//         </li>
//         <li style={{ marginLeft: '5%', borderRadius: '2rem' }} className="btn btn-primary">
//           Dinner
//         </li>
//         <li style={{ marginLeft: '5%', borderRadius: '2rem' }} className="btn btn-primary">
//           Veg
//         </li>
//         <li style={{ marginLeft: '5%', borderRadius: '2rem' }} className="btn btn-primary">
//           Non-Veg
//         </li>
//         <li style={{ marginLeft: '5%', borderRadius: '2rem' }} className="btn btn-primary">
//           Chinese Foods
//         </li>
//         <li style={{ marginLeft: '5%', borderRadius: '2rem' }} className="btn btn-primary">
//           Salads
//         </li>
//       </div>
//       <div className="product-list">
//         {products.map((product) => (
//           <div key={product.id} className="product-card" onClick={() => openProductDetail(product)}>
//             <img
//               alt=""
//               src={`data:image/jpeg;base64,${product.image}`}
//               style={{ width: '100%', height: 'auto' }}
//               className="product-image"
//             />
//             <div className="product-details">
//               <div className="product-name" style={{ textAlign: 'center' }}>
//                 {product.name}
//               </div>
//               <div className="product-price" style={{ textAlign: 'center' }}>
//                 Rs: {product.price}
//               </div>
//               <button
//                 className="btn-primary"
//                 style={{ marginTop: '5%', marginLeft: '30%', borderRadius: '3rem' }}
//                 onClick={() => addToCart(product)}
//               >
//                 Add to Cart
//               </button>
//             </div>
//           </div>
//         ))}
//         {selectedProduct && <ProductDetail product={selectedProduct} onClose={closeProductDetail} />}
//       </div>
//     </>
//   );
// };

// export default ViewProducts;













import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ViewProducts.css';
import ProductDetail from './ProductDetail';
import Cart from './Cart';

const ViewProducts = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8081/listProduct');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const openProductDetail = (product) => {
    setSelectedProduct(product);
  };

  const closeProductDetail = () => {
    setSelectedProduct(null);
  };

  const addToCart = (product) => {
    console.log('Adding to cart:', product);
    const existingItemIndex = cart.findIndex(item => item.id === product.id);
    console.log('Existing item index:', existingItemIndex);
    if (existingItemIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity++;
      console.log('Updated cart:', updatedCart);
      setCart(updatedCart);
    } else {
      const newCartItem = { ...product, quantity: 1 };
      console.log('New cart item:', newCartItem);
      setCart([...cart, newCartItem]);
    }
  };
  
  
  const increaseQuantity = (productId) => {
    const updatedCart = cart.map(item =>
      item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);
  };

  const decreaseQuantity = (productId) => {
    const updatedCart = cart.map(item =>
      item.id === productId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    );
    setCart(updatedCart);
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  console.log(cart);

  return (
    <>
      <h1 style={{ marginLeft: '40%', fontSize: '2.5rem' }}>Our Menu</h1> <br />
      <h3 style={{ marginLeft: '35%', marginTop: '-1%' }}>Eat well, live simply, laugh often.</h3>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img
              alt=""
              src={`data:image/jpeg;base64,${product.image}`}
              style={{ width: '100%', height: 'auto' }}
              className="product-image"
              onClick={() => openProductDetail(product)}
            />
            <div className="product-details">
              <div className="product-name" style={{ textAlign: 'center' }}>
                {product.name}
              </div>
              <div className="product-price" style={{ textAlign: 'center' }}>
                Rs: {product.price}
              </div>
              <button onClick={() => addToCart(product)} style={{ marginLeft: "30%" }}>Add to Cart</button>
            </div>
          </div>
        ))}
        {selectedProduct && <ProductDetail product={selectedProduct} onClose={closeProductDetail} />}
      </div>
<Cart
  cartItems={cart}
  removeFromCart={removeFromCart}
  increaseQuantity={increaseQuantity}
  decreaseQuantity={decreaseQuantity}
/>
    </>
  );
};

export default ViewProducts;
