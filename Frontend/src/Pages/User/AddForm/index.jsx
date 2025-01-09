import React, { useState } from 'react';
import { useFormik } from 'formik';
import { TextField, Button, Box, Typography } from '@mui/material';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
const CarForm = () => {

    const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(null);
  const [submitError, setSubmitError] = useState(null);

  const formik = useFormik({
    initialValues: {
      brandName: '',
      modelName: '',
      year: '',
      isNew: true,
    },
    validationSchema: Yup.object({
      brandName: Yup.string().required('Brand required'),
      modelName: Yup.string().required('Model required'),
      year: Yup.number()
        .typeError('The year must be a valid number')
        .positive('The year should be a positive number')
        .integer('The year must be an integer')
        .min(1900, 'The year must be 1900 or greater')
        .max(new Date().getFullYear(), `Year ${new Date().getFullYear()} or it should be smaller`)
        .required('Year required')
    }),
    onSubmit: async (values) => {
      setIsSubmitting(true);
      setSubmitSuccess(null);
      setSubmitError(null);
      
      try {
        const response = await axios.post('http://localhost:3311/cars', values);
        setSubmitSuccess('Succesful adding!');
        formik.resetForm();
      } catch (error) {
        setSubmitError('An error occurred while adding to the car.');
      } finally {
        setIsSubmitting(false);
      }
    }
  });

  return (
<>
<button className="scroll-up" onClick={() => navigate(-1)}>
            <ArrowBackIosNewIcon />
          </button>
<Box sx={{ maxWidth: 500, margin: '0 auto', padding: 2 }}>
        
        <Typography variant="h5" gutterBottom>
        Add New Car
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            label="Brand"
            name="brandName"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formik.values.brandName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.brandName && Boolean(formik.errors.brandName)}
            helperText={formik.touched.brandName && formik.errors.brandName}
          />
  
          <TextField
            label="Model"
            name="modelName"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formik.values.modelName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.modelName && Boolean(formik.errors.modelName)}
            helperText={formik.touched.modelName && formik.errors.modelName}
          />
  
          {/* Yıl */}
          <TextField
            label="Yıl"
            name="year"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formik.values.year}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.year && Boolean(formik.errors.year)}
            helperText={formik.touched.year && formik.errors.year}
            type="number"
          />
  
          {submitSuccess && (
            <Typography variant="body2" color="green" sx={{ marginTop: 2 }}>
              {submitSuccess}
            </Typography>
          )}
          {submitError && (
            <Typography variant="body2" color="error" sx={{ marginTop: 2 }}>
              {submitError}
            </Typography>
          )}
  
        
          <Box sx={{ marginTop: 2 }}>
            <Button type="submit" variant="contained" color="primary" fullWidth disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </Button>
          </Box>
        </form>
      </Box>

</>
  );
};

export default CarForm;
