import React, { useState } from 'react'
import { Container, Grid, TextField, Button, Typography, Box, Select, MenuItem, Alert } from '@mui/material'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { BACKEND_URI } from '~/API'

const RegisterPage = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [gender, setGender] = useState('')
  const [emailSent, setEmailSent] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    const userData = { username, email, password, name, age, gender }
    try {
      const response = await axios.post(`${BACKEND_URI}/auth/register`, userData)
      console.log('Registration successful:', response.data.message)
      console.log(response.data.emailToken)
      localStorage.setItem('emailToken', response.data.emailToken)
      setEmailSent(true)
      setError('')
    } catch (error) {
      console.error('Error registering user:', error)
      setEmailSent(false)
      setError('Error registering user')
    }
  }

  return (
    <Box sx={{ width: '100vw', height: '100vh', display: 'flex' }}>
      <Box sx={{ width: '50%', height: '100%', backgroundColor: 'red' }}></Box>
      <Box sx={{ width: '50%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Container maxWidth="sm">
          <Typography variant="h4" gutterBottom align="center">
            Register
          </Typography>
          {emailSent && (
            <Alert severity="success">
              A confirmation email has been sent to your email address. Please check your inbox to verify your account.
            </Alert>
          )}
          {error && <Alert severity="error">{error}</Alert>}
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Username"
                  variant="outlined"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  variant="outlined"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  variant="outlined"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Name"
                  variant="outlined"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Age"
                  type="number"
                  variant="outlined"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <Select
                  fullWidth
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  displayEmpty
                  renderValue={(selected) => {
                    if (selected.length === 0) {
                      return <em>Gender</em>
                    }
                    return selected
                  }}
                >
                  <MenuItem value="">
                    <em>Gender</em>
                  </MenuItem>
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  sx={{
                    borderRadius: '20px',
                    backgroundColor: (theme) => theme.palette.backgroundColor.primary,
                  }}
                >
                  Register
                </Button>
              </Grid>
            </Grid>
          </form>
        </Container>
      </Box>
    </Box>
  )
}

export default RegisterPage
