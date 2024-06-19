import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import InputBase from '@mui/material/InputBase'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { Mail as MailIcon, Notifications as NotificationsIcon, Search as SearchIcon } from '@mui/icons-material'
import { styled } from '@mui/material/styles'
import axios from 'axios'
import { BACKEND_URI } from '~/API'
import ModeSelect from '../ModeSelect'

const textColorPrimary = (theme) => theme.palette.textColor.primary

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1),
    transition: theme.transitions.create('width'),
    width: '440px',
  },
}))

const HeaderBar = () => {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('currentUser'))
  const [anchorEl, setAnchorEl] = useState(null)
  const [searchResults, setSearchResults] = useState([])
  const [searchInput, setSearchInput] = useState('')
  const open = Boolean(anchorEl)

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken')

      await axios.post(
        `${BACKEND_URI}/auth/logout`,
        {},
        {
          headers: {
            accessToken: accessToken,
          },
        },
      )
      localStorage.removeItem('currentUser')
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')

      navigate('/login')
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }

  const handleSearchInputChange = async (event) => {
    const input = event.target.value
    setSearchInput(input)

    if (input) {
      try {
        const response = await axios.get(`${BACKEND_URI}/user/get-all-friend`)
        const filteredResults = response.data.filter(
          (friend) =>
            friend.username.toLowerCase().includes(input.toLowerCase()) ||
            friend.email.toLowerCase().includes(input.toLowerCase()),
        )
        setSearchResults(filteredResults)
      } catch (error) {
        console.error('Error fetching search results:', error)
      }
    } else {
      setSearchResults([])
    }
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
        <Box sx={{ height: '48%' }}>
          <img
            src="https://i.ibb.co/qYVGwzH/logo-light.png"
            alt="logo"
            style={{ objectFit: 'cover', height: '100%' }}
          />
          {/* <img src="https://i.ibb.co/R4Ccckw/logo-dark.png" alt="logo" style={{ objectFit: 'cover', height: '100%' }} /> */}
        </Box>
        <Box
          sx={{
            position: 'relative',
            border: `1px solid ${textColorPrimary}`,
            borderRadius: '20px',
            width: '440px',
            height: '38px',
            display: 'flex',
            alignItems: 'center',
            padding: '0 10px',
          }}
        >
          <SearchIcon sx={{ color: 'gray' }} />
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
            value={searchInput}
            onChange={handleSearchInputChange}
          />
          {searchResults.length > 0 && (
            <Box
              sx={{
                position: 'absolute',
                top: '40px',
                width: '100%',
                maxHeight: '300px',
                overflowY: 'auto',
                backgroundColor: (theme) => theme.palette.backgroundColor.secondary,
                boxShadow: 1,
                zIndex: 1,
              }}
            >
              {searchResults.map((result) => (
                <MenuItem key={result.username} onClick={() => navigate(`/profile/${result.username}`)}>
                  {result.username}
                </MenuItem>
              ))}
            </Box>
          )}
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
            <ModeSelect />
            <MenuItem onClick={() => navigate('/')}>Home</MenuItem>
            <MenuItem onClick={() => navigate(`/profile/${user.username}`)}>Profile</MenuItem>
            <MenuItem onClick={() => navigate('/setting')}>Settings</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
      <Divider />
    </AppBar>
  )
}

export default HeaderBar
