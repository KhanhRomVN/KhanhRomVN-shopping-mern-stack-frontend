import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Slider from '~/components/Slider/Slider'
import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import ProductLayout_5x10 from '~/components/ProductLayout/ProductLayout_5-10'
import { useSnackbar } from 'notistack'

function HomePage() {
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()

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

  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser')
    if (!currentUser) {
      navigate('/login')
      enqueueSnackbar('Please log in to access the homepage', { variant: 'info' })
    }
  }, [navigate, enqueueSnackbar])

  return (
    <Box
      sx={{
        width: 'auto',
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
