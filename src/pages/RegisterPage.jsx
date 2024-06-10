import React, { useState } from 'react'
import { Container, Grid, TextField, Button, Typography, Box, Alert } from '@mui/material'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { registerAPI } from '~/API'
import ModeSelect from '~/components/ModeSelect'
const loginBG = '/images/public-img4.jpg'

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    age: '',
    email: '',
    password: '',
    sdt: '',
    address: '',
  })

  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(registerAPI, formData)
      if (response.status === 201) {
        navigate('/login')
      }
    } catch (error) {
      setError(error.response.data.error || 'Registration failed. Please try again.')
    }
  }

  return (
    <>
      <div style={{ position: 'fixed', top: 16, right: 16, zIndex: 1000 }}>
        <ModeSelect />
      </div>
      <Grid container style={{ minHeight: '100vh' }}>
        <Grid item xs={12} md={7} style={{ position: 'relative', overflow: 'hidden' }}>
          <Container maxWidth="sm">
            <Box sx={{ mt: 8 }}>
              <Typography variant="h4" gutterBottom align="center">
                Register Page
              </Typography>
              {error && <Alert severity="error">{error}</Alert>}
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      label="Username"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Age"
                      name="age"
                      type="number"
                      value={formData.age}
                      onChange={handleChange}
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Phone Number"
                      name="sdt"
                      value={formData.sdt}
                      onChange={handleChange}
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                      Register
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Box>
          </Container>
        </Grid>
        <Grid
          item
          xs={12}
          md={5}
          container
          alignItems="center"
          justifyContent="center"
          style={{
            position: 'relative',
          }}
        >
          <img
            src={loginBG}
            alt="Login Background"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              position: 'absolute',
              top: 0,
              left: 0,
            }}
          />
        </Grid>
      </Grid>
    </>
  )
}

export default RegisterPage
