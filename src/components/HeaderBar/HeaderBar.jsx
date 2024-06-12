import React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import InputBase from '@mui/material/InputBase'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import { Mail as MailIcon, Notifications as NotificationsIcon, Search as SearchIcon } from '@mui/icons-material'
import { styled, alpha } from '@mui/material/styles'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: '20px',
  backgroundColor: alpha(theme.palette.common.black, 0.1),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.15),
  },
  marginLeft: theme.spacing(1),
  width: '440px', // Điều chỉnh độ rộng ở đây
  height: '38px', // Điều chỉnh chiều cao ở đây
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
  const user = JSON.parse(localStorage.getItem('user'))

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          height: '55px',
          justifyContent: 'center',
          backgroundColor: 'white',
          color: 'black',
          boxShadow: 'none', // Loại bỏ box shadow
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" noWrap component="div">
            logo
          </Typography>
          <Search>
            <SearchIcon sx={{ color: 'gray' }} />
            <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
          </Search>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {user ? (
              <>
                <IconButton color="inherit">
                  <MailIcon />
                </IconButton>
                <IconButton color="inherit">
                  <NotificationsIcon />
                </IconButton>
                <Avatar alt="User Avatar" src={user.avatarUrl} />
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
    </>
  )
}

export default HeaderBar
