import React, { useEffect, useReducer } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import { DataGrid } from '@mui/x-data-grid'
import { useNavigate } from 'react-router-dom'
import { initialState, reducer } from './reducer'
import { getProducts, addProduct, updateRole } from '~/API/index'
import { uploadImage } from '~/service/imageUpload'

const MyProductPage = () => {
  const navigate = useNavigate()
  const [{ user, showForm, formData, products }, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    const userData = localStorage.getItem('currentUser')
    if (userData) {
      dispatch({ type: 'SET_USER', payload: JSON.parse(userData) })
    }
  }, [])

  useEffect(() => {
    const loadProducts = async () => {
      const accessToken = localStorage.getItem('accessToken')
      try {
        const products = await getProducts(accessToken)
        dispatch({ type: 'SET_PRODUCTS', payload: products })
      } catch (error) {
        console.error('Error fetching products:', error.message)
      }
    }
    loadProducts()
  }, [])

  const handleInputChange = ({ target: { name, value } }) => {
    dispatch({ type: 'SET_FORM_DATA', payload: { [name]: value } })
  }

  const handleImageChange = ({ target: { files } }) => {
    const imageFile = files[0]
    dispatch({ type: 'SET_FORM_DATA', payload: { image: imageFile } })
  }

  const handleSubmit = async () => {
    const accessToken = localStorage.getItem('accessToken')
    try {
      let imageURL = ''

      if (formData.image) {
        imageURL = await uploadImage(formData.image)
      }

      const productData = {
        name: formData.name,
        description: formData.description,
        price: parseInt(formData.price),
        category: formData.category,
        inventory: parseInt(formData.inventory),
        image: imageURL,
      }

      const response = await addProduct(accessToken, productData)

      if (response.status === 201) {
        dispatch({ type: 'SET_PRODUCTS', payload: [...products, productData] })
        dispatch({ type: 'TOGGLE_FORM' })
      } else {
        console.error('Failed to add product:', response.statusText)
      }
    } catch (error) {
      console.error('Error adding product:', error.message)
    }
  }

  const handleBecomeSeller = async () => {
    const accessToken = localStorage.getItem('accessToken')
    try {
      const response = await updateRole(accessToken)

      if (response.status === 200) {
        const updatedUser = { ...user, role: 'seller' }
        localStorage.setItem('currentUser', JSON.stringify(updatedUser))
        dispatch({ type: 'SET_USER', payload: updatedUser })
      } else {
        console.error('Failed to update user role:', response.statusText)
      }
    } catch (error) {
      console.error('Error updating user role:', error.message)
    }
  }

  const handleRowClick = ({ row: { _id } }) => {
    navigate(`/product/${_id}`)
  }

  const columns = [
    { field: '_id', headerName: 'ID', width: 220 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'category', headerName: 'Category', width: 130 },
    { field: 'price', headerName: 'Price', width: 100 },
    { field: 'description', headerName: 'Description', width: 200 },
    { field: 'inventory', headerName: 'Inventory', width: 120 },
    { field: 'updatedAt', headerName: 'Updated At', width: 200 },
  ]

  const rows = products.map((product, index) => ({
    id: product._id,
    ...product,
  }))

  return (
    <Box
      sx={{
        width: 'auto',
        marginTop: (theme) => theme.other.headerBarHeight,
        marginLeft: (theme) => theme.other.marginLeftWidth,
        boxSizing: 'border-box',
        padding: '8px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
      }}
    >
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxSizing: 'border-box',
          padding: '8px',
          backgroundColor: (theme) => theme.palette.backgroundColor.secondary,
        }}
      >
        <Typography variant="h6">My Products</Typography>
        {user?.role === 'seller' ? (
          <Button
            variant="contained"
            sx={{
              backgroundColor: (theme) => theme.other.primaryColor,
              color: (theme) => theme.palette.textColor.primary,
            }}
            onClick={() => dispatch({ type: 'TOGGLE_FORM' })}
          >
            Add new
          </Button>
        ) : (
          <Button variant="contained" onClick={handleBecomeSeller}>
            Become a seller
          </Button>
        )}
      </Box>
      {showForm && (
        <Box
          sx={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            padding: '20px',
            borderRadius: '8px',
            zIndex: '1000',
            backgroundColor: (theme) => theme.palette.backgroundColor.primary,
          }}
        >
          <Typography variant="h6" style={{ color: 'black' }}>
            Add New Product
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
            <TextField label="Name" name="name" value={formData.name} onChange={handleInputChange} variant="outlined" />
            <TextField
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              variant="outlined"
            />
            <TextField
              label="Price"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              variant="outlined"
            />
            <TextField
              label="Inventory"
              name="inventory"
              value={formData.inventory}
              onChange={handleInputChange}
              variant="outlined"
            />
            <FormControl variant="outlined">
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                labelId="category-label"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                label="Category"
              >
                <MenuItem value="fashion">Fashion</MenuItem>
                <MenuItem value="electronics">Electronics</MenuItem>
                <MenuItem value="home_appliances">Home Appliances</MenuItem>
                <MenuItem value="mother_and_baby">Mother & Baby</MenuItem>
                <MenuItem value="health_and_beauty">Health & Beauty</MenuItem>
              </Select>
            </FormControl>
            <input type="file" onChange={handleImageChange} />
            <Button variant="contained" onClick={handleSubmit}>
              Submit
            </Button>
          </Box>
          <Button variant="contained" onClick={() => dispatch({ type: 'TOGGLE_FORM' })} style={{ marginTop: '10px' }}>
            Close
          </Button>
        </Box>
      )}
      <Box sx={{ height: '478px', width: '100%', backgroundColor: (theme) => theme.palette.backgroundColor.primary }}>
        <DataGrid rows={rows} columns={columns} pageSize={5} onRowClick={handleRowClick} />
      </Box>
    </Box>
  )
}

export default MyProductPage
