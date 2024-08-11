import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import LoginNav from "./LoginNav";
import "../styling/login.css";

// Define validation schema with Yup
const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Required'),
  password: Yup.string()
    .required('Required'),
});

function LoginPage() {
  const navigate = useNavigate();

  // Handle form submission
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

  return (
    <div>
      <LoginNav />
      <div className="login-container">
        <div className="login-card">
          <h2>Welcome</h2>
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="form-group">
                  <label>Email</label>
                  <Field
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                  />
                  <ErrorMessage name="email" component="div" className="error-message" />
                </div>
                <div className="form-group">
                  <label>Password</label>
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
                {/* Display general errors */}
                <div className="error-messages">
                  <ErrorMessage name="general" component="div" className="error-message" />
                </div>
              </Form>
            )}
          </Formik>
          <div className="signup-link">
            Don't have an account? <a href="/signup">Sign Up</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
