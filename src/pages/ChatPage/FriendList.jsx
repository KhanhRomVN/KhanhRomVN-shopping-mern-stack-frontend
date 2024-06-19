// FriendList.jsx
import React from 'react'
import { Box, TextField, Divider, Typography, Avatar } from '@mui/material'

const FriendList = ({ friendList, handlerClickFriend, searchTerm, setSearchTerm }) => (
  <Box
    sx={{
      display: 'flex',
      width: '350px',
      height: '550px',
      flexDirection: 'column',
      borderRadius: '100px',
    }}
  >
    <Box
      sx={{
        width: '100%',
        height: '42px',
        backgroundColor: (theme) => theme.palette.backgroundColor.primary,
        display: 'flex',
        alignItems: 'center',
        boxSizing: 'border-box',
        padding: '0 10px',
      }}
    >
      <TextField
        fullWidth
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search friends..."
        sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'transparent',
            },
            '&:hover fieldset': {
              borderColor: 'transparent',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'transparent',
            },
          },
        }}
      />
    </Box>
    <Divider />
    <Box
      sx={{
        width: '100%',
        height: '100%',
        backgroundColor: (theme) => theme.palette.backgroundColor.primary,
        boxSizing: 'border-box',
        padding: '10px',
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {friendList.map((friend) => (
          <Box
            key={friend.user_id}
            onClick={() => handlerClickFriend(friend.user_id, friend.username)}
            sx={{ cursor: 'pointer', display: 'flex', gap: '10px', alignItems: 'center' }}
          >
            <Avatar sx={{ width: '32px', height: '32px' }} />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography sx={{ fontSize: '16px' }}>{friend.username}</Typography>
              <Divider />
              <Typography sx={{ fontSize: '14px' }}>Đây Là last message</Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  </Box>
)

export default FriendList
