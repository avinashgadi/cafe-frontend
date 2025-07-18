import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [profile, setProfile] = useState({});
  const { user, setUser } = useContext(AppContext);
  const [form, setForm] = useState({});
  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  const API_URL = import.meta.env.VITE_API_URL;
  const Navigate = useNavigate();

  const fetchProfile = async () => {
    try {
      const url = `${API_URL}/api/users/${user.id}/profile`;
      const result = await axios.get(url);
      setProfile(result.data);
      setForm({
        firstName: result.data.firstName || '',
        lastName: result.data.lastName || '',
        email: result.data.email || '',
        password: '',
      });
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };
  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line
  }, []);

  const logout = () => {
    setUser({});
    Navigate("/");
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError();
    setSuccess();
    try {
      const url = `${API_URL}/api/users/${profile._id}/profile`;
      await axios.patch(url, form);
      fetchProfile();
      setSuccess("Profile updated successfully.");
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };
  return (
    <main className="center" style={{ minHeight: '60vh' }}>
      <div className="card profile-card" style={{ maxWidth: 420, width: '100%' }}>
        <div className="flex-between" style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ margin: 0, color: 'var(--primary-dark)' }}>My Profile</h2>
          <button style={{ background: '#ffe0b2', color: 'var(--primary-dark)', fontWeight: 600 }} onClick={logout}>Logout</button>
        </div>
        {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
        {success && <div style={{ color: 'green', marginBottom: '1rem' }}>{success}</div>}
        <form onSubmit={handleSubmit} className="profile-form">
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              value={form.firstName || ''}
              onChange={handleChange}
              autoComplete="given-name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              value={form.lastName || ''}
              onChange={handleChange}
              autoComplete="family-name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email || ''}
              onChange={handleChange}
              autoComplete="email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={form.password || ''}
              onChange={handleChange}
              autoComplete="new-password"
              placeholder="Enter new password"
            />
          </div>
          <button type="submit" style={{ width: '100%', marginTop: '1rem' }}>Update Profile</button>
        </form>
      </div>
      <style>{`
        .profile-card {
          padding: 2.2rem 2rem;
        }
        .profile-form {
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
          .profile-card {
            padding: 1.2rem 0.5rem;
          }
        }
      `}</style>
    </main>
  );
}