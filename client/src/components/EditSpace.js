import React, { useState, useEffect } from 'react';

function EditSpace({ space }) {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        location: "",
        hourlyPrice: "",
        dailyPrice: "",
        capacity: "",
        imageUrl: "",
        special_features: [],
        availability: "true"  // default to "Available"
    });

    useEffect(() => {
        if (space) {
            setFormData({
                name: space.name,
                description: space.description,
                location: space.location,
                hourlyPrice: space.hourly_price,
                dailyPrice: space.daily_price,
                capacity: space.capacity,
                imageUrl: space.image_url,
                special_features: space.special_features || [],
                availability: space.availability ? "true" : "false"  // map boolean to string
            });
        }
    }, [space]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "special_features") {
            setFormData({ ...formData, [name]: value.split(',').map(item => item.trim()) });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`https://spacefy.onrender.com/spaces/${space.id}`, {
            method: 'PATCH',
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
                special_features: formData.special_features,
                availability: formData.availability === "true"  // convert string to boolean
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                alert(`Error: ${data.error}`);
            } else {
                alert("Space updated successfully!");
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert("An error occurred while updating the space.");
        });
    };

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this space?")) {
            fetch(`https://spacefy.onrender.com/spaces/${space.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(res => {
                if (res.ok) {
                    alert("Space deleted successfully!");
                } else {
                    return res.json().then(data => {
                        throw new Error(data.error || 'Failed to delete space');
                    });
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert("An error occurred while deleting the space.");
            });
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Edit Space</h2>
            <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                    <div className="col-md-6">
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
                    <div className="col-md-6">
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
                <div className="row mb-3">
                    <div className="col-md-6">
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
                    <div className="col-md-6">
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
                        value={formData.special_features.join(', ')}  
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="availability" className="form-label">Availability:</label>
                    <select
                        id="availability"
                        name="availability"
                        className="form-control"
                        value={formData.availability}
                        onChange={handleChange}
                        required
                    >
                        <option value="true">Available</option>
                        <option value="false">Not Available</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary me-2">Update Space</button>
                <button 
                    type="button" 
                    className="btn btn-danger" 
                    onClick={handleDelete}
                >
                    Delete Space
                </button>
            </form>
        </div>
    );
}

export default EditSpace;
