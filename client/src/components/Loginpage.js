import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import LoginNav from "./LoginNav";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

  function handleLogIn(e) {
    e.preventDefault();
    setIsLoading(true);

    fetch("http://127.0.0.1:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((r) => {
        setIsLoading(false);
        if (r.ok) {
          r.json().then((data) => {
            localStorage.setItem('token', data.access_token);
            navigate("/");
          });
        } else {
          r.json().then((err) => setErrors(err.errors || ["Invalid email or password."]));
          console.log(r)
        }
      });
  }

  return (
    <div>
      <LoginNav />
      <div className="login-container">
        <div className="login-card">
          <h2>Welcome</h2>
          <form onSubmit={handleLogIn}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className='button-log' disabled={isLoading}>
              {isLoading ? "Loading..." : "LOGIN"}
            </button>
          </form>
          {errors.length > 0 && (
            <div className="error-messages">
              {errors.map((error, index) => (
                <p key={index}>{error}</p>
              ))}
            </div>
          )}
          <div className="signup-link">
            Don't have an account? <a href="/signup">Sign Up</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
