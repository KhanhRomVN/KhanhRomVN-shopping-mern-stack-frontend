import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import ReviewContent from './ReviewContent'

const TabContent = ({ tabIndex, product }) => {
  return (
    <>
      {tabIndex === 'description' && (
        <Box sx={{ padding: '18px', maxHeight: '358px', overflowY: 'auto' }}>
          <Typography sx={{ color: (theme) => theme.palette.text.secondary }}>{product.description}</Typography>
        </Box>
      )}
      {/* {tabIndex === 'detail' && (
        <Box sx={{ padding: '16px' }}>
          <Typography sx={{ color: (theme) => theme.palette.text.secondary }}>{product.detail}</Typography>
        </Box>
      )} */}
      {tabIndex === 'review' && (
        <Box sx={{ padding: '16px' }}>
          <Typography sx={{ color: (theme) => theme.palette.text.secondary }}>
            {<ReviewContent prodId={product._id} />}
          </Typography>
        </Box>
      )}
      {/* {tabIndex === 'special' && (
        <Box sx={{ padding: '16px' }}>
          <Typography sx={{ color: (theme) => theme.palette.text.secondary }}>{product.special}</Typography>
        </Box>
      )} */}
    </>
  )
}

export default TabContent
