import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import axios from 'axios'
import Typography from '@mui/material/Typography'
import { useNavigate } from 'react-router-dom'
import { BACKEND_URI } from '~/API'
import CartInventory from './CartInventory'
import OrderSummary from './OrderSummary'

const CartPage = () => {
  const [products, setProducts] = useState([])
  const [selectedProducts, setSelectedProducts] = useState([])
  const navigate = useNavigate()

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
      if (prevSelectedProducts.some((p) => p._id === product._id)) {
        return prevSelectedProducts.filter((p) => p._id !== product._id)
      } else {
        return [...prevSelectedProducts, product]
      }
    })
  }

  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`${BACKEND_URI}/cart/delete-product/${productId}`)
      setProducts((prevProducts) => prevProducts.filter((product) => product._id !== productId))
      setSelectedProducts((prevSelectedProducts) => prevSelectedProducts.filter((product) => product._id !== productId))
    } catch (error) {
      console.error('Error deleting product', error)
    }
  }

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`)
  }

  const totalItems = selectedProducts.length
  const totalPrice = selectedProducts.reduce((acc, product) => acc + product.price, 0)

  const handleCheckout = async () => {}

  return (
    <Box
      sx={{
        width: 'auto',
        height: '100%',
        marginTop: (theme) => theme.other.headerBarHeight,
        marginLeft: (theme) => theme.other.marginLeftWidth,
        boxSizing: 'border-box',
        padding: '8px',
        display: 'flex',
        gap: '10px',
      }}
    >
      <CartInventory
        products={products}
        selectedProducts={selectedProducts}
        handleCheckboxChange={handleCheckboxChange}
        handleDeleteProduct={handleDeleteProduct}
        handleProductClick={handleProductClick}
      />
      <OrderSummary selectedProducts={selectedProducts} totalPrice={totalPrice} handleCheckout={handleCheckout} />
    </Box>
  )
}

export default CartPage
