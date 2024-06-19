// MessageInput.jsx
import React from 'react'
import { Box, TextField, Button } from '@mui/material'

const MessageInput = ({ input, setInput, handleSendMessage }) => (
  <Box
    sx={{
      width: '100%',
      height: '50px',
      backgroundColor: (theme) => theme.palette.backgroundColor.primary,
      display: 'flex',
    }}
  >
    <TextField
      fullWidth
      variant="outlined"
      value={input}
      onChange={(e) => setInput(e.target.value)}
      placeholder="Type a message..."
      sx={{ marginRight: '10px' }}
    />
    <Button
      variant="contained"
      onClick={handleSendMessage}
      sx={{ backgroundColor: (theme) => theme.other.primaryColor, color: (theme) => theme.palette.textColor.primary }}
    >
      Send
    </Button>
  </Box>
)

export default MessageInput
