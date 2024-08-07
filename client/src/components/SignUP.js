import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUpPage() {
    const [formData, setFormData] = useState({
        firstName: "",
        secondName: "",
        email: "",
        password: "",
        role: "", 
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        fetch('http://localhost:5000/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                first_name: formData.firstName,
                second_name: formData.secondName,
                email: formData.email,
                password: formData.password,
                role: formData.role
            })
        })
        .then(res => res.json())
        .then(res => {
                navigate('/login');
                alert("Account Created Successfully!");
        })
        .catch(error => {
            console.error('Error:', error);
            alert("An unexpected error occurred");
        });
    };
    return (
        <div className="signup-container">
        <div className="signup-card">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="firstName">First Name:</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        placeholder="Enter your first name"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="secondName">Second Name:</label>
                    <input
                        type="text"
                        id="secondName"
                        name="secondName"
                        placeholder="Enter your second name"
                        value={formData.secondName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="role">Role:</label>
                    <select
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select a role</option>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                <button type="submit" className="button-submit">Sign Up</button>
            </form>
            <div className="login-link">
                Already have an account? <a href="/login">Log In</a>
            </div>
        </div>
    </div>
);
   }

export default SignUpPage;
