import React, { useEffect, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { AppContext } from "../App";

export default function Order() {
  const API_URL = import.meta.env.VITE_API_URL;
  const { user } = useContext(AppContext);
  const [error, setError] = useState();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const url = `${API_URL}/api/orders/${user.email}`;
      const result = await axios.get(url);
      setOrders(result.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    // eslint-disable-next-line
  }, []);

  if (loading) return <main className="center" style={{ minHeight: '40vh' }}>Loading your orders...</main>;
  if (error) return <main className="center" style={{ minHeight: '40vh', color: 'red' }}>{error}</main>;
  if (!orders || orders.length === 0) {
    return (
      <main className="center" style={{ minHeight: '40vh', flexDirection: 'column' }}>
        <h2 style={{ color: 'var(--primary-dark)' }}>No orders found</h2>
        <button onClick={() => window.location.href = '/'}>Shop Now</button>
      </main>
    );
  }

  return (
    <main>
      <h2 style={{ marginBottom: '2rem', color: 'var(--primary-dark)' }}>My Orders</h2>
      <div className="order-list">
        {orders.map((order) => (
          <div className="card order-card" key={order._id}>
            <div className="flex-between" style={{ marginBottom: '0.5rem' }}>
              <span style={{ fontWeight: 600 }}>Order ID: <span style={{ color: 'var(--primary)' }}>{order._id}</span></span>
              <span style={{ fontWeight: 600, color: 'var(--primary-dark)' }}>₹{order.orderValue}</span>
            </div>
            <div className="flex-between" style={{ marginBottom: '1rem' }}>
              <span>Status: <span style={{ fontWeight: 600, color: order.status === 'completed' ? 'green' : order.status === 'cancelled' ? 'red' : 'orange' }}>{order.status}</span></span>
              <span style={{ fontSize: '0.95rem', color: '#6d4c41' }}>{order.items.length} items</span>
            </div>
            <div className="order-items-table-wrap">
              <table className="order-items-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Qty</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item) => (
                    <tr key={item._id}>
                      <td>{item.productName}</td>
                      <td>₹{item.price}</td>
                      <td>{item.qty}</td>
                      <td>₹{item.qty * item.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
      <style>{`
        .order-list {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
          gap: 2rem;
        }
        .order-card {
          padding: 1.5rem 1.2rem;
        }
        .order-items-table-wrap {
          overflow-x: auto;
        }
        .order-items-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 0.5rem;
        }
        .order-items-table th, .order-items-table td {
          padding: 0.5rem 0.7rem;
          text-align: left;
        }
        .order-items-table th {
          background: var(--accent);
          color: var(--primary-dark);
          font-weight: 600;
        }
        .order-items-table tr:nth-child(even) {
          background: #f9f6f2;
        }
        .order-items-table tr:nth-child(odd) {
          background: #fff;
        }
        @media (max-width: 700px) {
          .order-list {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
          .order-card {
            padding: 1rem 0.5rem;
          }
        }
      `}</style>
    </main>
  );
}