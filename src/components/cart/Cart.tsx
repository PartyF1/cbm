import React from 'react';
import './Cart.css';
import { Template } from '../../App';

interface CartProps {
  cartItems: Template[];
  onRemove: (id: number) => void;
  onView: (template: Template) => void;
}

const Cart: React.FC<CartProps> = ({ cartItems, onRemove, onView }) => {
  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              {item.name} - ${item.price}
              <div className='actions'>
                <button onClick={() => onView(item)}>View</button>
                <button className='remove' onClick={() => onRemove(item.id)}>Remove</button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <h3>Total: ${totalPrice}</h3>
    </div>
  );
};

export default Cart;