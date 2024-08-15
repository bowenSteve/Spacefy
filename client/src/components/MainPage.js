import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";
import image1 from "../images/main.jpg";

function MainPage() {
  const [spaces, setSpaces] = useState([]);
  const [selectedOption, setSelectedOption] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://spacefy.onrender.com/spaces')
      .then(res => res.json())
      .then(data => {
        setSpaces(data);
        console.log(data)
      })
      .catch(error => {
        console.error('Error fetching spaces:', error);
      });
  }, []);

  function handleSelect(eventKey) {
    setSelectedOption(eventKey);
  }

  function handleSearch(event) {
    setSearchTerm(event.target.value);
  }

  function handleSpaceClick(id){
    navigate(`/payment/${id}`);
  }

  const filteredSpaces = spaces.filter(space =>
    space.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    space.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedSpaces = filteredSpaces.sort((a, b) => {
    if (selectedOption === 'Rates') {
      return a.hourly_price - b.hourly_price;
    } else if (selectedOption === 'Capacity') {
      return a.capacity - b.capacity;
    } else {
      return 0;
    }
  });

  return (
    <div>
      <Navbar />
      {/* Image area */}
      <header>
        <img
          src={image1}
          alt="Full Width"
          className="img-fluid w-100"
          style={{ height: '500px', objectFit: 'cover' }}
        />
      </header>

      <main className="container my-4">
        <h1 className="text-center mb-4 main">OUR MEETING ROOMS</h1>
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4">
          <div className="dropdown mb-3 mb-md-0">
            <button className="btn btn-color dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
              {selectedOption}
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <li><button className="dropdown-item" onClick={() => handleSelect('All')}>All</button></li>
              <li><button className="dropdown-item" onClick={() => handleSelect('Rates')}>Rates</button></li>
              <li><button className="dropdown-item" onClick={() => handleSelect('Capacity')}>Capacity</button></li>
            </ul>
          </div>
          <div className="search-wrapper w-100 w-md-auto ms-md-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search name/location"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>

        <div className="row">
          {sortedSpaces.map((space, index) => (
            <div key={index} className="col-12 col-md-6 col-lg-4 space-item mb-4" onClick={() => handleSpaceClick(space.id)}>
              <div className="card">
                <img src={space.image_url} className="card-img-top" alt={space.name} />
                <div className="card-body">
                  <h5 className="card-title">{space.name}</h5>
                  <p className="card-text"><strong>Special Features:</strong></p>
                  <ul className="list-unstyled">
                    {space.special_features.map((feature, i) => (
                      <li key={i}><i className="bi bi-check2"></i> {feature}</li>
                    ))}
                  </ul>
                  <p><strong>Capacity:</strong> {space.capacity}</p>
                  <p><strong>Location:</strong> {space.location}</p>
                  <p><strong>Hourly Rates:</strong> ${space.hourly_price}</p>
                  <p><strong>Daily Rates:</strong> ${space.daily_price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default MainPage;
