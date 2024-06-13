import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import InputBase from '@mui/material/InputBase'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { Mail as MailIcon, Notifications as NotificationsIcon, Search as SearchIcon } from '@mui/icons-material'
import { styled, alpha } from '@mui/material/styles'
const logo = '../../../public/images/logo.png'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: '20px',
  color: 'black',
  backgroundColor: alpha(theme.palette.common.black, 0.1),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.15),
  },
  marginLeft: theme.spacing(1),
  width: '440px',
  height: '38px',
  display: 'flex',
  alignItems: 'center',
  padding: '0 10px',
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}))

const HeaderBar = () => {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user'))
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    navigate('/login')
  }

  return (
    <AppBar
      position="fixed"
      sx={{
        height: '55px',
        justifyContent: 'center',
        backgroundColor: (theme) => theme.palette.backgroundColor.primary,
        boxShadow: 'none',
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* <Typography variant="h6" noWrap component="div">
            logo
          </Typography> */}
        <Box sx={{ height: '48%' }}>
          <img src={logo} alt="logo" style={{ objectFit: 'cover', height: '100%' }} />
        </Box>
        <Search>
          <SearchIcon sx={{ color: 'gray' }} />
          <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
        </Search>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {user ? (
            <>
              <IconButton color="inherit">
                <MailIcon
                  sx={{
                    color: (theme) => theme.palette.textColor.secondary,
                  }}
                />
              </IconButton>
              <IconButton color="inherit">
                <NotificationsIcon
                  sx={{
                    color: (theme) => theme.palette.textColor.secondary,
                  }}
                />
              </IconButton>
              <IconButton onClick={handleMenu}>
                <Avatar alt="User Avatar" src={user.avatarUrl} sx={{ width: '30px', height: '30px' }} />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                  style: {
                    transformY: '1px',
                  },
                }}
              >
                <MenuItem onClick={() => navigate('/profile')}>Profile</MenuItem>
                <MenuItem onClick={() => navigate('/setting')}>Settings</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <Button
              color="inherit"
              onClick={() => {
                // Logic for Login
              }}
            >
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
      <Divider />
    </AppBar>
  )
}

export default HeaderBar
