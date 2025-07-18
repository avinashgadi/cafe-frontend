import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../App";

export default function Login() {
  const { setUser } = useContext(AppContext);
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const Navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.type === 'password' ? 'password' : 'email']: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError();
    setLoading(true);
    try {
      const url = `${API_URL}/api/users/login`;
      const result = await axios.post(url, form);
      setUser(result.data);
      Navigate("/");
    } catch (err) {
      console.log(err);
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="center" style={{ minHeight: '60vh' }}>
      <div className="card login-card" style={{ maxWidth: 400, width: '100%' }}>
        <h2 style={{ color: 'var(--primary-dark)', marginBottom: '1.5rem' }}>Login</h2>
        {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
              required
              placeholder="Email Address"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              autoComplete="current-password"
              required
              placeholder="Password"
            />
          </div>
          <button type="submit" style={{ width: '100%', marginTop: '1rem' }} disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <hr style={{ margin: '2rem 0 1rem 0' }} />
        <div style={{ textAlign: 'center' }}>
          <span>Don't have an account? </span>
          <Link to="/register">Create Account</Link>
        </div>
      </div>
      <style>{`
        .login-card {
          padding: 2.2rem 2rem;
        }
        .login-form {
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
        }
        .form-group label {
          font-size: 1rem;
          font-weight: 500;
          color: var(--primary-dark);
        }
        .form-group input {
          font-size: 1rem;
          padding: 0.6rem 1rem;
          border-radius: 8px;
          border: 1px solid #d7ccc8;
          background: #fff;
          color: var(--text);
        }
        @media (max-width: 600px) {
          .login-card {
            padding: 1.2rem 0.5rem;
          }
        }
      `}</style>
    </main>
  );
}
