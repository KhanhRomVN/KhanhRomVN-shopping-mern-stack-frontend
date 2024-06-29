import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import { BACKEND_URI } from '~/API';
import LabeledInputBase from './LabeledInputBase';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { imageDB } from '~/firebase/firebaseConfig';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';

const AddProductForm = ({ accessToken, onProductAdded, onCancel }) => {
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    image: '',
    price: '',
    category: '',
    inventory: ''
  });
  const [imageFile, setImageFile] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleImageUpload = async () => {
    if (imageFile) {
      const imageRef = ref(imageDB, `images/${v4()}.${imageFile.type.split('/').pop()}`);
      await uploadBytes(imageRef, imageFile);
      const url = await getDownloadURL(imageRef);
      setProductData({ ...productData, image: url });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await handleImageUpload();
    try {
      const formData = {
        name: productData.name,
        description: productData.description,
        image: productData.image,
        price: productData.price,
        category: productData.category,
        inventory: productData.inventory
      };
      await axios.post(`${BACKEND_URI}/product/add-product`, formData, {
        headers: {
          accessToken: accessToken,
        }
      });
      onProductAdded();
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <Box sx={{ width: 600 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={6}>
          <LabeledInputBase
            label="Name:"
            type="text"
            value={productData.name}
            onChange={handleChange}
            name="name"
            placeholder="Enter the product name"
            fullWidth
            variant="outlined"
          />
        </Grid>
        <Grid item xs={6}>
          <LabeledInputBase
            label="Price:"
            type="number"
            value={productData.price}
            onChange={handleChange}
            name="price"
            placeholder="Enter product price"
            fullWidth
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <LabeledInputBase
            label="Description:"
            type="text"
            value={productData.description}
            onChange={handleChange}
            name="description"
            placeholder="Enter product description"
            fullWidth
            variant="outlined"
          />
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth variant="outlined" sx={{ height: '100%' }}>
            <InputLabel id="category-label">Category:</InputLabel>
            <Select
              labelId="category-label"
              id="category"
              value={productData.category}
              onChange={handleChange}
              label="Category"
              name="category"
              fullWidth
              sx={{ height: '100%' }}
            >
              <MenuItem value="A">A</MenuItem>
              <MenuItem value="B">B</MenuItem>
              <MenuItem value="C">C</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <LabeledInputBase
            label="Inventory:"
            type="number"
            value={productData.inventory}
            onChange={handleChange}
            name="inventory"
            placeholder="Enter inventory quantity"
            fullWidth
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <input
            accept="image/*"
            id="image-upload"
            type="file"
            onChange={handleImageChange}
            style={{ display: 'none' }}
          />
          <label htmlFor="image-upload">
            <Button variant="contained" component="span">
              Select product photo
            </Button>
          </label>
          {imageFile && (
            <img
              alt="Preview"
              src={URL.createObjectURL(imageFile)}
              style={{ height: '100px'}}
            />
          )}
        </Grid>
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          Add Product
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={onCancel}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default AddProductForm;
