import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "../App";
import { useLocation } from "react-router-dom";

export default function Product() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [products, setProducts] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const [addedMsg, setAddedMsg] = useState("");
  const { user, cart, setCart } = useContext(AppContext);
  const location = useLocation();

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
      setAddedMsg(`${product.productName} added to cart!`);
      setTimeout(() => setAddedMsg(""), 1500);
    }
  };

  // Filter products by search query in URL
  const params = new URLSearchParams(location.search);
  const searchQuery = params.get("search")?.toLowerCase() || "";
  const filteredProducts = searchQuery
    ? products.filter(p => p.productName.toLowerCase().includes(searchQuery))
    : products;

  if (loading) return <div className="center" style={{ minHeight: '40vh' }}><span>Loading products...</span></div>;
  if (error) return <div className="center" style={{ color: 'red', minHeight: '40vh' }}>{error}</div>;

  return (
    <main>
      {addedMsg && (
        <div className="center" style={{ position: 'fixed', top: '80px', left: 0, right: 0, zIndex: 1000 }}>
          <div style={{ background: 'var(--primary)', color: '#fff', padding: '0.8rem 2rem', borderRadius: '12px', fontWeight: 600, boxShadow: '0 4px 24px rgba(60,40,20,0.13)', fontSize: '1.1rem', letterSpacing: '0.02em' }}>
            {addedMsg}
          </div>
        </div>
      )}
      <div className="product-grid">
        {filteredProducts && filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div className="card product-card compact-product-card" key={product._id}>
              <div className="product-img-center">
                <img
                  src={product.imgUrl}
                  alt={product.productName}
                  className="product-img-large"
                />
              </div>
              <h3 className="product-title-center">{product.productName}</h3>
              <p className="product-desc-compact">{product.description}</p>
              <div className="product-bottom-center-col">
                <span className="product-price-center">₹{product.price}</span>
                <button className="product-btn-center" onClick={() => addToCart(product)}>
                  ADD TO CART
                </button>
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
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 2rem;
          margin-top: 2rem;
        }
        .compact-product-card {
          background: #fff;
          border-radius: 20px;
          box-shadow: 0 4px 18px rgba(60,40,20,0.10);
          padding: 1.2rem 1.2rem 1.1rem 1.2rem;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          min-height: unset;
          justify-content: flex-start;
        }
        .product-img-center {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 0.3rem;
        }
        .product-img-large {
          width: 90px;
          height: 90px;
          object-fit: cover;
          border-radius: 16px;
          border: 2px solid #f3e6d8;
          box-shadow: 0 1px 4px rgba(60,40,20,0.10);
          background: #fff8f0;
        }
        .product-title-center {
          margin: 0.2rem 0 0.3rem 0;
          font-size: 1.18rem;
          font-weight: 700;
          text-align: center;
          color: #6d4c41;
          letter-spacing: 0.01em;
          width: 100%;
        }
        .product-desc-compact {
          color: #7c5c4a;
          min-height: 40px;
          margin: 0 0 0.7rem 0;
          text-align: left;
          font-size: 0.98rem;
          line-height: 1.5;
          font-family: 'Inter', 'Roboto', 'Segoe UI', Arial, sans-serif;
        }
        .product-bottom-center-col {
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          margin-top: 0.7rem;
          gap: 0.5rem;
        }
        .product-price-center {
          font-weight: 700;
          font-size: 1.13rem;
          color: #6d4c41;
          margin-bottom: 0.1rem;
        }
        .product-btn-center {
          background: #a1887f;
          color: #fff;
          border: none;
          border-radius: 8px;
          padding: 0.5rem 1.6rem;
          font-size: 1.05rem;
          font-weight: 600;
          letter-spacing: 0.03em;
          cursor: pointer;
          transition: background 0.18s, box-shadow 0.18s;
          box-shadow: 0 1px 4px rgba(60,40,20,0.08);
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .product-btn-center:hover {
          background: #6d4c41;
        }
        @media (max-width: 900px) {
          .product-grid {
            grid-template-columns: 1fr;
            gap: 1.2rem;
          }
          .compact-product-card {
            padding: 0.8rem 0.5rem 0.7rem 0.5rem;
          }
          .product-img-large {
            width: 70px;
            height: 70px;
          }
        }
      `}</style>
    </main>
  );
}
