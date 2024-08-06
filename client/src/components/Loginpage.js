import LoginNav from "./LoginNav"

const LoginPage = () => {
  return (
    <div>
        <LoginNav />
    <div className="login-container">
      <div className="login-card">
        <h2>Welcome</h2>
        <form>
          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="Enter your email" required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="Enter your password" required />
          </div>
          <button type="submit" className='button-log'>LOGIN</button>
        </form>
        <div className="signup-link">
          Don't have an account? <a href="/signup">Sign Up</a>
        </div>
      </div>
    </div>
    </div>
  );
};

export default LoginPage;