import React, { useState } from 'react'
import { Button, Box, Typography, Snackbar, Alert } from '@mui/material'
import CustomInput from '~/components/InputBar/CustomInput'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { BACKEND_URI } from '~/API'
import { GoogleLogin } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode'

const gradientBackgroundUri = 'https://i.ibb.co/HFMBf1q/Orange-And-White-Gradient-Background.jpg'

const EmailPage = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [showOTPInput, setShowOTPInput] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [showSnackbar, setShowSnackbar] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleEmailSubmit = async () => {
    try {
      const response = await axios.post(`${BACKEND_URI}/auth/email-verify`, { email })
      console.log(response.data)
      setShowOTPInput(true)
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage('Email này đã được đăng ký')
        setShowSnackbar(true)
        setTimeout(() => {
          setShowSnackbar(false)
          navigate('/login')
        }, 3000)
      } else {
        console.error('Error sending email verification:', error)
      }
    }
  }

  const handleOTPSubmit = async () => {
    try {
      const response = await axios.post(`${BACKEND_URI}/auth/email-otp-verify`, { email, otp })
      console.log(response.data)
      navigate(`/register/${email}`)
    } catch (error) {
      console.error('Error verifying OTP:', error)
    }
  }

  const navigateToLogin = async () => {
    navigate('/login')
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
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: `url(${gradientBackgroundUri})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          bgcolor: (theme) => theme.palette.backgroundColor.primary,
          borderRadius: 2,
          padding: '6px',
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2px', padding: '14px' }}>
          <Box sx={{ width: '100%', height: '35px' }}>
            <img
              src="https://i.postimg.cc/jd0dTYF1/logo.png"
              alt="logo"
              style={{ objectFit: 'cover', height: '100%' }}
            />
          </Box>
          <Typography sx={{ fontSize: '22px' }}>Welcome to Saleso!</Typography>
          <Typography sx={{ fontSize: '13px' }}>Create an account to experience many new things</Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            bgcolor: (theme) => theme.palette.backgroundColor.secondary,
            padding: '14px',
          }}
        >
          <CustomInput label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          {showOTPInput && (
            <CustomInput label="OTP" type="password" value={otp} onChange={(e) => setOtp(e.target.value)} />
          )}
          <Button
            variant="contained"
            onClick={showOTPInput ? handleOTPSubmit : handleEmailSubmit}
            sx={{
              marginTop: '10px',
              backgroundColor: (theme) => theme.other.primaryColor,
              color: (theme) => theme.palette.textColor.primary,
            }}
          >
            {showOTPInput ? 'Verify OTP' : 'Register'}
          </Button>
          <Box sx={{ width: '100%', marginTop: '10px', display: 'flex', justifyContent: 'center' }}>
            <GoogleLogin onSuccess={handleGoogleLoginSuccess} onError={handleGoogleLoginError} sx={{ width: '100%' }} />
          </Box>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', marginTop: '4px', gap: '6px' }}>
        <Typography sx={{ color: (theme) => theme.palette.textColor.secondary }}>Already have an account?</Typography>
        <Typography sx={{ color: (theme) => theme.other.primaryColor, cursor: 'pointer' }} onClick={navigateToLogin}>
          Login here
        </Typography>
      </Box>
      <Snackbar open={showSnackbar} autoHideDuration={3000}>
        <Alert severity="error" sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default EmailPage
