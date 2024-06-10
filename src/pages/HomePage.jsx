import React, { useEffect, useState } from 'react'
import Container from '@mui/material/Container'
import { useNavigate } from 'react-router-dom'
import HeaderBar from '~/components/HeaderBar/HeaderBar'
import TabUI from '~/components/TabUI/TabUI'

function HomePage() {
  const [username, setUsername] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const timeout = setTimeout(() => {
      const user = JSON.parse(localStorage.getItem('user'))
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
    <Container
      sx={{
        marginTop: (theme) => theme.other.headerBarHeight,
        textAlign: 'center',
        backgroundColor: 'white',
      }}
    >
      <HeaderBar />
      <TabUI />
    </Container>
  )
}

export default HomePage
