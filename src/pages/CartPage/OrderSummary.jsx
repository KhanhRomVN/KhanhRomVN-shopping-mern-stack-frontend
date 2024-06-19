import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { Divider } from '@mui/material'

const OrderSummary = ({ selectedProducts, totalPrice, handleCheckout }) => {
  return (
    <Box
      sx={{
        width: '400px',
        backgroundColor: (theme) => theme.palette.backgroundColor.primary,
        boxSizing: 'border-box',
        padding: '18px',
        borderRadius: '8px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography sx={{ fontWeight: '600' }}>Order Summary</Typography>
      <Divider sx={{ my: '10px' }} />
      {selectedProducts.map((product) => (
        <Box key={product._id} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography>{product.name}</Typography>
          <Typography>{product.price}</Typography>
        </Box>
      ))}
      <Divider sx={{ my: '10px' }} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography>Total</Typography>
        <Typography>{totalPrice}</Typography>
      </Box>
      <Divider sx={{ my: '10px' }} />
      <Button variant="contained" color="primary" onClick={handleCheckout} disabled={selectedProducts.length === 0}>
        Checkout
      </Button>
      <Typography variant="h8" sx={{ marginTop: 2 }}>
        Other Payment Method:
      </Typography>
      <Button variant="contained" color="primary" sx={{ marginTop: 1 }}>
        Momo
      </Button>
      <Button variant="contained" color="primary" sx={{ marginTop: 1 }}>
        VNPay
      </Button>
    </Box>
  )
}

export default OrderSummary
