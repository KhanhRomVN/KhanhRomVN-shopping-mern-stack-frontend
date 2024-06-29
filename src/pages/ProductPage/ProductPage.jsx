import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Typography from '@mui/material/Typography'
import axios from 'axios'
import Box from '@mui/material/Box'
import { BACKEND_URI } from '~/API'
import FixedBar from './ProductComponent/FixedBar'
import ProductTabs from './ProductComponent/ProductTabs'
import ProductSellerPage from './ProductSellerPage'
import { useSnackbar } from 'notistack'

const ProductPage = () => {
  const { prod_id } = useParams()
  const [product, setProduct] = useState(null)
  const [tabIndex, setTabIndex] = useState('description')
  const [productUserId, setProductUserId] = useState('')
  const currentUser = JSON.parse(localStorage.getItem('currentUser'))
  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.post(`${BACKEND_URI}/product/get-product`, { prod_id })
        const productUserId = response.data.product.user_id
        setProductUserId(productUserId)
        if (response.data && response.data.product) {
          setProduct(response.data.product)
        }
      } catch (error) {
        console.error('Error fetching product:', error)
        enqueueSnackbar('Error fetching product data', { variant: 'error' })
      }
    }
    fetchProduct()
  }, [prod_id])

  const addToCart = async () => {
    const token = localStorage.getItem('accessToken')
    try {
      await axios.post(
        `${BACKEND_URI}/cart/add-cart`,
        { prod_id },
        {
          headers: {
            'Content-Type': 'application/json',
            accessToken: token,
          },
        },
      )
      enqueueSnackbar('Product added to cart successfully!', { variant: 'success' })
    } catch (error) {
      console.error('Error adding product to cart:', error)
      enqueueSnackbar('Failed to add product to cart', { variant: 'error' })
    }
  }

  if (!product) {
    return <div>Loading...</div>
  }

  return (
    <Box
      sx={{
        width: 'auto',
        boxSizing: 'border-box',
        padding: '8px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
      }}
    >
      {productUserId === currentUser.user_id ? (
        <ProductSellerPage product={product} />
      ) : (
        <Box sx={{ display: 'flex', gap: '10px' }}>
          <Box
            sx={{
              width: '550px',
              height: '535px',
              display: 'flex',
              flexDirection: 'column',
              boxSizing: 'border-box',
              gap: '10px',
            }}
          >
            <Box
              sx={{
                width: '100%',
                height: '445px',
                backgroundColor: (theme) => theme.palette.background.default,
                borderRadius: '8px',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img src={product.image} alt={product.name} style={{ width: '90%', objectFit: 'cover' }} />
            </Box>
            <Box
              sx={{
                width: '100%',
                height: '90px',
                backgroundColor: (theme) => theme.palette.background.default,
                borderRadius: '8px',
              }}
            ></Box>
          </Box>
          <Box
            sx={{
              width: '590px',
              height: '535px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            <Box
              sx={{
                width: '100%',
                height: '100px',
                backgroundColor: (theme) => theme.palette.background.default,
                borderRadius: '8px',
                boxSizing: 'border-box',
                padding: '12px',
              }}
            >
              <Typography sx={{ color: (theme) => theme.palette.text.primary, fontSize: '14px' }}>
                {product.category}
              </Typography>
              <Typography
                sx={{
                  fontWeight: '600',
                  color: (theme) => theme.palette.text.primary,
                  fontSize: '24px',
                }}
              >
                {product.name}
              </Typography>
            </Box>
            <ProductTabs tabIndex={tabIndex} setTabIndex={setTabIndex} product={product} />
          </Box>
          <FixedBar productPrice={product.price} addToCart={addToCart} />
        </Box>
      )}
    </Box>
  )
}

export default ProductPage
