import React, { useState, useEffect } from 'react'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

const Slider = ({ listImage }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? listImage.length - 1 : prevIndex - 1))
  }

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex === listImage.length - 1 ? 0 : prevIndex + 1))
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === listImage.length - 1 ? 0 : prevIndex + 1))
    }, 3000)

    return () => clearInterval(interval)
  }, [listImage.length])

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <IconButton onClick={handlePrevClick} sx={{ position: 'absolute', left: '10px', zIndex: 1 }}>
        <ArrowBackIosNewIcon />
      </IconButton>
      <Box
        component="a"
        href={listImage[currentIndex].link}
        sx={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          component="img"
          src={listImage[currentIndex].imageUri}
          alt="slider image"
          sx={{
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </Box>
      <IconButton onClick={handleNextClick} sx={{ position: 'absolute', right: '10px', zIndex: 1 }}>
        <ArrowForwardIosIcon />
      </IconButton>
    </Box>
  )
}

export default Slider
