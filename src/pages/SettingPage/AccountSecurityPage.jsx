import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'
import axios from 'axios'
import { BACKEND_URI } from '~/API'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useSnackbar } from 'notistack'

const AccountSecurityPage = () => {
  const { enqueueSnackbar } = useSnackbar()

  const [userData, setUserData] = useState(null)
  const [editData, setEditData] = useState({})
  const [error, setError] = useState(null)
  const currentUser = JSON.parse(localStorage.getItem('currentUser'))
  const accessToken = localStorage.getItem('accessToken')
  const username = currentUser.username

  useEffect(() => {
    const getUserDetail = async (username) => {
      try {
        const response = await axios.post(
          `${BACKEND_URI}/user/user-detail`,
          { username },
          {
            headers: {
              'Content-Type': 'application/json',
              accessToken: accessToken,
            },
          },
        )
        if (response.status === 200) {
          setUserData(response.data)
          setEditData(response.data) // Initialize editData with fetched data
        } else {
          console.error('Failed to fetch user details:', response.statusText)
        }
      } catch (error) {
        console.error('Error fetching user details:', error)
      }
    }

    if (username) {
      getUserDetail(username)
    }
  }, [username, accessToken])

  const handleChange = (field) => (event) => {
    setEditData({
      ...editData,
      [field]: event.target.value,
    })
  }

  const handleUpdate = async (field) => {
    const apiEndpoints = {
      username: `${BACKEND_URI}/user/update-username`,
      email: `${BACKEND_URI}/user/update-email`,
      name: `${BACKEND_URI}/user/update-name`,
      age: `${BACKEND_URI}/user/update-age`,
      gender: `${BACKEND_URI}/user/update-gender`,
      about: `${BACKEND_URI}/user/update-about`,
      phoneNumber: `${BACKEND_URI}/user/update-phone`,
      address: `${BACKEND_URI}/user/update-address`,
    }

    const apiEndpoint = apiEndpoints[field]

    try {
      const response = await axios.post(
        apiEndpoint,
        {
          [field]: editData[field],
        },
        {
          headers: {
            accessToken: accessToken,
          },
        },
      )

      if (response.status === 200) {
        setUserData({
          ...userData,
          [field]: editData[field],
        })
        enqueueSnackbar('Update successful', { variant: 'success' })
      } else {
        setError(`Failed to update ${field}: ${response.statusText}`)
        enqueueSnackbar(`Failed to update ${field}: ${response.statusText}`, { variant: 'error' })
      }
    } catch (error) {
      setError(`Error updating ${field}: ${error.message}`)
      enqueueSnackbar(`Error updating ${field}: ${error.message}`, { variant: 'error' })
    }
  }

  if (!userData) {
    return <Typography>Loading...</Typography>
  }

  return (
    <Box sx={{ width: '100%' }}>
      <ToastContainer />
      <Card sx={{ maxWidth: 920, margin: 'auto' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Personal Setting
          </Typography>
          {error && <Typography color="error">{error}</Typography>}
          <Typography variant="subtitle1" gutterBottom>
            Profile Picture
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, marginBottom: 3 }}>
            <Avatar src={userData.avatar_uri} sx={{ width: 80, height: 80 }} />
            <Button variant="contained">Change Picture</Button>
            <Button variant="outlined" color="error">
              Delete Picture
            </Button>
          </Box>
          <Typography variant="subtitle1" gutterBottom>
            Profile
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} sx={{ display: 'flex', alignItems: 'center' }}>
              <TextField
                label="Username"
                value={editData.username}
                fullWidth
                size="small"
                onChange={handleChange('username')}
              />
              {editData.username !== userData.username && (
                <Button variant="contained" onClick={() => handleUpdate('username')} sx={{ marginLeft: 1 }}>
                  Update
                </Button>
              )}
            </Grid>
            <Grid item xs={12} sm={6} sx={{ display: 'flex', alignItems: 'center' }}>
              <TextField
                select
                label="Role"
                value={editData.role}
                fullWidth
                size="small"
                onChange={handleChange('role')}
              >
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="user">User</MenuItem>
                <MenuItem value="moderator">Moderator</MenuItem>
              </TextField>
              {editData.role !== userData.role && (
                <Button variant="contained" onClick={() => handleUpdate('role')} sx={{ marginLeft: 1 }}>
                  Update
                </Button>
              )}
            </Grid>
            <Grid item xs={12} sm={6} sx={{ display: 'flex', alignItems: 'center' }}>
              <TextField label="Name" value={editData.name} fullWidth size="small" onChange={handleChange('name')} />
              {editData.name !== userData.name && (
                <Button variant="contained" onClick={() => handleUpdate('name')} sx={{ marginLeft: 1 }}>
                  Update
                </Button>
              )}
            </Grid>
            <Grid item xs={12} sm={6} sx={{ display: 'flex', alignItems: 'center' }}>
              <TextField label="Email" value={editData.email} fullWidth size="small" onChange={handleChange('email')} />
              {editData.email !== userData.email && (
                <Button variant="contained" onClick={() => handleUpdate('email')} sx={{ marginLeft: 1 }}>
                  Update
                </Button>
              )}
            </Grid>
            <Grid item xs={12} sm={6} sx={{ display: 'flex', alignItems: 'center' }}>
              <TextField label="Age" value={editData.age} fullWidth size="small" onChange={handleChange('age')} />
              {editData.age !== userData.age && (
                <Button variant="contained" onClick={() => handleUpdate('age')} sx={{ marginLeft: 1 }}>
                  Update
                </Button>
              )}
            </Grid>
            <Grid item xs={12} sm={6} sx={{ display: 'flex', alignItems: 'center' }}>
              <TextField
                select
                label="Gender"
                value={editData.gender}
                fullWidth
                size="small"
                onChange={handleChange('gender')}
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="prefer_not_to_say">Prefer not to say</MenuItem>
              </TextField>
              {editData.gender !== userData.gender && (
                <Button variant="contained" onClick={() => handleUpdate('gender')} sx={{ marginLeft: 1 }}>
                  Update
                </Button>
              )}
            </Grid>
            <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
              <TextField label="About" value={editData.about} fullWidth size="small" onChange={handleChange('about')} />
              {editData.about !== userData.about && (
                <Button variant="contained" onClick={() => handleUpdate('about')} sx={{ marginLeft: 1 }}>
                  Update
                </Button>
              )}
            </Grid>
            <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
              <TextField
                label="Address"
                value={editData.address}
                fullWidth
                size="small"
                onChange={handleChange('address')}
              />
              {editData.address !== userData.address && (
                <Button variant="contained" onClick={() => handleUpdate('address')} sx={{ marginLeft: 1 }}>
                  Update
                </Button>
              )}
            </Grid>
            <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
              <TextField
                label="Phone number"
                value={editData.phoneNumber}
                fullWidth
                size="small"
                onChange={handleChange('phoneNumber')}
              />
              {editData.phoneNumber !== userData.phoneNumber && (
                <Button variant="contained" onClick={() => handleUpdate('phoneNumber')} sx={{ marginLeft: 1 }}>
                  Update
                </Button>
              )}
            </Grid>
          </Grid>
          <Box sx={{ marginTop: 4 }}>
            <Typography variant="subtitle1">Link Account</Typography>
            <Button variant="contained" color="primary">
              Link with Google
            </Button>
          </Box>
          <Box sx={{ marginTop: 4 }}>
            <Typography variant="subtitle1">Change Password</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField label="Current Password" type="password" fullWidth size="small" />
              <TextField label="New Password" type="password" fullWidth size="small" />
              <TextField label="Confirm New Password" type="password" fullWidth size="small" />
              <Button variant="contained" color="primary">
                Change Password
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}

export default AccountSecurityPage
