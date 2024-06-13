import React, { useState, useEffect } from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import axios from 'axios'
import ProductLayout from '../ProductLayout/ProductLayout'

// Function to transform product type names
const transformTypeName = (name) => {
  return name.toLowerCase().replace(/ & /g, '_').replace(/ /g, '_')
}

const transformTypeNameArray = (product_types) => {
  const arrayAfterTransform = []

  for (let i = 0; i < product_types.length; i++) {
    const transformedName = transformTypeName(product_types[i])
    arrayAfterTransform.push(transformedName)
  }

  return arrayAfterTransform
}

const TabUI = ({ product_types }) => {
  const [selectedTab, setSelectedTab] = useState(0)
  const [data, setData] = useState(null)
  const arrayAfterTransform = transformTypeNameArray(product_types)

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue)
  }

  return (
    <Box
      sx={{
        width: '100%',
        backgroundColor: 'white',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        paddingTop: '16px',
      }}
    >
      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
        {product_types.map((type, index) => (
          <Button
            key={index}
            variant={selectedTab === index ? 'contained' : 'outlined'}
            color="primary"
            onClick={() => setSelectedTab(index)}
          >
            {type}
          </Button>
        ))}
      </Box>
      <Box sx={{ p: 3, width: '100%' }}>
        <ProductLayout type={arrayAfterTransform[selectedTab]} />
      </Box>
    </Box>
  )
}

export default TabUI
