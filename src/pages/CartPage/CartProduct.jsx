import React from 'react'
import Box from '@mui/material/Box'
import Checkbox from '@mui/material/Checkbox'
import Typography from '@mui/material/Typography'
import DeleteIcon from '@mui/icons-material/Delete'

const CartProduct = ({ product, selectedProducts, handleCheckboxChange, handleDeleteProduct, handleProductClick }) => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '180px',
        backgroundColor: (theme) => theme.palette.backgroundColor.primary,
        display: 'flex',
        boxSizing: 'border-box',
        padding: '6px',
        justifyContent: 'space-between',
        cursor: 'pointer',
      }}
    >
      <Box sx={{ display: 'flex', gap: '12px', alignItems: 'start' }}>
        <Checkbox
          checked={selectedProducts.some((p) => p._id === product._id)}
          onChange={() => handleCheckboxChange(product)}
        />
        <Box
          sx={{ width: '130px', height: '130px', display: 'flex', alignItems: 'center' }}
          onClick={() => handleProductClick(product._id)}
        >
          <img src={product.image} alt={product.name} style={{ width: '100%', objectFit: 'cover' }} />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '350px',
          }}
          onClick={() => handleProductClick(product._id)}
        >
          <Typography variant="h7" sx={{ fontWeight: '600' }}>
            {product.name}
          </Typography>
          <Typography variant="h8">{product.category}</Typography>
          <DeleteIcon
            onClick={(e) => {
              handleDeleteProduct(product._id)
              e.stopPropagation()
            }}
          />
        </Box>
      </Box>
      <Typography sx={{ fontWeight: '600' }}>{product.price}</Typography>
    </Box>
  )
}

export default CartProduct
