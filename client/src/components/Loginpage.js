import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAuth0 } from "@auth0/auth0-react";
import LoginNav from "./LoginNav";
import "../styling/login.css";

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Required'),
  password: Yup.string()
    .required('Required'),
});

function LoginPage() {
  const { loginWithPopup, isAuthenticated, user, getIdToken } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (values, { setSubmitting, setErrors }) => {
    fetch("https://spacefy.onrender.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((r) => {
        setSubmitting(false);
        if (r.ok) {
          r.json().then((data) => {
            localStorage.setItem('token', data.access_token);
            navigate("/");
          });
        } else {
          r.json().then((err) => {
            setErrors({ general: err.errors || ["Invalid email or password."] });
          });
        }
      });
  };
  const handleGoogleLogin = async () => {
    try {
      await loginWithPopup({ connection: 'google-oauth2' });
  
      // Wait for the user object to be available
      if (isAuthenticated && user) {
        // Send the email to the backend
        const response = await fetch("https://spacefy.onrender.com/google_login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: user.email }),
        });
  
        if (response.ok) {
          const data = await response.json();
          // Save token in local storage
          localStorage.setItem('auth0_id_token', data.access_token);
          navigate("/");
        } else {
          const err = await response.json();
          console.error("Error:", err);
          // Handle error response as needed
        }
      } else {
        console.error("Google login failed: User email not available");
      }
    } catch (error) {
      console.error("Login with Google failed:", error);
    }
  };
  

  return (
    <div>
      <LoginNav />
      <div className="login-container">
        <div className="login-card mt-5">
          <h2 className='text-color'>Welcome</h2>
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="form-group">
                  <label className='text-color'>Email</label>
                  <Field
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                  />
                  <ErrorMessage name="email" component="div" className="error-message" />
                </div>
                <div className="form-group">
                  <label className='text-color'>Password</label>
                  <Field
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                  />
                  <ErrorMessage name="password" component="div" className="error-message" />
                </div>
                <button type="submit" className='button-log' disabled={isSubmitting}>
                  {isSubmitting ? "Loading..." : "LOGIN"}
                </button>
                <div className="error-messages">
                  <ErrorMessage name="general" component="div" className="error-message" />
                </div>
              </Form>
            )}
          
          </Formik>
          <span className='mt-5 text-color fw-3'>Or</span>
          <button
  type="button"
  className='button-g'
  onClick={handleGoogleLogin}
>
  <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" viewBox="0 0 256 262" className="google-icon">
    <path fill="#4285F4" d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"></path>
    <path fill="#34A853" d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"></path>
    <path fill="#FBBC05" d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"></path>
    <path fill="#EB4335" d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"></path>
  </svg>
  Continue with Google
</button>

          <div className="signup-link">
            <span className='text-color'>Don't have an account?</span> <a href="/signup">Sign Up</a>
          </div>
        </div>
  
      </div>
    </div>
  );
}

export default LoginPage;
