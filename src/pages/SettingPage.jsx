import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Switch from '@mui/material/Switch'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Container from '@mui/material/Container'
import HeaderBar from '~/components/HeaderBar/HeaderBar'
import SideBar from '~/components/SideBar/SideBar'
import ModeSelect from '~/components/ModeSelect'

const SettingPage = () => {
  const [profileSettings, setProfileSettings] = useState({
    username: '',
    email: '',
    phoneNumber: '',
  })
  const [accountSettings, setAccountSettings] = useState({
    password: '',
    confirmPassword: '',
  })
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
  })

  const handleProfileChange = (e) => {
    const { name, value } = e.target
    setProfileSettings((prev) => ({ ...prev, [name]: value }))
  }

  const handleAccountChange = (e) => {
    const { name, value } = e.target
    setAccountSettings((prev) => ({ ...prev, [name]: value }))
  }

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target
    setNotificationSettings((prev) => ({ ...prev, [name]: checked }))
  }

  const handleSave = () => {
    // Handle save logic
    console.log('Profile Settings:', profileSettings)
    console.log('Account Settings:', accountSettings)
    console.log('Notification Settings:', notificationSettings)
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>
      <Box component="form" sx={{ mt: 3 }}>
        <Typography variant="h6">Profile Settings</Typography>
        <TextField
          fullWidth
          margin="normal"
          label="Username"
          name="username"
          value={profileSettings.username}
          onChange={handleProfileChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Email"
          name="email"
          value={profileSettings.email}
          onChange={handleProfileChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Phone Number"
          name="phoneNumber"
          value={profileSettings.phoneNumber}
          onChange={handleProfileChange}
        />
        <Divider sx={{ my: 4 }} />

        <Typography variant="h6">Account Settings</Typography>
        <TextField
          fullWidth
          margin="normal"
          label="New Password"
          type="password"
          name="password"
          value={accountSettings.password}
          onChange={handleAccountChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          value={accountSettings.confirmPassword}
          onChange={handleAccountChange}
        />
        <Divider sx={{ my: 4 }} />

        <Typography variant="h6">Notification Settings</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Typography>Email Notifications</Typography>
          <Switch
            name="emailNotifications"
            checked={notificationSettings.emailNotifications}
            onChange={handleNotificationChange}
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Typography>SMS Notifications</Typography>
          <Switch
            name="smsNotifications"
            checked={notificationSettings.smsNotifications}
            onChange={handleNotificationChange}
          />
        </Box>
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save Changes
        </Button>
        <ModeSelect />
      </Box>
    </Container>
  )
}

export default SettingPage
