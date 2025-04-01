import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../../services/authService';
import "./sign-in.css";

const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      await authService.login(formData.email, formData.password);
      // Make sure authentication state is set
      if (authService.isAuthenticated()) {
        navigate('/home');
      } else {
        throw new Error('Authentication failed');
      }
    } catch (err) {
      setError(err.message || 'Invalid email or password');
      console.log('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-card">
        <div className="signin-header">
          <h2>Welcome Back</h2>
          {/* Add test credentials message */}
          <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.5rem' }}>
            Test credentials: test@example.com / password123
          </p>
        </div>
        
        {error && <div className="alert alert-danger">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
            />
          </div>
          
          <button 
            type="submit" 
            className="signin-btn"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        
        <div className="signup-link">
          Don't have an account?{' '}
          <button onClick={() => navigate('/sign-up')}>
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
