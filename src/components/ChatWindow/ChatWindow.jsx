import React, { useState, useEffect } from 'react'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import io from 'socket.io-client'
import { BACKEND_URI } from '~/API'

const connectionOptions = {
  transport: ['websocket'],
}

const socket = io.connect(BACKEND_URI, connectionOptions)

const ChatWindow = ({ receiver_id, sender_accessToken }) => {
  const user = JSON.parse(localStorage.getItem('user'))
  const userId = user._id
  const [messages, setMessages] = useState([])
  const [messageInput, setMessageInput] = useState('')

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await fetch(`${BACKEND_URI}/chat/getchats`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            accessToken: sender_accessToken,
          },
          body: JSON.stringify({ receiver_id }),
        })
        if (response.ok) {
          const data = await response.json()
          localStorage.setItem('chat_id', data.chat_id)

          setMessages(data.chats)
        } else {
          console.error('Failed to fetch chats:', response.status)
        }
      } catch (error) {
        console.error('Error fetching chats:', error)
      }
    }

    fetchChats()
  }, [receiver_id, sender_accessToken])

  const handleSendMessage = async () => {
    if (messageInput.trim() !== '') {
      const newMessage = {
        receiver_id,
        text: messageInput.trim(),
        images: [],
      }

      try {
        const response = await fetch('https://shopping-mern-stack-backend.onrender.com/chat/send', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            accessToken: sender_accessToken,
          },
          body: JSON.stringify(newMessage),
        })
        if (response.ok) {
          // Nếu gửi tin nhắn thành công, cập nhật state để hiển thị tin nhắn mới
          const data = await response.json()
          setMessages([...messages, data])
        } else {
          console.error('Failed to send message:', response.status)
        }
      } catch (error) {
        console.error('Error sending message:', error)
      }
      setMessageInput('')
    }
  }

  return (
    <Paper sx={{ height: '100%', display: 'flex', flexDirection: 'column', padding: '20px', borderRadius: '10px' }}>
      <Typography variant="h6" gutterBottom>
        Chat
      </Typography>
      <List sx={{ flexGrow: 1, overflowY: 'auto', marginBottom: '20px' }}>
        {messages.map((msg) => (
          <React.Fragment key={msg._id}>
            <ListItem
              alignItems="flex-start"
              sx={{ justifyContent: msg.senderId === userId ? 'flex-start' : 'flex-end' }}
            >
              <ListItemText
                primary={msg.text}
                secondary={msg.createdAt}
                sx={{ textAlign: msg.senderId === userId ? 'left' : 'right' }}
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        ))}
      </List>
      <Box sx={{ display: 'flex' }}>
        <TextField
          label="Type your message"
          variant="outlined"
          fullWidth
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          sx={{ marginRight: '10px' }}
        />
        <Button variant="contained" onClick={handleSendMessage}>
          Send
        </Button>
      </Box>
    </Paper>
  )
}

export default ChatWindow
