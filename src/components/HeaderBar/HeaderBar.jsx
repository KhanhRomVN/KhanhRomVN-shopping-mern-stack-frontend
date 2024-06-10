import React, { useEffect, useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import InputBase from '@mui/material/InputBase'
import Box from '@mui/material/Box'
import { alpha, styled } from '@mui/material/styles'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import Button from '@mui/material/Button'
import SearchIcon from '@mui/icons-material/Search'
import Avatar from '@mui/material/Avatar'
import ModeSelect from '../ModeSelect'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import { useNavigate } from 'react-router-dom' // Import useNavigate

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}))

const checkUserLoggedIn = () => {
  const user = localStorage.getItem('user')
  return !!user // returns true if user is not null, false otherwise
}

const HeaderBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const navigate = useNavigate() // Use useNavigate hook

  useEffect(() => {
    setIsLoggedIn(checkUserLoggedIn())
  }, [])

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleProfileClick = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    const username = user.username
    navigate(`/user/${username}`) // Use navigate function
  }

  const handleSettingClick = () => {
    navigate('/setting') // Use navigate function
  }

  const handleLogout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    navigate('/login') // Use navigate function
  }

  return (
    <AppBar position="fixed">
      <Toolbar
        sx={{
          backgroundColor: (theme) => theme.palette.backgroundColor.secondary,
          color: (theme) => theme.palette.textColor.primary,
        }}
      >
        <Box sx={{ display: 'flex', flexGrow: 1 }}>
          <Typography variant="h6" noWrap component="div" sx={{ marginRight: 2 }}>
            Home
          </Typography>
          <Typography variant="h6" noWrap component="div" sx={{ marginRight: 2 }}>
            Post
          </Typography>
          <Typography variant="h6" noWrap component="div">
            Message
          </Typography>
        </Box>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
        </Search>
        <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: 2 }}>
          <IconButton color="inherit">
            <ShoppingCartIcon />
          </IconButton>
          {isLoggedIn ? (
            <>
              <IconButton onClick={handleMenuOpen}>
                <Avatar alt="User Avatar" src="/static/images/avatar/1.jpg" />
              </IconButton>
              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
                <MenuItem onClick={handleSettingClick}>Setting</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <Button color="inherit" sx={{ fontSize: '14px' }}>
              Login
            </Button>
          )}
          <ModeSelect />
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default HeaderBar
