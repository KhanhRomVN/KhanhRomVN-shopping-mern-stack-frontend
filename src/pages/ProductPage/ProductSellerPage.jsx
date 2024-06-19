import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import axios from 'axios'
import { BACKEND_URI } from '~/API'

const ProductSellerPage = ({ product }) => {
  const [updatedProduct, setUpdatedProduct] = useState({
    name: product.name,
    price: product.price,
    category: product.category,
    description: product.description,
    detail: product.detail,
    review: product.review,
    special: product.special,
    image: product.image,
  })

  const handleChange = (e) => {
    setUpdatedProduct({
      ...updatedProduct,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post(`${BACKEND_URI}/product/update-product`, updatedProduct)
      alert('Product updated successfully!')
    } catch (error) {
      console.error('Error updating product:', error)
      alert('Failed to update product.')
    }
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        padding: '16px',
        backgroundColor: (theme) => theme.palette.background.default,
        borderRadius: '8px',
      }}
    >
      <Typography variant="h5" sx={{ marginBottom: '16px' }}>
        Edit Product
      </Typography>
      <TextField
        label="Name"
        name="name"
        value={updatedProduct.name}
        onChange={handleChange}
        fullWidth
        variant="outlined"
      />
      <TextField
        label="Price"
        name="price"
        value={updatedProduct.price}
        onChange={handleChange}
        fullWidth
        variant="outlined"
      />
      <TextField
        label="Category"
        name="category"
        value={updatedProduct.category}
        onChange={handleChange}
        fullWidth
        variant="outlined"
      />
      <TextField
        label="Description"
        name="description"
        value={updatedProduct.description}
        onChange={handleChange}
        fullWidth
        variant="outlined"
        multiline
        rows={4}
      />
      <TextField
        label="Detail"
        name="detail"
        value={updatedProduct.detail}
        onChange={handleChange}
        fullWidth
        variant="outlined"
        multiline
        rows={4}
      />
      <TextField
        label="Review"
        name="review"
        value={updatedProduct.review}
        onChange={handleChange}
        fullWidth
        variant="outlined"
        multiline
        rows={4}
      />
      <TextField
        label="Special"
        name="special"
        value={updatedProduct.special}
        onChange={handleChange}
        fullWidth
        variant="outlined"
        multiline
        rows={4}
      />
      <TextField
        label="Image URL"
        name="image"
        value={updatedProduct.image}
        onChange={handleChange}
        fullWidth
        variant="outlined"
      />
      <Button type="submit" variant="contained" sx={{ backgroundColor: '#e15a15' }}>
        Save Changes
      </Button>
    </Box>
  )
}

export default ProductSellerPage
