/* React */
import React, { useState, useEffect } from 'react'
/* Mui Merterial */
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
/* Socket IO */
import io from 'socket.io-client'
/* Axios */
import axios from 'axios'
/* API */
import { BACKEND_URI } from '~/API'

/* Socket Setting */
const socket = io.connect(BACKEND_URI, {
  transports: ['websocket'],
})

const MessagePage = () => {
  const [dataSocket, setDataSocket] = useState('')
  const [listFriend, setListFriend] = useState([])
  const [selectedUserId, setSelectedUserId] = useState(null)
  const [messages, setMessages] = useState([])
  const [messageInput, setMessageInput] = useState('')
  const userId = JSON.parse(localStorage.getItem('user'))._id
  const accessToken = localStorage.getItem('accessToken')

  /* Hiển thị ra tất cả list bạn bè của user */
  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await axios.post(
          `${BACKEND_URI}/user/friends`,
          {
            /* request body */
          },
          {
            headers: {
              'Content-Type': 'application/json',
              accessToken: accessToken,
            },
          },
        )
        if (response.status === 200) {
          const data = response.data
          setListFriend(data)
        } else {
          console.error('Failed to fetch friends:', response.status)
        }
      } catch (error) {
        console.error('Error fetching friends:', error)
      }
    }
    fetchFriends()
  }, [])

  /* hiển thị lịch sử chat của user và selectedUserId khi selectedUserId thay đổi (chuyển sang user khác)  */
  useEffect(() => {
    if (selectedUserId) {
      const handleUserSelect = async (userId) => {
        try {
          const response = await axios.post(
            `${BACKEND_URI}/chat/getchats`,
            {
              receiver_id: selectedUserId,
            },
            {
              headers: {
                'Content-Type': 'application/json',
                accessToken: accessToken,
              },
            },
          )
          if (response.status === 200) {
            const data = response.data
            const chatId = data.chat_id
            localStorage.setItem('chat_id', chatId)
            socket.emit('room', chatId)
            setMessages(data.chats)
          } else {
            console.error('Failed to fetch chats:', response.status)
          }
        } catch (error) {
          console.error('Error fetching chats:', error)
        }
      }
      handleUserSelect(selectedUserId)
    }
  }, [selectedUserId])

  const handleSendMessage = async () => {
    if (messageInput.trim() !== '') {
      const socketData = {
        room: localStorage.getItem('chat_id'),
        receiver_id: selectedUserId,
        text: messageInput.trim(),
      }
      try {
        socket.emit('send', socketData)
      } catch (error) {
        console.error('Error sending message:', error)
      }
      setMessageInput('')
    }
  }

  useEffect(() => {
    socket.on('receive', (data) => {
      console.log(data.text)
      setDataSocket(data.text)
    })
  }, [dataSocket])

  return (
    <Box sx={{ height: '100vh', display: 'flex' }}>
      <Box sx={{ flexGrow: '1', height: '100%', overflow: 'hidden' }}>
        <Paper elevation={3} sx={{ backgroundColor: 'red', height: '100%' }}>
          <Typography variant="h6" align="center" sx={{ p: 2 }}>
            Users
          </Typography>
          <Divider />
          <Box sx={{ height: '100%', overflowY: 'auto' }}>
            <List>
              {listFriend.map((user) => (
                <ListItem
                  key={user._id}
                  button
                  onClick={() => setSelectedUserId(user._id)}
                  selected={selectedUserId === user._id}
                >
                  <ListItemText primary={user.name} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Paper>
      </Box>
      <Box
        sx={{
          flexGrow: '3',
          backgroundColor: 'green',
          display: 'flex',
          flexDirection: 'column',
          padding: '20px',
          borderRadius: '10px',
        }}
      >
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
      </Box>
    </Box>
  )
}

export default MessagePage
