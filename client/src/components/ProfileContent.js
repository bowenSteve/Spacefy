import { useState } from "react";

function ProfileContent({ user }) {
  const [formData, setFormData] = useState({
    first_name: user.first_name,
    second_name: user.second_name,
    email: user.email,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    const token = localStorage.getItem("token");
    e.preventDefault();
    fetch(`https://spacefy.onrender.com/users/${user.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(data => {
      alert("Profile updated successfully!");
    })
    .catch(error => {
      console.error('Error updating profile:', error);
      alert("An error occurred while updating the profile.");
    });
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Edit Profile</h2>
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8">
          <div className="card shadow-sm">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="first_name" className="form-label">First Name:</label>
                  <input
                    type="text"
                    id="first_name"
                    name="first_name"
                    className="form-control"
                    value={formData.first_name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="second_name" className="form-label">Second Name:</label>
                  <input
                    type="text"
                    id="second_name"
                    name="second_name"
                    className="form-control"
                    value={formData.second_name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email:</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary btn-lg">Save Changes</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileContent;
