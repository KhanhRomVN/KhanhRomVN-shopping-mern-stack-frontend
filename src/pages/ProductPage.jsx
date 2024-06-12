import React, { useEffect, useState } from 'react'
import { Box, Button, Typography, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import HeaderBar from '~/components/HeaderBar/HeaderBar'
import SideBar from '~/components/SideBar/SideBar'
import { BACKEND_URI } from '~/API'
import { imageDB } from '~/firebase/firebaseConfig'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { v4 } from 'uuid'

const ProductPage = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    discount: '',
    category: '',
    image: null,
  })
  const [products, setProducts] = useState([])

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  useEffect(() => {
    const fetchProducts = async () => {
      const accessToken = localStorage.getItem('accessToken')
      try {
        const response = await axios.post(
          `${BACKEND_URI}/product/products`,
          {},
          {
            headers: {
              accessToken: accessToken,
            },
          },
        )
        setProducts(response.data.products)
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }

    fetchProducts()
  }, [])

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
  }

  const handleImageChange = (event) => {
    const imageFile = event.target.files[0]
    setFormData({ ...formData, image: imageFile })
  }

  const handleSubmit = async () => {
    const accessToken = localStorage.getItem('accessToken')
    try {
      let imageURL = ''

      if (formData.image) {
        const imageRef = ref(imageDB, `images/${v4()}`)
        const snapshot = await uploadBytes(imageRef, formData.image)
        imageURL = await getDownloadURL(snapshot.ref)
      }

      const formDataAPI = {
        name: formData.name,
        type: formData.category,
        price: parseInt(formData.price),
        discount: parseInt(formData.discount),
        image: imageURL,
      }

      const response = await axios.post(`${BACKEND_URI}/product/add-product`, formDataAPI, {
        headers: {
          'Content-Type': 'application/json',
          accessToken: accessToken,
        },
      })
      if (response.status === 201) {
        window.location.reload()
      } else {
        console.error('Failed to add product:', response.statusText)
      }
    } catch (error) {
      console.error('Error adding product:', error)
    }
  }

  const handleBecomeSeller = async () => {
    // Logic xử lý khi click nút Become a seller
    // ...
  }

  const columns = [
    { field: 'stt', headerName: 'STT', width: 70 },
    { field: '_id', headerName: 'ID', width: 220 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'type', headerName: 'Type', width: 130 },
    { field: 'price', headerName: 'Price', width: 100 },
    { field: 'discount', headerName: 'Discount', width: 100 },
    { field: 'image', headerName: 'Image', width: 300 },
    { field: 'createdAt', headerName: 'Created At', width: 200 },
    { field: 'updatedAt', headerName: 'Updated At', width: 200 },
  ]

  const rows = products.map((product, index) => ({
    id: index + 1,
    stt: index + 1,
    ...product,
  }))

  return (
    <Box
      sx={{
        backgroundColor: '#f3f3f3',
        boxSizing: 'border-box',
      }}
    >
      <HeaderBar />
      <SideBar />
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
            backgroundColor: '#fff',
          }}
        >
          <Typography variant="h6">Products</Typography>
          {user && user.role === 'seller' ? (
            <Button variant="contained" onClick={() => setShowForm(true)}>
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
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              padding: '20px',
              borderRadius: '8px',
            }}
          >
            <Typography variant="h6" style={{ color: '#fff' }}>
              Add New Product
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
              <TextField
                label="Name"
                name="name"
                value={formData.name}
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
                label="Discount"
                name="discount"
                value={formData.discount}
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
                  <MenuItem value="Fashion">Fashion</MenuItem>
                  <MenuItem value="Electronic">Electronic</MenuItem>
                  <MenuItem value="Home Appliances">Home Appliances</MenuItem>
                  <MenuItem value="Mother & Baby">Mother & Baby</MenuItem>
                  <MenuItem value="Health & Beauty">Health & Beauty</MenuItem>
                </Select>
              </FormControl>
              <input type="file" onChange={handleImageChange} />
              <Button variant="contained" onClick={handleSubmit}>
                Submit
              </Button>
            </Box>
            <Button variant="contained" onClick={() => setShowForm(false)} style={{ marginTop: '10px' }}>
              Close
            </Button>
          </Box>
        )}
        <Box sx={{ height: 400, width: '100%' }}>
          <DataGrid rows={rows} columns={columns} pageSize={5} />
        </Box>
      </Box>
    </Box>
  )
}

export default ProductPage
