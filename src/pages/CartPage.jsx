import React, { useState, useEffect } from 'react'
import HeaderBar from '~/components/HeaderBar/HeaderBar'
import SideBar from '~/components/SideBar/SideBar'
import Box from '@mui/material/Box'
import axios from 'axios'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import { BACKEND_URI } from '~/API'

const CartPage = () => {
  const [products, setProducts] = useState([])
  const [selectedProducts, setSelectedProducts] = useState([])

  useEffect(() => {
    const fetchCartData = async () => {
      const accessToken = localStorage.getItem('accessToken')
      try {
        const response = await axios.post(
          `${BACKEND_URI}/cart/get-carts`,
          {},
          {
            headers: {
              accessToken: accessToken,
            },
          },
        )
        setProducts(response.data.productList)
      } catch (error) {
        console.error('Error fetching cart data', error)
      }
    }

    fetchCartData()
  }, [])

  const handleCheckboxChange = (product) => {
    setSelectedProducts((prevSelectedProducts) => {
      if (prevSelectedProducts.includes(product)) {
        return prevSelectedProducts.filter((p) => p !== product)
      } else {
        return [...prevSelectedProducts, product]
      }
    })
  }

  const handleDeleteProduct = (productId) => {
    setProducts((prevProducts) => prevProducts.filter((product) => product._id !== productId))
    setSelectedProducts((prevSelectedProducts) => prevSelectedProducts.filter((product) => product._id !== productId))
  }

  const totalItems = selectedProducts.length
  const totalPrice = selectedProducts.reduce((acc, product) => acc + product.price, 0)

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
          padding: '10px',
          display: 'flex',
          gap: '10px',
        }}
      >
        {/* Cart Product */}
        <Box sx={{ flexGrow: '2', height: '520px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {products.length > 0 ? (
            products.map((product) => (
              <Box
                key={product._id}
                sx={{
                  height: '160px',
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  boxSizing: 'border-box',
                  padding: '0 20px 0 4px',
                }}
              >
                <Box
                  sx={{
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '18px',
                    flexGrow: '2',
                  }}
                >
                  <Checkbox
                    checked={selectedProducts.includes(product)}
                    onChange={() => handleCheckboxChange(product)}
                  />
                  <Box sx={{ height: '100%', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
                    <img src={product.image} alt={product.name} style={{ height: '80%', objectFit: 'cover' }} />
                  </Box>
                  <Box
                    sx={{
                      height: '80%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'start',
                      width: '480px',
                    }}
                  >
                    <Typography variant="h7" sx={{ fontWeight: '600' }}>
                      {product.name}
                    </Typography>
                    <Typography variant="h8">{product.type}</Typography>
                    <DeleteIcon />
                  </Box>
                  <IconButton
                    onClick={() => handleDeleteProduct(product._id)}
                    aria-label="delete"
                    sx={{ alignSelf: 'start' }}
                  ></IconButton>
                </Box>
                <Box
                  sx={{
                    height: '80%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'start',
                    alignItems: 'end',
                    flexGrow: '1',
                  }}
                >
                  <Typography variant="h8" sx={{ fontWeight: '600' }}>
                    {product.price} VND
                  </Typography>
                </Box>
              </Box>
            ))
          ) : (
            <p>Loading cart...</p>
          )}
        </Box>
        {/* Payment Information */}
        <Box
          sx={{
            backgroundColor: 'white',
            borderRadius: '8px',
            flexGrow: '10',
            padding: '16px',
          }}
        >
          <h3>Payment Information</h3>
          <p>Total items: {totalItems}</p>
          <p>Total price: {totalPrice} VND</p>
          <Button variant="contained" color="primary">
            Checkout
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default CartPage
