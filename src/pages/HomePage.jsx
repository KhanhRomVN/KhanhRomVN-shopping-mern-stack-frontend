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
        width: 'auto',
        marginTop: (theme) => theme.other.headerBarHeight,
        marginLeft: (theme) => theme.other.marginLeftWidth,
        boxSizing: 'border-box',
        padding: '8px',
      }}
    >
      <Box sx={{ width: '100%', height: '320px', backgroundColor: (theme) => theme.palette.backgroundColor.primary }}>
        Đây là phần banner(nhưng tôi lười import ảnh vào)
      </Box>
      <TabUI product_types={['Fashion', 'Electronics', 'Home Appliances', 'Mother & Baby']} />
    </Box>
  )
}

export default HomePage
