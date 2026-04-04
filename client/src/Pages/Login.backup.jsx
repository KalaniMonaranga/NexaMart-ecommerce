import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext.jsx';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:5000/api/users/login', {
        email, password
      });

      login(data);
      alert(`Welcome, ${data.name}!`);

      // Automatic Redirect Logic
      if (data.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/shop');
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Login Failed');
    }
  };

  return (
    <div className="login-page container py-5">
      <div className="form-box mx-auto p-4 shadow-sm border bg-white" style={{maxWidth: '400px'}}>
        <h2 className="text-center fw-bold mb-4">Login</h2>
        
        <div className="role-toggle d-flex mb-4">
          <button 
            className={`btn w-50 rounded-0 ${role === 'customer' ? 'btn-info text-white' : 'btn-outline-info'}`} 
            onClick={() => setRole('customer')}
          >Customer</button>
          <button 
            className={`btn w-50 rounded-0 ${role === 'admin' ? 'btn-info text-white' : 'btn-outline-info'}`} 
            onClick={() => setRole('admin')}
          >Admin</button>
        </div>

        <form onSubmit={handleLogin}>
          <input type="email" className="form-control mb-3" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" className="form-control mb-3" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit" className="btn btn-info w-100 text-white fw-bold py-2">LOGIN</button>
        </form>

        <p className="text-center mt-3 small">
          Don't have an account? <Link to="/register" style={{color: '#00AEEF', fontWeight: 'bold'}}>Register Now</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;