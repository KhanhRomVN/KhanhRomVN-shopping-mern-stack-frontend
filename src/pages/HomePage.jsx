import React, { useEffect, useState } from 'react'
import { Container, Typography, Box, Alert, CircularProgress } from '@mui/material'
import { useNavigate } from 'react-router-dom'

function HomePage() {
  const [username, setUsername] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    // Simulate loading delay for better user experience
    const timeout = setTimeout(() => {
      // Lấy thông tin người dùng từ localStorage
      const user = JSON.parse(localStorage.getItem('user'))
      if (user && user.username) {
        setUsername(user.username)
      } else {
        // Nếu không có thông tin người dùng, chuyển hướng đến trang đăng nhập
        navigate('/login')
      }
      setLoading(false)
    }, 1500)

    return () => clearTimeout(timeout)
  }, [navigate])

  return (
    <Container maxWidth="sm" style={{ marginTop: '3rem', textAlign: 'center' }}>
      <Typography variant="h1" style={{ marginBottom: '2rem', fontWeight: 'bold', color: '#1976d2' }}>
        Welcome to Your Dashboard
      </Typography>
      {loading ? (
        <CircularProgress size={48} style={{ marginTop: '1rem' }} />
      ) : (
        <>
          {username ? (
            <Typography
              variant="h2"
              style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem', color: '#f50057' }}
            >
              Hello, {username}!
            </Typography>
          ) : (
            <Alert severity="warning">User data not found.</Alert>
          )}
        </>
      )}
    </Container>
  )
}

export default HomePage
