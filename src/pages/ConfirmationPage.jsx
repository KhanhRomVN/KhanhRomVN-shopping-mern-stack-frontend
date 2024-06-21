import { useEffect, useState } from 'react'
import axios from 'axios'
import { Container, Typography, CircularProgress, Box, Button } from '@mui/material'
import { BACKEND_URI } from '~/API'
import { useNavigate } from 'react-router-dom'

const ConfirmationPage = () => {
  const token = localStorage.getItem('emailToken')
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const confirmEmail = async () => {
      try {
        const response = await axios.post(`${BACKEND_URI}/auth/confirmation`, { emailToken: token })
        setLoading(false)
        console.log(response.data.message)
        localStorage.removeItem('emailToken')
        navigate('/login')
      } catch (error) {
        setLoading(false)
        setError('Email confirmation failed')
        console.error('Email confirmation error:', error)
      }
    }

    confirmEmail()
  }, [navigate])

  return (
    <Container maxWidth="sm">
      <Box sx={{ marginTop: '2rem', textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Confirmation Page
        </Typography>
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Typography variant="body1" color="error">
            {error}
          </Typography>
        ) : (
          <Typography variant="body1" color="primary">
            Email confirmed successfully. You will be redirected to login page shortly...
          </Typography>
        )}
        <Button variant="contained" color="primary" onClick={() => navigate('/login')} disabled={loading || !error}>
          Go to Login
        </Button>
      </Box>
    </Container>
  )
}

export default ConfirmationPage
