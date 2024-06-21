import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import LockIcon from '@mui/icons-material/Lock'
import SettingsIcon from '@mui/icons-material/Settings'
import SecurityIcon from '@mui/icons-material/Security'
import LanguageIcon from '@mui/icons-material/Language'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import axios from 'axios'
import { BACKEND_URI } from '~/API'

const ProfileSettingPage = () => {
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
        width: 'auto',
        marginTop: (theme) => theme.other.headerBarHeight,
        marginLeft: (theme) => theme.other.marginLeftWidth,
        boxSizing: 'border-box',
        padding: '8px',
        display: 'flex',
      }}
    >
      <Box
        sx={{
          width: '320px',
          height: '540px',
          backgroundColor: (theme) => theme.palette.backgroundColor.primary,
          boxSizing: 'border-box',
          padding: '10px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            gap: '10px',
            alignItems: 'center',
            backgroundColor: (theme) => theme.palette.backgroundColor.secondary,
            padding: '10px',
          }}
        >
          <AccountCircleIcon sx={{ width: '30px', height: '30px' }} />
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography sx={{ fontSize: '16px' }}>Profile</Typography>
            <Typography sx={{ fontSize: '12px' }}>Picture, Name, Description...</Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            gap: '10px',
            alignItems: 'center',
            backgroundColor: (theme) => theme.palette.backgroundColor.secondary,
            padding: '10px',
          }}
        >
          <LockIcon sx={{ width: '30px', height: '30px' }} />
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography sx={{ fontSize: '16px' }}>Privacy</Typography>
            <Typography sx={{ fontSize: '12px' }}>Message, Account, Blocked</Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            gap: '10px',
            alignItems: 'center',
            backgroundColor: (theme) => theme.palette.backgroundColor.secondary,
            padding: '10px',
          }}
        >
          <SettingsIcon sx={{ width: '30px', height: '30px' }} />
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography sx={{ fontSize: '16px' }}>Preferences</Typography>
            <Typography sx={{ fontSize: '12px' }}>Content, Backup</Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            gap: '10px',
            alignItems: 'center',
            backgroundColor: (theme) => theme.palette.backgroundColor.secondary,
            padding: '10px',
          }}
        >
          <SecurityIcon sx={{ width: '30px', height: '30px' }} />
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography sx={{ fontSize: '16px' }}>Security</Typography>
            <Typography sx={{ fontSize: '12px' }}>Data, Password, Authentication</Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            gap: '10px',
            alignItems: 'center',
            backgroundColor: (theme) => theme.palette.backgroundColor.secondary,
            padding: '10px',
          }}
        >
          <LanguageIcon sx={{ width: '30px', height: '30px' }} />
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography sx={{ fontSize: '16px' }}>Language</Typography>
            <Typography sx={{ fontSize: '12px' }}>English, Vietnam</Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          width: '820px',
          height: '540px',
          backgroundColor: (theme) => theme.palette.backgroundColor.secondary,
          boxSizing: 'border-box',
          padding: '0 10px 0px 10px',
        }}
      >
        <Box
          sx={{
            width: '100%',
            height: '100%',
            backgroundColor: (theme) => theme.palette.backgroundColor.primary,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Typography variant="h6">Profile Setting</Typography>
          <Typography variant="subtitle1">Profile Avatar</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar src={userData.avatar_uri} sx={{ width: 80, height: 80 }} />
            <Button variant="contained">Change Picture</Button>
            <Button variant="outlined" color="error">
              Delete Picture
            </Button>
          </Box>
          <Typography variant="subtitle1" sx={{ marginTop: 2 }}>
            Profile Data
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField label="Username" value={userData.username} fullWidth />
            <TextField label="Email" value={userData.email} fullWidth />
            <TextField label="Role" value={userData.role} fullWidth />
            <TextField label="Name" value={userData.name} fullWidth />
            <TextField label="About" value={userData.about} fullWidth />
            <TextField label="Address" value={userData.address} fullWidth />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default ProfileSettingPage
