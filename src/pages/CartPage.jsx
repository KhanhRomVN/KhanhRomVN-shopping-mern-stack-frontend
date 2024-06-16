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
        width: 'auto',
        height: '550px',
        marginTop: (theme) => theme.other.headerBarHeight,
        marginLeft: (theme) => theme.other.marginLeftWidth,
        boxSizing: 'border-box',
        padding: '8px',
        display: 'flex',
        gap: '10px',
      }}
    >
      <Box
        sx={{
          width: '700px',
          height: '100%',
          backgroundColor: (theme) => theme.palette.backgroundColor.primary,
          boxSizing: 'border-box',
          padding: '8px',
          borderRadius: '8px',
        }}
      >
        {products.length > 0 ? (
          products.map((product) => (
            <Box
              key={product._id}
              sx={{
                width: '100%',
                height: '100px',
                backgroundColor: (theme) => theme.palette.backgroundColor.secondary,
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                boxSizing: 'border-box',
                padding: '8px',
                justifyContent: 'space-between',
              }}
            >
              <Box
                sx={{
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Checkbox checked={selectedProducts.includes(product)} onChange={() => handleCheckboxChange(product)} />
                <Box
                  sx={{
                    height: '100%',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    marginRight: '12px',
                  }}
                >
                  <img src={product.image} alt={product.name} style={{ height: '100%', objectFit: 'cover' }} />
                </Box>
                <Box
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'start',
                    width: '300px',
                  }}
                >
                  <Typography variant="h7" sx={{ fontWeight: '600' }}>
                    {product.name}
                  </Typography>
                  <Typography variant="h8">{product.category}</Typography>
                </Box>
                <IconButton
                  onClick={() => handleDeleteProduct(product._id)}
                  aria-label="delete"
                  sx={{ alignSelf: 'start' }}
                ></IconButton>
              </Box>
              <Box
                sx={{
                  height: '100%',
                  display: 'flex',
                }}
              >
                <Typography variant="h8" sx={{ fontWeight: '600' }}>
                  {product.price}
                </Typography>
              </Box>
            </Box>
          ))
        ) : (
          <p>Nothing!</p>
        )}
      </Box>
      <Box
        sx={{
          width: '500px',
          height: '100%',
          backgroundColor: (theme) => theme.palette.backgroundColor.primary,
          boxSizing: 'border-box',
          padding: '8px',
          borderRadius: '8px',
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
  )
}

export default CartPage
