import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import './style.css'


function index() {
  const [data, setData] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3311/cars/${id}`)
      .then((res) => setData(res.data))
  }, [id]);

  if (!data) return <div>Loading...</div>;
  
  return (
    <div>

      <section id='product-detail'>
      <div className="book-detail-container">
      <div className="book-image-section">
        <div className="scroll-buttons">
          <button className="scroll-up" onClick={() => navigate(-1)}>
            <ArrowBackIosNewIcon />
          </button>
        </div>
      </div>

      <div className="book-info-section">
<br /><br />
        <h1>Name: {data.data.brandName}</h1>
        <div className="extra-details">
          <div>
            <h4>Model: {data.data.modelName}</h4>
          </div>
      
        </div>
      </div>
    </div>
      </section>
    </div>
  )
}

export default index