import React from 'react'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import ShareIcon from '@mui/icons-material/Share'
import FavoriteIcon from '@mui/icons-material/Favorite'
import Typography from '@mui/material/Typography'

const FixedBar = ({ productPrice, addToCart }) => {
  return (
    <Box
      sx={{
        position: 'fixed',
        left: '40%',
        bottom: '10px',
        backgroundColor: (theme) => theme.palette.text.secondary,
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
        <Typography variant="button" sx={{ color: 'white' }}>
          Add to Cart
        </Typography>
        <Box sx={{ backgroundColor: 'white', padding: '4px', borderRadius: '40px' }}>
          <Typography variant="button" sx={{ color: 'black' }}>
            ${productPrice}
          </Typography>
        </Box>
      </Button>
    </Box>
  )
}

export default FixedBar
