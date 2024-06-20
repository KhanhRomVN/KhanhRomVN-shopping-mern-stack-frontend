import React, { useEffect, useState } from 'react'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import { useNavigate } from 'react-router-dom'
import TabUI from '~/components/TabUI/TabUI'
import Slider from '~/components/Slider/Slider'
import { Typography } from '@mui/material'
import ProductLayout_5x10 from '~/components/ProductLayout/ProductLayout_5-10'

function HomePage() {
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const timeout = setTimeout(() => {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'))
      if (!currentUser) {
        navigate('/login')
      }
      setLoading(false)
    }, 1500)

    return () => clearTimeout(timeout)
  }, [navigate])

  const listImage = [
    {
      imageUri: 'https://via.placeholder.com/800x400.png?text=Image+1',
      link: '/',
    },
    {
      imageUri: 'https://via.placeholder.com/800x400.png?text=Image+2',
      link: '/',
    },
    {
      imageUri: 'https://via.placeholder.com/800x400.png?text=Image+3',
      link: '/',
    },
  ]

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
        alignItems: 'center',
        gap: '20px',
      }}
    >
      <Box sx={{ width: '100%', height: '320px', backgroundColor: (theme) => theme.palette.backgroundColor.primary }}>
        <Slider listImage={listImage} />
      </Box>
      <Box
        sx={{
          width: '100%',
          boxSizing: 'border-box',
          padding: '8px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
        }}
      >
        <Typography sx={{ fontSize: '20px' }}>Just For You</Typography>
        <ProductLayout_5x10 />
      </Box>
    </Box>
  )
}

export default HomePage
