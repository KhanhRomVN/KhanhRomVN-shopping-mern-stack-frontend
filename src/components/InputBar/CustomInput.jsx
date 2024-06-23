import React from 'react'
import { Box, Typography, InputBase } from '@mui/material'

const CustomInput = ({ label, type = 'text', sx, ...props }) => (
  <Box sx={{ marginBottom: '16px', ...sx }}>
    <Typography sx={{ marginBottom: '4px', fontSize: '14px' }}>{label}</Typography>
    <InputBase
      type={type}
      sx={{
        width: '100%',
        padding: '4px 18px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        '&:focus': {
          borderColor: 'primary.main',
        },
      }}
      {...props}
    />
  </Box>
)

export default CustomInput
