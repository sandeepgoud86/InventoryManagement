// import React from 'react';

// const Cart = ({ cartItems = [], removeFromCart, increaseQuantity, decreaseQuantity }) => {
//     console.log(cartItems); 
//     const calculateTotalAmount = () => {
//     return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
//   };

//   return (
//     <div className="cart-container">
//       <h2>Cart</h2>
//       <ul>
//         {cartItems.map(item => (
//           <li key={item.id}>
//             <img src={`data:image/jpeg;base64,${item.image}`} alt={item.name} style={{ width: "5%" }} />
//             <div>{item.name}</div>
//             <div>Price: Rs {item.price}</div>
//             <div>Quantity: {item.quantity}</div>
//             <button onClick={() => removeFromCart(item.id)}>Remove from Cart</button>
//             <button onClick={() => increaseQuantity(item.id)}>Increase Quantity</button>
//             <button onClick={() => decreaseQuantity(item.id)}>Decrease Quantity</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Cart;



import React from 'react';

const Cart = ({ cartItems }) => {
    const calculateTotalAmount = () => {
        if (!cartItems) return 0; // Check if cartItems is undefined or null
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
      };
      
  return (
    <div className="cart-container">
      <h2>Cart</h2>
      <ul>
        {cartItems && cartItems.map(item => (
          <li key={item.id}>
            <img src={`data:image/jpeg;base64,${item.image}`} alt={item.name} style={{ width: "5%" }} />
            {item.name} - Rs {item.price} - Quantity: {item.quantity}
          </li>
        ))}
      </ul>
      <p>Total Amount: Rs {calculateTotalAmount()}</p>
    </div>
  );
};

export default Cart;
