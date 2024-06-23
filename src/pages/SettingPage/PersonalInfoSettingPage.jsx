import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import axios from 'axios'
import { BACKEND_URI } from '~/API'
import SettingSideBar from './SettingSideBar'

const PersonalInfoSettingPage = () => {
  const [userData, setUserData] = useState(null)
  const currentUser = JSON.parse(localStorage.getItem('currentUser'))
  const username = currentUser.username

  useEffect(() => {
    const getUserDetail = async (username) => {
      try {
        const response = await axios.post(`${BACKEND_URI}/user/user-detail`, { username })
        if (response.status === 200) {
          setUserData(response.data)
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
  }, [username])

  if (!userData) {
    return <Typography>Loading...</Typography>
  }

  return (
    <Box
      sx={{
        width: '920px',
        backgroundColor: (theme) => theme.palette.backgroundColor.secondary,
        boxSizing: 'border-box',
        padding: '0 10px 0px 10px',
      }}
    >
      <Box
        sx={{
          width: '100%',
          backgroundColor: (theme) => theme.palette.backgroundColor.primary,
          display: 'flex',
          flexDirection: 'column',
          boxSizing: 'border-box',
          padding: '16px',
          gap: '16px',
        }}
      >
        <Typography variant="h6">Personal Setting</Typography>
        <Typography variant="subtitle1">Profile Picture</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar src={userData.avatar_uri} sx={{ width: 80, height: 80 }} />
          <Button variant="contained">Change Picture</Button>
          <Button variant="outlined" color="error">
            Delete Picture
          </Button>
        </Box>
        <Typography variant="subtitle1" sx={{ marginTop: 2 }}>
          Profile
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ display: 'flex' }}>
            <TextField label="Username" value={userData.username} fullWidth />
            <TextField label="Role" value={userData.role} fullWidth />
          </Box>
          <TextField label="Name" value={userData.name} fullWidth />
          <TextField label="Email" value={userData.email} fullWidth />
          <TextField label="About" value={userData.about} fullWidth />
          <TextField label="Address" value={userData.address} fullWidth />
        </Box>
      </Box>
    </Box>
  )
}

export default PersonalInfoSettingPage
