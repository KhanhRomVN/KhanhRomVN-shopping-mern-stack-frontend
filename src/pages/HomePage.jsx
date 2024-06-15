import React, { useEffect, useState } from 'react'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import { useNavigate } from 'react-router-dom'
import HeaderBar from '~/components/HeaderBar/HeaderBar'
import TabUI from '~/components/TabUI/TabUI'
import SideBar from '~/components/SideBar/SideBar'

function HomePage() {
  const [username, setUsername] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const timeout = setTimeout(() => {
      const user = JSON.parse(localStorage.getItem('currentUser'))
      if (user && user.username) {
        setUsername(user.username)
      } else {
        navigate('/login')
      }
      setLoading(false)
    }, 1500)

    return () => clearTimeout(timeout)
  }, [navigate])

  return (
    <Box
      sx={{
        backgroundColor: '#f3f3f3',
        boxSizing: 'border-box',
      }}
    >
      <HeaderBar />
      <SideBar />
      <Box
        sx={{
          width: 'auto',
          marginTop: (theme) => theme.other.headerBarHeight,
          marginLeft: (theme) => theme.other.marginLeftWidth,
          boxSizing: 'border-box',
          padding: '8px',
        }}
      >
        <TabUI product_types={['Fashion', 'Electronics', 'Home Appliances', 'Mother & Baby']} />
      </Box>
    </Box>
  )
}

export default HomePage
