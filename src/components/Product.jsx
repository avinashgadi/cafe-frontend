import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "../App";

export default function Product() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [products, setProducts] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const { user, cart, setCart } = useContext(AppContext);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const url = `${API_URL}/api/products/all`;
      const result = await axios.get(url);
      setProducts(result.data.products);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  const addToCart = (product) => {
    const found = cart.find((item) => item._id === product._id);
    if (!found) {
      product.qty = 1;
      setCart([...cart, product]);
    }
  };

  if (loading) return <div className="center" style={{ minHeight: '40vh' }}><span>Loading products...</span></div>;
  if (error) return <div className="center" style={{ color: 'red', minHeight: '40vh' }}>{error}</div>;

  return (
    <main>
      <div className="product-grid">
        {products && products.length > 0 ? (
          products.map((product) => (
            <div className="card product-card" key={product._id}>
              <div className="product-img-wrap center" style={{ marginBottom: '1rem' }}>
                <img
                  src={product.imgUrl}
                  alt={product.productName}
                  style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '12px', boxShadow: '0 2px 8px rgba(60,40,20,0.08)' }}
                />
              </div>
              <h3 style={{ margin: '0.5rem 0', fontSize: '1.2rem', fontWeight: 600 }}>{product.productName}</h3>
              <p style={{ color: '#6d4c41', minHeight: '48px', margin: '0.5rem 0' }}>{product.description}</p>
              <div className="flex-between" style={{ marginTop: '1rem', alignItems: 'center' }}>
                <span style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--primary-dark)' }}>₹{product.price}</span>
                <button onClick={() => addToCart(product)} style={{ minWidth: '120px' }}>Add to Cart</button>
              </div>
            </div>
          ))
        ) : (
          <div className="center" style={{ width: '100%' }}>No products found.</div>
        )}
      </div>
      <style>{`
        .product-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 2rem;
          margin-top: 2rem;
        }
        .product-card {
          display: flex;
          flex-direction: column;
          align-items: stretch;
          min-height: 340px;
        }
        .product-img-wrap {
          width: 100%;
          height: 140px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        @media (max-width: 700px) {
          .product-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
          .product-card {
            min-height: 260px;
          }
        }
      `}</style>
    </main>
  );
}
