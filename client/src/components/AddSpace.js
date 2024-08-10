import React, { useState } from 'react';

function AddSpace() {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        location: "",
        hourlyPrice: "",
        dailyPrice: "",
        capacity: "",
        imageUrl: "",
        special_features: ['']
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "special_features") {
            setFormData({ ...formData, [name]: value.split(',').map(item => item.trim()) });  // Split input by commas and trim spaces
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:5000/spaces', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                name: formData.name,
                description: formData.description,
                location: formData.location,
                hourly_price: formData.hourlyPrice,
                daily_price: formData.dailyPrice,
                capacity: formData.capacity,
                image_url: formData.imageUrl,
                special_features: formData.special_features
            })
        })
        .then(res => res.json())
        .then(data => {
            alert("Space added successfully!");
            console.log(data)

        })
        .catch(error => {
            console.error('Error:', error);
            alert("An error occurred while adding the space.");
        });
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Add New Space</h2>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label htmlFor="name" className="form-label">Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="form-control"
                            placeholder="Enter space name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="imageUrl" className="form-label">Image URL:</label>
                        <input
                            type="text"
                            id="imageUrl"
                            name="imageUrl"
                            className="form-control"
                            placeholder="Enter image URL"
                            value={formData.imageUrl}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description:</label>
                    <textarea
                        id="description"
                        name="description"
                        className="form-control"
                        rows="3"
                        placeholder="Enter space description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="location" className="form-label">Location:</label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        className="form-control"
                        placeholder="Enter space location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label htmlFor="hourlyPrice" className="form-label">Hourly Price:</label>
                        <input
                            type="number"
                            id="hourlyPrice"
                            name="hourlyPrice"
                            className="form-control"
                            placeholder="Enter hourly price"
                            value={formData.hourlyPrice}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="dailyPrice" className="form-label">Daily Price:</label>
                        <input
                            type="number"
                            id="dailyPrice"
                            name="dailyPrice"
                            className="form-control"
                            placeholder="Enter daily price"
                            value={formData.dailyPrice}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="capacity" className="form-label">Capacity:</label>
                    <input
                        type="number"
                        id="capacity"
                        name="capacity"
                        className="form-control"
                        placeholder="Enter space capacity"
                        value={formData.capacity}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="special_features" className="form-label">Special Features (comma-separated):</label>
                    <input
                        type="text"
                        id="special_features"
                        name="special_features"
                        className="form-control"
                        placeholder="Enter special features separated by commas"
                        value={formData.special_features.join(', ')}  // Join array into a string for display
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Add Space</button>
            </form>
        </div>
    );
}

export default AddSpace;
