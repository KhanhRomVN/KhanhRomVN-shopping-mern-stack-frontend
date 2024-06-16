import React, { useEffect, useState, useRef } from 'react'
import { Box, Typography, Button, TextField, Avatar } from '@mui/material'
import { BACKEND_URI } from '~/API'
import axios from 'axios'
import io from 'socket.io-client'
import HeaderBar from '~/components/HeaderBar/HeaderBar'
import Divider from '@mui/material/Divider'
import IconOnlySideBar from '~/components/SideBar/IconOnlySideBar'

const socket = io.connect(BACKEND_URI)

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

const ChatPage = () => {
  const [friendList, setFriendList] = useState([])
  const [friendId, setFriendId] = useState('')
  const [chatRoomId, setChatRoomId] = useState('')
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [newMessage, setNewMessage] = useState(null)
  const [userFriendName, setUserFriendName] = useState('')
  const [lastMessageFriend, setLastMessageFriend] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const accessToken = localStorage.getItem('accessToken')
  const currentUser = JSON.parse(localStorage.getItem('currentUser'))
  const user_id = currentUser.user_id

  useEffect(() => {
    const listFriend = async () => {
      try {
        const response = await axios.post(
          `${BACKEND_URI}/user/list-friend`,
          { receiver_id: user_id },
          { headers: { accessToken: accessToken } },
        )
        setFriendList(response.data.friendDataList)
      } catch (error) {
        console.error('Error fetching friend list:', error)
      }
    }
    listFriend()
  }, [accessToken, user_id])

  const handlerClickFriend = async (friend_id, userFriendName) => {
    try {
      setLastMessageFriend('')
      setUserFriendName(userFriendName)
      const responseChatBox = await axios.post(
        `${BACKEND_URI}/chat/get-chat`,
        { receiver_id: friend_id },
        { headers: { accessToken: accessToken } },
      )

      const { chat_id, MessageList } = responseChatBox.data
      setFriendId(friend_id)
      setChatRoomId(chat_id)
      setMessages(MessageList)
      socket.emit('joinRoom', chat_id, user_id)
    } catch (error) {
      console.error('Error fetching friend list:', error)
    }
  }

  const handleSendMessage = () => {
    if (input.trim() !== '') {
      socket.emit('sendMessage', chatRoomId, input.trim(), user_id)
      setInput('')
    }
  }

  useEffect(() => {
    if (chatRoomId) {
      socket.on('receiveMessage', (data) => {
        const newMessage = {
          sender_id: data.senderId,
          message: data.message,
        }
        setMessages((prevMessages) => [...prevMessages, newMessage])
      })
    }
    return () => {
      socket.off('receiveMessage')
    }
  }, [chatRoomId])

  const filteredFriends = friendList.filter((friend) =>
    friend.username.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <>
      <HeaderBar />
      <IconOnlySideBar />
      <Box
        sx={{
          width: '100%',
          height: '100vh',
          display: 'flex',
          gap: '10px',
          backgroundColor: (theme) => theme.palette.backgroundColor.secondary,
          boxSizing: 'border-box',
          padding: '10px',
          paddingTop: (theme) => theme.other.headerBarHeight,
          paddingLeft: '65px',
        }}
      >
        <FriendList
          friendList={filteredFriends}
          handlerClickFriend={handlerClickFriend}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <ChatWindow userFriendName={userFriendName} messages={messages} user_id={user_id} />
          <MessageInput input={input} setInput={setInput} handleSendMessage={handleSendMessage} />
        </Box>
      </Box>
    </>
  )
}

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

export default ChatPage
