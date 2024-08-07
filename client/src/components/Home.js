import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";
import image1 from "../images/main.jpg";

function Home() {
  const [spaces, setSpaces] = useState([]);
  const [selectedOption, setSelectedOption] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/spaces')
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
    navigate(`/space/${id}`);
  }

  const filteredSpaces = spaces.filter(space =>
    space.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    space.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Navbar />
      {/* image area */}
      <header>
        <img
          src={image1}
          alt="Full Width"
          className="img-fluid w-100"
          style={{ width: '100%', height: '500px', objectFit: 'cover' }}
        />
      </header>

      <main>
        <h1 className="main mt-2">OUR MEETING ROOMS</h1>
        <div className="dropdown-wrapper">
          <div className="dropdown mb-4">
            <button className="btn btn-color dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
              {selectedOption}
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <li><a className="dropdown-item" href="#" onClick={() => handleSelect('All')}>All</a></li>
              <li><a className="dropdown-item" href="#" onClick={() => handleSelect('Rates')}>Rates</a></li>
              <li><a className="dropdown-item" href="#" onClick={() => handleSelect('Capacity')}>Capacity</a></li>
            </ul>
          </div>
          <div className="search-wrapper">
            <input
              type="text"
              className="form-control"
              placeholder="Search name/location"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>
        <div className="container">
          <div className="row">
            {filteredSpaces.map((space, index) => (
              <div key={index} className="col-md-6 space-item mb-4" onClick={() => handleSpaceClick(space.id)}>
                <h2>{space.name}</h2>
                <p><strong>Special Features:</strong></p>
                <ul>
                  {space.special_features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
                <p><strong>Capacity:</strong> {space.capacity}</p>
                <p><strong>Location:</strong> {space.location}</p>
                <img alt="image" src={space.image_url} className="space-image" />
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Home;
