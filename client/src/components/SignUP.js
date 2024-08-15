import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styling/signin.css";
import LoginNav from "./LoginNav";

function SignUpPage() {
    const [formData, setFormData] = useState({
        role: "",
        firstName: "",
        secondName: "",
        email: "",
        password: "",
        pdfFile: null,
    });
    const [adminMessage, setAdminMessage] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: files ? files[0] : value 
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const apiEndpoint = formData.role === "Space_Owner"
            ? 'https://spacefy.onrender.com/admin_signup'
            : 'https://spacefy.onrender.com/signup';

        const formDataToSend = new FormData();
        formDataToSend.append("first_name", formData.firstName);
        formDataToSend.append("second_name", formData.secondName);
        formDataToSend.append("email", formData.email);
        formDataToSend.append("password", formData.password);
        formDataToSend.append("role", formData.role === "Space_Owner");

        if (formData.role === "Space_Owner" && formData.pdfFile) {
            formDataToSend.append("national_id", formData.pdfFile);
        }

        fetch(apiEndpoint, {
            method: 'POST',
            body: formDataToSend
        })
        .then(res => {
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            return res.json();
        })
        .then(data => {
            if (formData.role === "Space_Owner") {
                setAdminMessage("Your account will be created after the document has been verified.");
            } else {
                navigate('/login');
                alert("Account Created Successfully!");
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert("An unexpected error occurred");
        });
    };

    return (
        <div>
            <LoginNav />
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-lg-6 col-md-8 col-sm-12">
                        <div className="signup-card p-4 border rounded bg-light">
                            <h2 className='text-center mb-4'>Sign Up</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className='form-label' htmlFor="role">Role:</label>
                                    <select
                                        id="role"
                                        name="role"
                                        className="form-select"
                                        value={formData.role}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Select a role</option>
                                        <option value="user">User</option>
                                        <option value="Space_Owner">Space_Owner</option>
                                    </select>
                                </div>

                                {formData.role && (
                                    <>
                                        <div className="mb-3">
                                            <label className='form-label' htmlFor="firstName">First Name:</label>
                                            <input
                                                type="text"
                                                id="firstName"
                                                name="firstName"
                                                className="form-control"
                                                placeholder="Enter your first name"
                                                value={formData.firstName}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className='form-label' htmlFor="secondName">Second Name:</label>
                                            <input
                                                type="text"
                                                id="secondName"
                                                name="secondName"
                                                className="form-control"
                                                placeholder="Enter your second name"
                                                value={formData.secondName}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className='form-label' htmlFor="email">Email:</label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                className="form-control"
                                                placeholder="Enter your email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className='form-label' htmlFor="password">Password:</label>
                                            <input
                                                type="password"
                                                id="password"
                                                name="password"
                                                className="form-control"
                                                placeholder="Enter your password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        {formData.role === "Space_Owner" && (
                                            <div className="mb-3">
                                                <label className='form-label' htmlFor="pdfFile">Upload National Identification:</label>
                                                <input
                                                    type="file"
                                                    id="pdfFile"
                                                    name="pdfFile"
                                                    className="form-control"
                                                    accept=".pdf"
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        )}
                                    </>
                                )}
                                <button type="submit" className="btn btn-primary w-100">Sign Up</button>
                            </form>
                            {adminMessage && <p className="mt-3 text-warning fw-bold text-center">{adminMessage}</p>}
                            <div className="text-center mt-3">
                                <span>Already have an account? </span><a href="/login">Log In</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUpPage;
