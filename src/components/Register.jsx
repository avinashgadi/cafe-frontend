import "./Register.css";
// import { useRef } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '' });
  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  const [loading, setLoading] = useState(false);
  const Navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError();
    setSuccess();
    setLoading(true);
    try {
      const url = `${API_URL}/api/users/register`;
      await axios.post(url, form);
      setSuccess("Registration successful! Redirecting to login...");
      setTimeout(() => Navigate("/login"), 1200);
    } catch (err) {
      console.log(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="center" style={{ minHeight: '60vh' }}>
      <div className="card register-card" style={{ maxWidth: 420, width: '100%' }}>
        <h2 style={{ color: 'var(--primary-dark)', marginBottom: '1.5rem' }}>Create Account</h2>
        {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
        {success && <div style={{ color: 'green', marginBottom: '1rem' }}>{success}</div>}
        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              value={form.firstName}
              onChange={handleChange}
              autoComplete="given-name"
              required
              placeholder="Enter First Name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              value={form.lastName}
              onChange={handleChange}
              autoComplete="family-name"
              required
              placeholder="Enter Last Name"
            />
          </div>
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
              placeholder="Enter Email Address"
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
              autoComplete="new-password"
              required
              placeholder="Enter Password"
            />
          </div>
          <button type="submit" style={{ width: '100%', marginTop: '1rem' }} disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <hr style={{ margin: '2rem 0 1rem 0' }} />
        <div style={{ textAlign: 'center' }}>
          <span>Already a member? </span>
          <Link to="/login">Login Here</Link>
        </div>
      </div>
      <style>{`
        .register-card {
          padding: 2.2rem 2rem;
        }
        .register-form {
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
          .register-card {
            padding: 1.2rem 0.5rem;
          }
        }
      `}</style>
    </main>
  );
}

// export default function Register() {
//   const firstName = useRef();
//   const lastName = useRef();
//   const email = useRef();
//   const password = useRef();
//   const handleSubmit = () => {
//     const user = {
//       firstName: firstName.current.value,
//       lastName: lastName.current.value,
//       email: email.current.value,
//       password: password.current.value,
//     };
//     console.log(user);
//   };
//   return (
//     <div className="App-Register-Row">
//       <div style={{ backgroundColor: "white" }}>
//         <h2>Registration Form</h2>
//         <p>
//           <input type="text" placeholder="Enter First Name" ref={firstName} />
//         </p>
//         <p>
//           <input type="text" placeholder="Enter Last Name" ref={lastName} />
//         </p>
//         <p>
//           <input type="text" placeholder="Enter Email Address" ref={email} />
//         </p>
//         <p>
//           <input type="password" placeholder="Enter Password" ref={password} />
//         </p>
//         <p>
//           <button onClick={handleSubmit}>Submit</button>
//         </p>
//       </div>
//     </div>
//   );
// }
