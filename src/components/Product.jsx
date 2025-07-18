import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "../App";

export default function Product() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [products, setProducts] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const [addedMsg, setAddedMsg] = useState("");
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
      setAddedMsg(`${product.productName} added to cart!`);
      setTimeout(() => setAddedMsg(""), 1500);
    }
  };

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
        {products && products.length > 0 ? (
          products.map((product) => (
            <div className="card product-card" key={product._id}>
              <div className="product-card-inner">
                <div className="product-img-wrap center" style={{ marginBottom: '1rem' }}>
                  <img
                    src={product.imgUrl}
                    alt={product.productName}
                    style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '12px', boxShadow: '0 2px 8px rgba(60,40,20,0.08)' }}
                  />
                </div>
                <h3 className="product-title-centered">{product.productName}</h3>
                <p className="product-desc-centered">{product.description}</p>
                <div className="flex-between product-bottom-row">
                  <span className="product-price">₹{product.price}</span>
                  <button onClick={() => addToCart(product)} style={{ minWidth: '120px' }}>Add to Cart</button>
                </div>
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
          transition: box-shadow 0.22s cubic-bezier(.4,0,.2,1), transform 0.18s cubic-bezier(.4,0,.2,1);
          cursor: pointer;
          justify-content: center;
        }
        .product-card-inner {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
        }
        .product-card:hover {
          box-shadow: 0 8px 32px rgba(60,40,20,0.16);
          transform: translateY(-6px) scale(1.025);
        }
        .product-title-centered {
          margin: 0.5rem 0 0.2rem 0;
          font-size: 1.2rem;
          font-weight: 600;
          text-align: center;
          letter-spacing: 0.01em;
        }
        .product-desc-centered {
          color: #6d4c41;
          min-height: 48px;
          margin: 0.2rem 0 0.5rem 0;
          text-align: center;
          font-size: 1.01rem;
          line-height: 1.4;
        }
        .product-img-wrap {
          width: 100%;
          height: 140px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .product-bottom-row {
          width: 100%;
          margin-top: 1rem;
          align-items: center;
          justify-content: space-between;
        }
        .product-price {
          font-weight: 700;
          font-size: 1.1rem;
          color: var(--primary-dark);
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
