import React from 'react'
import { useNavigate } from 'react-router-dom';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
function AddForm() {
    const navigate = useNavigate();
  return (
    
    <div>
            <button className="scroll-up" onClick={() => navigate(-1)}>
            <ArrowBackIosNewIcon />
          </button>
          <br />
        AddForm
        </div>
  )
}

export default AddForm