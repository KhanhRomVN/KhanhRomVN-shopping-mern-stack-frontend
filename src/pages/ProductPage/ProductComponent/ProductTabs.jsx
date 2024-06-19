import React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TabContent from './TabContent'

const ProductTabs = ({ tabIndex, setTabIndex, product }) => {
  const handleTabChange = (value) => {
    setTabIndex(value)
  }

  return (
    <Box
      sx={{
        width: '100%',
        height: '435px',
        backgroundColor: (theme) => theme.palette.background.default,
        borderRadius: '8px',
        boxSizing: 'border-box',
        padding: '6px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          gap: '10px',
          marginBottom: '10px',
        }}
      >
        {['description', 'review'].map((tab) => (
          <Button
            key={tab}
            variant={tabIndex === tab ? 'contained' : 'outlined'}
            onClick={() => handleTabChange(tab)}
            sx={{
              backgroundColor: tabIndex === tab ? '#e15a15' : 'white',
              color: tabIndex === tab ? 'white' : '#e15a15',
              '&:hover': {
                backgroundColor: 'white',
                color: '#e15a15',
                borderColor: '#e15a15',
              },
            }}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </Button>
        ))}
      </Box>
      <TabContent tabIndex={tabIndex} product={product} />
    </Box>
  )
}

export default ProductTabs
