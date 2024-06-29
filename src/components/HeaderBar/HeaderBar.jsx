import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, IconButton, InputBase, Avatar, Divider } from '@mui/material'
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'

const HeaderBar = () => {
  const navigate = useNavigate()

  return (
    <Box>
      <Box
        sx={{
          backgroundColor: '#121212',
          height: '61px',
          position: 'fixed',
          top: 0,
          left: '196px',
          right: 0,
          display: 'flex',
          alignItems: 'center',
          padding: '0 16px',
          boxShadow: 1,
          zIndex: 1100,
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <Box
            sx={{
              position: 'relative',
              borderRadius: 1,
              backgroundColor: '#18171c',
              width: '100%',
              maxWidth: '400px',
              marginLeft: 'auto',
              marginRight: 'auto',
              display: 'flex',
              alignItems: 'center',
              height: '40px',
            }}
          >
            <Box
              sx={{
                padding: '0 16px',
                height: '100%',
                position: 'absolute',
                pointerEvents: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <SearchOutlinedIcon />
            </Box>
            <InputBase
              placeholder="Search…"
              sx={{
                color: 'inherit',
                width: '100%',
                padding: '4px 4px 4px calc(1em + 32px)', // Adjust padding to reduce height
              }}
            />
          </Box>
        </Box>
        <IconButton color="inherit">
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton color="inherit">
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton color="inherit">
          <Avatar alt="User Avatar" src="/static/images/avatar/1.jpg" sx={{ width: '35px', height: '35px' }} />
        </IconButton>
      </Box>
      <Divider />
    </Box>
  )
}

export default HeaderBar
