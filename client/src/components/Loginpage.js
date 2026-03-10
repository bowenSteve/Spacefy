import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginNav from "./LoginNav";
import { useAuth } from '../context/AuthContext';
import "../styling/login.css";

function LoginPage() {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div>
      <LoginNav />
      <div className="login-container">
        <div className="login-card mt-5">
          <h2 className='text-color'>Welcome</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className='text-color'>Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label className='text-color'>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <div className="error-message">{error}</div>}
            <button type="submit" className='button-log' disabled={loading}>
              {loading ? "Loading..." : "LOGIN"}
            </button>
          </form>
          <div className="signup-link">
            <span className='text-color'>Don't have an account?</span> <a href="/signup">Sign Up</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
