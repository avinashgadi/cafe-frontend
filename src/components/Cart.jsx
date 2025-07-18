import React, { useState } from "react";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../App";
import axios from "axios";

export default function Cart() {
  const { user, cart, setCart } = useContext(AppContext);
  const [orderValue, setOrderValue] = useState(0);
  const [error, setError] = useState();
  const Navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const increment = (id, qty) => {
    const updatedCart = cart.map((product) =>
      product._id === id ? { ...product, qty: qty + 1 } : product
    );
    setCart(updatedCart);
  };

  const decrement = (id, qty) => {
    const updatedCart = cart.map((product) =>
      product._id === id ? { ...product, qty: Math.max(qty - 1, 1) } : product
    );
    setCart(updatedCart);
  };

  useEffect(() => {
    setOrderValue(
      cart.reduce((sum, value) => {
        return sum + value.qty * value.price;
      }, 0)
    );
  }, [cart]);

  const placeOrder = async () => {
    try {
      const url = `${API_URL}/api/orders`;
      const newOrder = {
        userId: user._id,
        email: user.email,
        orderValue,
        items: cart,
      };
      const result = await axios.post(url, newOrder);
      setCart([]);
      Navigate("/order");
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  if (!cart || cart.length === 0 || cart.every(item => item.qty <= 0)) {
    return (
      <main className="center" style={{ minHeight: '40vh', flexDirection: 'column' }}>
        <h2 style={{ color: 'var(--primary-dark)' }}>Your cart is empty</h2>
        <button onClick={() => Navigate("/")}>Browse Products</button>
      </main>
    );
  }

  return (
    <main>
      <h2 style={{ marginBottom: '2rem', color: 'var(--primary-dark)' }}>My Cart</h2>
      {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
      <div className="cart-layout">
        <div className="cart-items">
          {cart.filter(item => item.qty > 0).map((value) => (
            <div className="card cart-card flex-between" key={value._id}>
              <div className="flex" style={{ alignItems: 'center', gap: '1.5rem' }}>
                <img
                  src={value.imgUrl}
                  alt={value.productName}
                  style={{ width: '70px', height: '70px', objectFit: 'cover', borderRadius: '10px', boxShadow: '0 2px 8px rgba(60,40,20,0.08)' }}
                />
                <div>
                  <div style={{ fontWeight: 600, fontSize: '1.1rem' }}>{value.productName}</div>
                  <div style={{ color: '#6d4c41', fontSize: '0.95rem' }}>{value.description}</div>
                  <div style={{ marginTop: '0.5rem', color: 'var(--primary-dark)', fontWeight: 500 }}>₹{value.price}</div>
                </div>
              </div>
              <div className="flex" style={{ alignItems: 'center', gap: '0.5rem' }}>
                <button onClick={() => decrement(value._id, value.qty)} style={{ minWidth: '32px', fontSize: '1.2rem' }}>-</button>
                <span style={{ fontWeight: 600, fontSize: '1.1rem', minWidth: '24px', textAlign: 'center' }}>{value.qty}</span>
                <button onClick={() => increment(value._id, value.qty)} style={{ minWidth: '32px', fontSize: '1.2rem' }}>+</button>
                <span style={{ marginLeft: '1.5rem', fontWeight: 600, color: 'var(--primary)' }}>₹{value.price * value.qty}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="cart-summary card">
          <h3 style={{ marginBottom: '1rem', color: 'var(--primary-dark)' }}>Order Summary</h3>
          <div className="flex-between" style={{ marginBottom: '1rem' }}>
            <span>Total Items:</span>
            <span>{cart.reduce((sum, item) => sum + item.qty, 0)}</span>
          </div>
          <div className="flex-between" style={{ marginBottom: '1rem' }}>
            <span>Order Value:</span>
            <span style={{ fontWeight: 700, color: 'var(--primary-dark)' }}>₹{orderValue}</span>
          </div>
          {user?.token ? (
            <button style={{ width: '100%', marginTop: '1rem' }} onClick={placeOrder}>Place Order</button>
          ) : (
            <button style={{ width: '100%', marginTop: '1rem' }} onClick={() => Navigate("/login")}>Login to Order</button>
          )}
        </div>
      </div>
      <style>{`
        .cart-layout {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 2rem;
        }
        .cart-items {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .cart-card {
          align-items: flex-start;
        }
        .cart-summary {
          min-width: 220px;
          max-width: 340px;
          margin-top: 0.5rem;
          align-self: flex-start;
        }
        @media (max-width: 900px) {
          .cart-layout {
            grid-template-columns: 1fr;
          }
          .cart-summary {
            max-width: 100%;
            margin-top: 2rem;
          }
        }
      `}</style>
    </main>
  );
}
