import React, { useState } from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

const CircularButton = styled(Button)(({ theme }) => ({
  padding: '4px 20px',
  borderRadius: '20px',
  marginRight: '15px',
  color: theme.palette.textColor.primary,
  border: `1px solid ${theme.palette.textColor.primary}`,
  '&:hover': {
    border: `1px solid ${theme.palette.textColor.secondary}`,
  },
}))

const TabUI = () => {
  const [value, setValue] = useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Box sx={{ width: '100%', backgroundColor: '#fff' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          paddingBottom: '15px',
        }}
      >
        <CircularButton onClick={(event) => handleChange(event, 0)} {...a11yProps(0)}>
          page 1
        </CircularButton>
        <CircularButton onClick={(event) => handleChange(event, 1)} {...a11yProps(1)}>
          page 2
        </CircularButton>
        <CircularButton onClick={(event) => handleChange(event, 2)} {...a11yProps(2)}>
          page 3
        </CircularButton>
        <CircularButton onClick={(event) => handleChange(event, 3)} {...a11yProps(3)}>
          page 4
        </CircularButton>
        <CircularButton onClick={(event) => handleChange(event, 4)} {...a11yProps(4)}>
          page 5
        </CircularButton>
        <CircularButton onClick={(event) => handleChange(event, 5)} {...a11yProps(5)}>
          Icon
        </CircularButton>
      </Box>
      <TabPanel value={value} index={0}>
        Item One Content
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two Content
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three Content
      </TabPanel>
      <TabPanel value={value} index={3}>
        Item Four Content
      </TabPanel>
      <TabPanel value={value} index={4}>
        Item Five Content
      </TabPanel>
    </Box>
  )
}

export default TabUI
