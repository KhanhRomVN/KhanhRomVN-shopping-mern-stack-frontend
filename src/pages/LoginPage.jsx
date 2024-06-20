import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Grid, TextField, Button, Box, Typography, Alert } from '@mui/material'
import axios from 'axios'
import { BACKEND_URI } from '~/API'
import { GoogleLogin } from '@react-oauth/google'
import ModeSelect from '~/components/ModeSelect'
import { jwtDecode } from 'jwt-decode'

const loginBG = '/images/public-img4.jpg'

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const navigate = useNavigate()

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${BACKEND_URI}/auth/login`, { email, password })
      const { accessToken, refreshToken, currentUser } = response.data
      localStorage.setItem('accessToken', accessToken)
      localStorage.setItem('refreshToken', refreshToken)
      localStorage.setItem('currentUser', JSON.stringify(currentUser))

      setSuccess('Login successful!')
      setError('')
      navigate('/')
    } catch (err) {
      setError('Login failed. Please check your email and password.')
      setSuccess('')
    }
  }

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential)
      const { email, name, picture, sub } = decoded
      const userData = {
        email,
        name,
        picture,
        sub,
      }
      const response = await axios.post(`${BACKEND_URI}/auth/login/google`, userData)
      const { accessToken, refreshToken, currentUser } = response.data
      localStorage.setItem('accessToken', accessToken)
      localStorage.setItem('refreshToken', refreshToken)
      localStorage.setItem('currentUser', JSON.stringify(currentUser))

      let localStorageCurrentUser = JSON.parse(localStorage.getItem('currentUser'))
      if (!localStorageCurrentUser.username) {
        const username = prompt('Please enter your username:')
        if (username) {
          const updateResponse = await axios.post(
            `${BACKEND_URI}/user/update-username`,
            { username },
            {
              headers: {
                'Content-Type': 'application/json',
                accessToken,
              },
            },
          )
          localStorageCurrentUser.username = updateResponse.data.username
          localStorage.setItem('currentUser', JSON.stringify(localStorageCurrentUser))
        } else {
          setError('Username is required.')
          return
        }
      }

      setSuccess('Login successful!')
      setError('')
      navigate('/')
    } catch (err) {
      setError('Google login failed.')
      setSuccess('')
    }
  }

  const handleGoogleLoginError = () => {
    setError('Google login failed.')
    setSuccess('')
  }

  return (
    <>
      <div style={{ position: 'fixed', top: 16, right: 16, zIndex: 1000 }}>
        <ModeSelect />
      </div>
      <Grid container style={{ minHeight: '100vh' }}>
        <Grid item xs={12} md={7} style={{ position: 'relative', overflow: 'hidden' }}>
          <img
            src={loginBG}
            alt="Login Background"
            style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0 }}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={5}
          container
          alignItems="center"
          justifyContent="center"
          style={{ position: 'relative' }}
        >
          <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" width="80%">
            <Typography variant="h6" gutterBottom style={{ position: 'absolute', top: '15px', left: '15px' }}>
              KR Shop
            </Typography>
            <Typography variant="h5" gutterBottom>
              - Logo -
            </Typography>
            <Box mb={2} width="100%">
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Box>
            <Box mb={2} width="100%">
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Box>
            {error && <Alert severity="error">{error}</Alert>}
            {success && <Alert severity="success">{success}</Alert>}
            <Button
              variant="contained"
              sx={{
                borderRadius: '20px',
                backgroundColor: (theme) => theme.palette.backgroundColor.primary,
              }}
              onClick={handleLogin}
              fullWidth
            >
              Login
            </Button>
            <Box mt={2} width="100%">
              <GoogleLogin
                onSuccess={handleGoogleLoginSuccess}
                onError={handleGoogleLoginError}
                size="large"
                width="100%"
              />
            </Box>
            <Box mt={2}>
              <Typography variant="body1">
                Dont have an account?{' '}
                <Link
                  to="/register"
                  style={{ textDecoration: 'none', cursor: 'pointer' }}
                  sx={{ color: (theme) => theme.palette.backgroundColor.primary }}
                >
                  Register
                </Link>
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  )
}

export default LoginPage
