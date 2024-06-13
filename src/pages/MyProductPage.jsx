import { useEffect, useReducer } from 'react'
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
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { v4 } from 'uuid'
import HeaderBar from '~/components/HeaderBar/HeaderBar'
import SideBar from '~/components/SideBar/SideBar'
import { imageDB } from '~/firebase/firebaseConfig'
import { fetchProducts, addProduct, updateUserRole } from '~/API'

const initialState = {
  user: null,
  showForm: false,
  formData: {
    name: '',
    price: '',
    discount: '',
    category: '',
    image: null,
  },
  products: [],
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload }
    case 'TOGGLE_FORM':
      return { ...state, showForm: !state.showForm }
    case 'SET_FORM_DATA':
      return { ...state, formData: { ...state.formData, ...action.payload } }
    case 'SET_PRODUCTS':
      return { ...state, products: action.payload }
    default:
      return state
  }
}

const MyProductPage = () => {
  const navigate = useNavigate()
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      dispatch({ type: 'SET_USER', payload: JSON.parse(userData) })
    }
  }, [])

  useEffect(() => {
    const loadProducts = async () => {
      const accessToken = localStorage.getItem('accessToken')
      try {
        const products = await fetchProducts(accessToken)
        dispatch({ type: 'SET_PRODUCTS', payload: products })
      } catch (error) {
        console.error(error.message)
      }
    }

    loadProducts()
  }, [])

  const handleInputChange = (event) => {
    const { name, value } = event.target
    dispatch({ type: 'SET_FORM_DATA', payload: { [name]: value } })
  }

  const handleImageChange = (event) => {
    const imageFile = event.target.files[0]
    dispatch({ type: 'SET_FORM_DATA', payload: { image: imageFile } })
  }

  const handleSubmit = async () => {
    const accessToken = localStorage.getItem('accessToken')
    try {
      let imageURL = ''

      if (state.formData.image) {
        const imageRef = ref(imageDB, `images/${v4()}`)
        const snapshot = await uploadBytes(imageRef, state.formData.image)
        imageURL = await getDownloadURL(snapshot.ref)
      }

      const productData = {
        name: state.formData.name,
        type: state.formData.category,
        price: parseInt(state.formData.price),
        discount: parseInt(state.formData.discount),
        image: imageURL,
      }

      const response = await addProduct(accessToken, productData)
      if (response.status === 201) {
        window.location.reload()
      } else {
        console.error('Failed to add product:', response.statusText)
      }
    } catch (error) {
      console.error(error.message)
    }
  }

  const handleBecomeSeller = async () => {
    const accessToken = localStorage.getItem('accessToken')
    try {
      const response = await updateUserRole(accessToken)
      if (response.status === 200) {
        const updatedUser = { ...state.user, role: 'seller' }
        localStorage.setItem('user', JSON.stringify(updatedUser))
        window.location.reload()
      } else {
        console.error('Failed to update user role:', response.statusText)
      }
    } catch (error) {
      console.error(error.message)
    }
  }

  const handleRowClick = (params) => {
    const id = params.row._id // Giả sử _id là trường chứa ID của sản phẩm
    navigate(`/product/${id}`)
  }

  const columns = [
    { field: 'stt', headerName: 'STT', width: 70 },
    { field: '_id', headerName: 'ID', width: 220 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'type', headerName: 'Type', width: 130 },
    { field: 'price', headerName: 'Price', width: 100 },
    { field: 'discount', headerName: 'Discount', width: 100 },
    { field: 'updatedAt', headerName: 'Updated At', width: 200 },
  ]

  const rows = state.products.map((product, index) => ({
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
          <Typography variant="h6">My Products</Typography>
          {state.user && state.user.role === 'seller' ? (
            <Button variant="contained" onClick={() => dispatch({ type: 'TOGGLE_FORM' })}>
              Add new
            </Button>
          ) : (
            <Button variant="contained" onClick={handleBecomeSeller}>
              Become a seller
            </Button>
          )}
        </Box>
        {state.showForm && (
          <Box
            sx={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: '#fff',
              padding: '20px',
              borderRadius: '8px',
              zIndex: '10',
            }}
          >
            <Typography variant="h6" style={{ color: 'black' }}>
              Add New Product
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
              <TextField
                label="Name"
                name="name"
                value={state.formData.name}
                onChange={handleInputChange}
                variant="outlined"
              />
              <TextField
                label="Price"
                name="price"
                value={state.formData.price}
                onChange={handleInputChange}
                variant="outlined"
              />
              <TextField
                label="Discount"
                name="discount"
                value={state.formData.discount}
                onChange={handleInputChange}
                variant="outlined"
              />
              <FormControl variant="outlined">
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                  labelId="category-label"
                  id="category"
                  name="category"
                  value={state.formData.category}
                  onChange={handleInputChange}
                  label="Category"
                >
                  <MenuItem value="fashion">Fashion</MenuItem>
                  <MenuItem value="electronic">Electronic</MenuItem>
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
        <Box sx={{ height: '478px', width: '100%', backgroundColor: 'white' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            onRowClick={handleRowClick} // Thêm sự kiện onRowClick và truyền hàm xử lý sự kiện vào đó
          />
        </Box>
      </Box>
    </Box>
  )
}

export default MyProductPage
