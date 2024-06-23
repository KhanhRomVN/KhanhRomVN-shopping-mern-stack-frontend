import React, { useState } from 'react'
import { Box, Button, Typography } from '@mui/material'
import CustomInput from '~/components/InputBar/CustomInput'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { BACKEND_URI } from '~/API'
import { useParams } from 'react-router-dom'

const gradientBackgroundUri = 'https://i.ibb.co/HFMBf1q/Orange-And-White-Gradient-Background.jpg'

const RegisterPage = () => {
  const { email } = useParams()
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleRegister = async () => {
    try {
      const response = await axios.post(`${BACKEND_URI}/auth/register`, { email, username, password })
      console.log(response.data)
      navigate('/login')
    } catch (error) {
      console.error('Error registering user:', error)
    }
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
          <Typography sx={{ fontSize: '13px' }}>Please enter username and password to access the website</Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            bgcolor: (theme) => theme.palette.backgroundColor.secondary,
            padding: '14px',
          }}
        >
          <CustomInput label="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <CustomInput
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            variant="contained"
            onClick={handleRegister}
            sx={{
              marginTop: '10px',
              backgroundColor: (theme) => theme.other.primaryColor,
              color: (theme) => theme.palette.textColor.primary,
            }}
          >
            Register
          </Button>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', marginTop: '4px', gap: '6px' }}>
        <Typography sx={{ color: (theme) => theme.palette.textColor.secondary }}>Already have an account?</Typography>
        <Typography sx={{ color: (theme) => theme.other.primaryColor }}>Login here</Typography>
      </Box>
    </Box>
  )
}

export default RegisterPage
