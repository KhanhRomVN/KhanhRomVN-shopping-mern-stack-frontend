import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Typography from '@mui/material/Typography'
import axios from 'axios'
import HeaderBar from '~/components/HeaderBar/HeaderBar'
import SideBar from '~/components/SideBar/SideBar'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import ShareIcon from '@mui/icons-material/Share'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { BACKEND_URI } from '~/API'

const FixedBar = ({ productPrice, addToCart }) => {
  return (
    <Box
      sx={{
        position: 'fixed',
        left: '40%',
        bottom: '10px',
        backgroundColor: (theme) => theme.palette.textColor.secondary,
        borderRadius: '60px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '4px',
        boxSizing: 'border-box',
      }}
    >
      <IconButton aria-label="share" sx={{ backgroundColor: '#e15a15' }}>
        <ShareIcon sx={{ height: '18px', width: '18px', color: 'white' }} />
      </IconButton>
      <IconButton aria-label="favorite" sx={{ backgroundColor: '#e15a15' }}>
        <FavoriteIcon sx={{ height: '18px', width: '18px', color: 'white' }} />
      </IconButton>
      <Button
        variant="contained"
        sx={{
          backgroundColor: '#e15a15',
          display: 'flex',
          gap: '50px',
          borderRadius: '60px',
          padding: '4px 6px 4px 12px',
        }}
        onClick={addToCart}
      >
        <Typography variant="h10" sx={{ color: 'white' }}>
          Add to Cart
        </Typography>
        <Box sx={{ backgroundColor: 'white', padding: '4px', borderRadius: '40px' }}>
          <Typography variant="h10" sx={{ color: 'black' }}>
            ${productPrice}
          </Typography>
        </Box>
      </Button>
    </Box>
  )
}

const ProductPage = () => {
  const { prod_id } = useParams()
  const [product, setProduct] = useState(null)
  const [tabIndex, setTabIndex] = useState('description')

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.post(`${BACKEND_URI}/product/get-product`, {
          prod_id,
        })
        if (response.data && response.data.product) {
          setProduct(response.data.product)
        }
      } catch (error) {
        console.error('Error fetching product:', error)
      }
    }

    fetchProduct()
  }, [prod_id])

  const handleTabChange = (value) => {
    setTabIndex(value)
  }

  const addToCart = async () => {
    const token = localStorage.getItem('accessToken')
    try {
      await axios.post(
        `${BACKEND_URI}/cart/add-cart`,
        { prod_id: prod_id },
        {
          headers: {
            'Content-Type': 'application/json',
            accessToken: token,
          },
        },
      )
      alert('Product added to cart successfully!')
    } catch (error) {
      console.error('Error adding product to cart:', error)
      alert('Failed to add product to cart.')
    }
  }

  if (!product) {
    return <div>Loading...</div>
  }

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
              backgroundColor: (theme) => theme.palette.backgroundColor.primary,
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
              backgroundColor: (theme) => theme.palette.backgroundColor.primary,
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
              backgroundColor: (theme) => theme.palette.backgroundColor.primary,
              borderRadius: '8px',
              boxSizing: 'border-box',
              padding: '12px',
            }}
          >
            <Typography sx={{ color: (theme) => theme.other.primaryColor, fontSize: '14px' }}>
              {product.category}
            </Typography>
            <Typography sx={{ fontWeight: '600', color: (theme) => theme.palette.textColor.primary, fontSize: '24px' }}>
              {product.name}
            </Typography>
          </Box>
          <Box
            sx={{
              width: '100%',
              height: '435px',
              backgroundColor: (theme) => theme.palette.backgroundColor.primary,
              borderRadius: '8px',
              boxSizing: 'border-box',
              padding: '6px',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                gap: '10px',
                marginBottom: '10px',
              }}
            >
              <Button
                variant={tabIndex === 'description' ? 'contained' : 'outlined'}
                onClick={() => handleTabChange('description')}
                sx={{
                  backgroundColor: tabIndex === 'description' ? '#e15a15' : 'white',
                  color: tabIndex === 'description' ? 'white' : '#e15a15',
                  '&:hover': {
                    backgroundColor: 'white',
                    color: '#e15a15',
                    borderColor: '#e15a15',
                  },
                }}
              >
                Description
              </Button>
              <Button
                variant={tabIndex === 'detail' ? 'contained' : 'outlined'}
                onClick={() => handleTabChange('detail')}
                sx={{
                  backgroundColor: tabIndex === 'detail' ? '#e15a15' : 'white',
                  color: tabIndex === 'detail' ? 'white' : '#e15a15',
                  '&:hover': {
                    backgroundColor: 'white',
                    color: '#e15a15',
                    borderColor: '#e15a15',
                  },
                }}
              >
                Detail
              </Button>
              <Button
                variant={tabIndex === 'review' ? 'contained' : 'outlined'}
                onClick={() => handleTabChange('review')}
                sx={{
                  backgroundColor: tabIndex === 'review' ? '#e15a15' : 'white',
                  color: tabIndex === 'review' ? 'white' : '#e15a15',
                  '&:hover': {
                    backgroundColor: 'white',
                    color: '#e15a15',
                    borderColor: '#e15a15',
                  },
                }}
              >
                Review
              </Button>
              <Button
                variant={tabIndex === 'special' ? 'contained' : 'outlined'}
                onClick={() => handleTabChange('special')}
                sx={{
                  backgroundColor: tabIndex === 'special' ? '#e15a15' : 'white',
                  color: tabIndex === 'special' ? 'white' : '#e15a15',
                  '&:hover': {
                    backgroundColor: 'white',
                    color: '#e15a15',
                    borderColor: '#e15a15',
                  },
                }}
              >
                Special
              </Button>
            </Box>
            {tabIndex === 'description' && (
              <Box sx={{ padding: '18px', maxHeight: '358px', overflowY: 'auto' }}>
                <Typography sx={{ color: (theme) => theme.palette.textColor.secondary }}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Error minima corporis deserunt esse,
                  consequuntur dolor facere tempora commodi itaque maiores illum aperiam cum adipisci voluptatibus quod.
                  Numquam sequi magnam vel! Lorem ipsum dolor sit amet consectetur adipisicing elit. Error minima
                  corporis deserunt esse, consequuntur dolor facere tempora commodi itaque maiores illum aperiam cum
                  adipisci voluptatibus qu od. Numquam sequi magnam vel! Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Error minima corporis deserunt esse, consequuntur dolor facere tempora commodi
                  itaque maiores illum aperiam cum adipisci voluptatibus quod. Numquam sequi magnam vel! Lorem aperiam
                  cum adipisci voluptatibus qu od. Numquam sequi magnam vel! Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Error minima corporis deserunt esse, consequuntur dolor facere tempora commodi
                  itaque maiores illum aperiam cum adipisci voluptatibus quod. Numquam sequi magnam vel! Lorem
                </Typography>
              </Box>
            )}
            {tabIndex === 'detail' && (
              <Box sx={{ padding: '16px' }}>
                <Typography sx={{ color: (theme) => theme.palette.textColor.secondary }}>{product.detail}</Typography>
              </Box>
            )}
            {tabIndex === 'review' && (
              <Box sx={{ padding: '16px' }}>
                <Typography sx={{ color: (theme) => theme.palette.textColor.secondary }}>{product.review}</Typography>
              </Box>
            )}
            {tabIndex === 'special' && (
              <Box sx={{ padding: '16px' }}>
                <Typography sx={{ color: (theme) => theme.palette.textColor.secondary }}>{product.special}</Typography>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
      <FixedBar productPrice={product.price} addToCart={addToCart} />
      <Box
        sx={{
          width: '100%',
          height: '400px',
          backgroundColor: (theme) => theme.palette.backgroundColor.primary,
          borderRadius: '8px',
        }}
      ></Box>
    </Box>
  )
}

export default ProductPage
