import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Typography from '@mui/material/Typography'
import axios from 'axios'
import HeaderBar from '~/components/HeaderBar/HeaderBar'
import SideBar from '~/components/SideBar/SideBar'
import Box from '@mui/material/Box'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import ShareIcon from '@mui/icons-material/Share'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { BACKEND_URI } from '~/API'

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

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue)
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
          height: '530px',
        }}
      >
        {/* Left */}
        <Box sx={{ display: 'flex', boxSizing: 'border-box' }}>
          <Box
            sx={{
              height: '100%',
              flex: 1,
              boxSizing: 'border-box',
              padding: '10px',
              backgroundColor: 'white',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              borderRadius: '10px',
              gap: '10px',
            }}
          >
            <Box sx={{ height: '520px', overflow: 'hidden' }}>
              <img src={product.image} alt={product.name} style={{ height: '100%', objectFit: 'cover' }} />
            </Box>
          </Box>

          {/* Right */}
          <Box sx={{ flex: 1, paddingLeft: '16px' }}>
            <Box
              sx={{
                backgroundColor: 'white',
                boxSizing: 'border-box',
                padding: '10px',
                borderRadius: '10px',
              }}
            >
              <Typography sx={{ color: 'gray', fontSize: '14px' }}>{product.type}</Typography>
              <Typography variant="h6" sx={{ fontWeight: '600' }}>
                {product.name}
              </Typography>
            </Box>
            <Box
              sx={{
                marginTop: '8px',
                backgroundColor: 'white',
                boxSizing: 'border-box',
                padding: '8px',
                borderRadius: '10px',
              }}
            >
              <Tabs
                value={tabIndex}
                onChange={handleTabChange}
                variant="scrollable"
                scrollButtons="auto"
                sx={{ backgroundColor: '#f3f3f3', borderRadius: '10px', marginBottom: '10px' }}
              >
                <Tab label="Description" value="description" />
                <Tab label="Detail" value="detail" />
                <Tab label="Review" value="review" />
                <Tab label="Special" value="special" />
              </Tabs>
              {tabIndex === 'description' && (
                <Box sx={{ padding: '18px', maxHeight: '358px', overflowY: 'auto' }}>
                  <Typography>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Error minima corporis deserunt esse,
                    consequuntur dolor facere tempora commodi itaque maiores illum aperiam cum adipisci voluptatibus
                    quod. Numquam sequi magnam vel! Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
                    minima corporis deserunt esse, consequuntur dolor facere tempora commodi itaque maiores illum
                    aperiam cum adipisci voluptatibus qu od. Numquam sequi magnam vel! Lorem ipsum dolor sit amet
                    consectetur adipisicing elit. Error minima corporis deserunt esse, consequuntur dolor facere tempora
                    commodi itaque maiores illum aperiam cum adipisci voluptatibus quod. Numquam sequi magnam vel! Lorem
                    aperiam cum adipisci voluptatibus qu od. Numquam sequi magnam vel! Lorem ipsum dolor sit amet
                    consectetur adipisicing elit. Error minima corporis deserunt esse, consequuntur dolor facere tempora
                    commodi itaque maiores illum aperiam cum adipisci voluptatibus quod. Numquam sequi magnam vel! Lorem
                  </Typography>
                </Box>
              )}
              {tabIndex === 'detail' && (
                <Box sx={{ padding: '16px' }}>
                  <Typography>{product.detail}</Typography>
                </Box>
              )}
              {tabIndex === 'review' && (
                <Box sx={{ padding: '16px' }}>
                  <Typography>{product.review}</Typography>
                </Box>
              )}
              {tabIndex === 'special' && (
                <Box sx={{ padding: '16px' }}>
                  <Typography>{product.special}</Typography>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          width: 'auto',
          marginLeft: (theme) => theme.other.marginLeftWidth,
          boxSizing: 'border-box',
          padding: '8px',
          backgroundColor: '#f3f3f3',
        }}
      >
        <Box
          sx={{
            boxSizing: 'border-box',
            padding: '8px',
          }}
        ></Box>
      </Box>
      <FixedBar productPrice={product.price} addToCart={addToCart} />
    </Box>
  )
}

const FixedBar = ({ productPrice, addToCart }) => {
  return (
    <Box
      sx={{
        position: 'fixed',
        left: '40%',
        bottom: '10px',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        borderRadius: '60px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '4px',
        boxSizing: 'border-box',
      }}
    >
      <IconButton aria-label="share" sx={{ backgroundColor: 'white' }}>
        <ShareIcon sx={{ height: '18px', width: '18px', color: 'black' }} />
      </IconButton>
      <IconButton aria-label="favorite" sx={{ backgroundColor: 'white' }}>
        <FavoriteIcon sx={{ height: '18px', width: '18px', color: 'black' }} />
      </IconButton>
      <Button
        variant="contained"
        sx={{
          backgroundColor: 'black',
          display: 'flex',
          gap: '50px',
          borderRadius: '60px',
          padding: '4px 6px 4px 12px',
        }}
        onClick={addToCart}
      >
        <Typography variant="h10">Add to Cart</Typography>
        <Box sx={{ backgroundColor: 'white', padding: '4px', borderRadius: '40px' }}>
          <Typography variant="h10" sx={{ color: 'black' }}>
            ${productPrice}
          </Typography>
        </Box>
      </Button>
    </Box>
  )
}

export default ProductPage
