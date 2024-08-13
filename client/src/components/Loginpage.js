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
    fetch("http://127.0.0.1:5000/login", {
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
      // After successful login, get the ID token and save it to local storage
      const idToken = await getIdToken();
      localStorage.setItem('auth0_id_token', idToken); // Save token in local storage
      console.log("ID Token:", idToken);
      console.log("User Info:", user);
      navigate("/");
    } catch (error) {
      console.error("Login with Google failed:", error);
    }
  };

  return (
    <div>
      <LoginNav />
      <div className="login-container">
        <div className="login-card">
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
          <button
            type="button"
            className='button-google'
            onClick={handleGoogleLogin}
          >
            Login with Google
          </button>
          <div className="signup-link">
            <span className='text-color'>Don't have an account?</span> <a href="/signup">Sign Up</a>
          </div>
        </div>
        <div className="login-image">
          <img src="https://media.istockphoto.com/id/2153740552/photo/digital-person-identity-concept-with-touch-screen-biometrics-security-by-fingerprint-abstract.webp?b=1&s=170667a&w=0&k=20&c=Sl72tua1ViH3GDZyycpsFwKCDvaHV8cbN86kl6HtOTE=" alt="Login pic" />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
