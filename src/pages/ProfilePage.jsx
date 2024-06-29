import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Avatar, Divider, Typography, Button, Tabs, Tab } from '@mui/material'
import { BACKEND_URI } from '~/API'

const ProfilePage = () => {
  const { username } = useParams()
  const [userData, setUserData] = useState(null)
  const [tabValue, setTabValue] = useState(0)
  const [isCurrentUser, setIsCurrentUser] = useState(false)
  const [isFriend, setIsFriend] = useState(false)
  const [hasSentRequest, setHasSentRequest] = useState(false)
  const currentUser = JSON.parse(localStorage.getItem('currentUser'))
  const currentUserId = currentUser.user_id
  const accessToken = localStorage.getItem('accessToken')

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.post(`${BACKEND_URI}/user/get-user-data`, {
          username,
        })
        setUserData(response.data)
        setIsCurrentUser(currentUserId === response.data.user_id)
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    }

    const checkFriendStatus = async () => {
      try {
        const response = await axios.post(
          `${BACKEND_URI}/user/check-friend-status`,
          { friend_id: userData?.user_id },
          {
            headers: {
              'Content-Type': 'application/json',
              accessToken: accessToken,
            },
          },
        )
        setIsFriend(response.data.isFriend)
        setHasSentRequest(response.data.hasSentRequest)
      } catch (error) {
        console.error('Error checking friend status:', error)
      }
    }

    if (userData) {
      checkFriendStatus()
    }

    fetchUserData()
  }, [username, userData?.user_id])

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  const handleAddFriend = async () => {
    try {
      await axios.post(
        `${BACKEND_URI}/user/friend-request`,
        { friend_id: userData.user_id },
        {
          headers: {
            'Content-Type': 'application/json',
            accessToken: accessToken,
          },
        },
      )
      setHasSentRequest(true)
    } catch (error) {
      console.error('Error sending friend request:', error)
    }
  }

  if (!userData) {
    return <Typography>Loading...</Typography>
  }

  return (
    <Box sx={{ boxSizing: 'border-box', padding: '10px' }}>
      <Box sx={{ display: 'flex', height: '300px', gap: '10px' }}>
        <Box sx={{ width: '900px', borderRadius: '10px' }}>
          <Box sx={{ width: '100%', height: '50%', backgroundColor: 'yellow' }}></Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', height: '50%' }}>
            <Box
              sx={{
                backgroundColor: (theme) => theme.palette.backgroundColor.primary,
                width: '100%',
                height: '50%',
                position: 'relative',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <Avatar
                src={userData.avatar_uri}
                sx={{ marginTop: '-50px', marginLeft: '15px', width: '100px', height: '100px' }}
              />
              {!isCurrentUser && !isFriend && (
                <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <Button variant="contained" color="primary">
                    Message
                  </Button>
                  <Button variant="contained" onClick={handleAddFriend} disabled={hasSentRequest}>
                    {hasSentRequest ? 'Request Sent' : 'Add Friend'}
                  </Button>
                </Box>
              )}
            </Box>
            <Box
              sx={{
                backgroundColor: (theme) => theme.palette.backgroundColor.primary,
                width: '100%',
                height: '50%',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Typography
                sx={{
                  color: (theme) => theme.palette.textColor.primary,
                  paddingLeft: '20px',
                  marginTop: '-50px',
                  fontSize: '22px',
                  fontWeight: '600',
                }}
              >
                {userData.username}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box sx={{ backgroundColor: 'blue', width: '400px', borderRadius: '10px' }}></Box>
      </Box>
      <Box sx={{ width: '100%', backgroundColor: 'purple', boxSizing: 'border-box', padding: '10px' }}>
        <Typography>About</Typography>
        <Divider />
        <Typography>{userData.about}</Typography>
      </Box>
      <Box sx={{ width: '100%', backgroundColor: 'blue', boxSizing: 'border-box', padding: '10px' }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="Profile Tabs">
          <Tab label="Posts" />
          <Tab label="Products" />
        </Tabs>
        {tabValue === 0 && (
          <Box>
            <Typography>Posts</Typography>
            {/* Render user's posts here */}
          </Box>
        )}
        {tabValue === 1 && (
          <Box>
            <Typography>Products</Typography>
            {/* Render user's products here */}
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default ProfilePage
