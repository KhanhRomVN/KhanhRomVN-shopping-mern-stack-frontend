import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Container, TextField, Button, Box, Typography, Alert } from '@mui/material'
import axios from 'axios'
import { loginAPI } from '~/API'

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const navigate = useNavigate()

  const handleLogin = async () => {
    try {
      const response = await axios.post(loginAPI, {
        email,
        password,
      })
      const { accessToken, refreshToken, user } = response.data

      // Lưu dữ liệu vào localStorage
      localStorage.setItem('accessToken', accessToken)
      localStorage.setItem('refreshToken', refreshToken)
      localStorage.setItem('user', JSON.stringify(user))

      setSuccess('Login successful!')
      setError('')

      // Chuyển hướng tới trang chủ
      navigate('/')
    } catch (err) {
      setError('Login failed. Please check your email and password.')
      setSuccess('')
    }
  }

  return (
    <Container maxWidth="xs">
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh">
        <Typography variant="h4" gutterBottom>
          Login Page
        </Typography>
        <TextField
          label="Email"
          variant="outlined"
          margin="normal"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          margin="normal"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}
        <Button variant="contained" color="primary" onClick={handleLogin} fullWidth>
          Login
        </Button>
        <Box mt={2}>
          <Typography variant="body1">
            Don't have an account?{' '}
            <Link to="/register" style={{ textDecoration: 'none', color: 'blue', cursor: 'pointer' }}>
              Register
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  )
}

export default LoginPage
