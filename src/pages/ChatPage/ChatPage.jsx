// ChatPage.jsx
import React, { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import axios from 'axios'
import io from 'socket.io-client'
import HeaderBar from '~/components/HeaderBar/HeaderBar'
import IconOnlySideBar from '~/components/SideBar/IconOnlySideBar'
import { BACKEND_URI } from '~/API'
import ChatWindow from './ChatWindow'
import MessageInput from './MessageInput'
import FriendList from './FriendList'

const socket = io.connect(BACKEND_URI)

const ChatPage = () => {
  const [friendList, setFriendList] = useState([])
  const [friendId, setFriendId] = useState('')
  const [chatRoomId, setChatRoomId] = useState('')
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [userFriendName, setUserFriendName] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const accessToken = localStorage.getItem('accessToken')
  const currentUser = JSON.parse(localStorage.getItem('currentUser'))
  const user_id = currentUser.user_id

  useEffect(() => {
    const listFriend = async () => {
      try {
        const response = await axios.get(`${BACKEND_URI}/user/get-list-friend`, {
          headers: { 'Content-Type': 'application/json', accessToken: accessToken },
        })
        setFriendList(response.data.friends)
      } catch (error) {
        console.error('Error fetching friend list:', error)
      }
    }
    listFriend()
  }, [accessToken, user_id])

  const handlerClickFriend = async (friend_id, userFriendName) => {
    try {
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
      console.error('Error fetching chat:', error)
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

export default ChatPage
