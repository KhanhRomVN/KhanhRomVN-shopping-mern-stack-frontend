// ChatWindow.jsx
import React, { useEffect, useRef } from 'react'
import { Box, Typography } from '@mui/material'

const ChatWindow = ({ userFriendName, messages, user_id }) => {
  const endOfMessagesRef = useRef(null)

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <Box
      sx={{
        display: 'flex',
        width: '1000px',
        height: '490px',
        flexDirection: 'column',
        gap: '10px',
      }}
    >
      <Box
        sx={{
          width: '100%',
          height: '45px',
          backgroundColor: (theme) => theme.palette.backgroundColor.primary,
          boxSizing: 'border-box',
          padding: '0 20px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Typography sx={{ fontSize: '20px' }}>{userFriendName}</Typography>
      </Box>
      <Box
        sx={{
          width: '100%',
          height: '480px',
          backgroundColor: (theme) => theme.palette.backgroundColor.primary,
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          boxSizing: 'border-box',
          padding: '10px',
          overflowY: 'auto',
        }}
      >
        {messages.map((message, idx) => (
          <Typography
            key={idx}
            sx={{
              alignSelf: message.sender_id === user_id ? 'flex-end' : 'flex-start',
              backgroundColor: (theme) => theme.other.primaryColor,
              color: 'white',
              padding: '4px 8px',
              borderRadius: '4px',
            }}
          >
            {message.message}
          </Typography>
        ))}
        <div ref={endOfMessagesRef} />
      </Box>
    </Box>
  )
}

export default ChatWindow
