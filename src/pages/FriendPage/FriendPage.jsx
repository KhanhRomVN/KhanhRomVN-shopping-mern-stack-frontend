// FriendPage.jsx
import React, { useEffect, useState } from 'react'
import { Box, Button, Typography, ButtonGroup, CircularProgress, Divider } from '@mui/material'
import PersonIcon from '@mui/icons-material/Person'
import BlockIcon from '@mui/icons-material/Block'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import TabPanel from './TabPanel'
import { fetchFriendsData } from './FriendActions'
import { renderFriendListItem, renderBlockedListItem, renderRequestListItem } from './ListItemRenderers'

const FriendPage = () => {
  const [value, setValue] = useState(0)
  const [friends, setFriends] = useState([])
  const [friendRequests, setFriendRequests] = useState([])
  const [blockedUsers, setBlockedUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const { friends, friendRequests, blockedUsers } = await fetchFriendsData()
        setFriends(friends)
        setFriendRequests(friendRequests)
        setBlockedUsers(blockedUsers)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleChange = (newValue) => {
    setValue(newValue)
  }

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Box sx={{ width: '100%', height: '700px', boxSizing: 'border-box', padding: '10px' }}>
      <ButtonGroup variant="outlined" fullWidth sx={{ marginBottom: '10px' }}>
        <Button
          onClick={() => handleChange(0)}
          startIcon={<PersonIcon />}
          sx={{
            width: 'calc(100% / 3)',
            backgroundColor: value === 0 ? '#e15a15' : 'transparent',
            color: value === 0 ? '#fff' : '#e15a15',
            '&:hover': { backgroundColor: '#e15a15', color: '#fff' },
          }}
        >
          Friends
        </Button>
        <Button
          onClick={() => handleChange(1)}
          startIcon={<BlockIcon />}
          sx={{
            width: 'calc(100% / 3)',
            backgroundColor: value === 1 ? '#e15a15' : 'transparent',
            color: value === 1 ? '#fff' : '#e15a15',
            '&:hover': { backgroundColor: '#e15a15', color: '#fff' },
          }}
        >
          Blocked
        </Button>
        <Button
          onClick={() => handleChange(2)}
          startIcon={<PersonAddIcon />}
          sx={{
            width: 'calc(100% / 3)',
            backgroundColor: value === 2 ? '#e15a15' : 'transparent',
            color: value === 2 ? '#fff' : '#e15a15',
            '&:hover': { backgroundColor: '#e15a15', color: '#fff' },
          }}
        >
          Requests
        </Button>
      </ButtonGroup>
      <Box>
        <TabPanel value={value} index={0}>
          <Typography variant="h6" gutterBottom>
            Friends
          </Typography>
          <Divider />
          {renderFriendListItem(friends)}
        </TabPanel>

        <TabPanel value={value} index={1}>
          <Typography variant="h6" gutterBottom>
            Blocked
          </Typography>
          <Divider />
          {renderBlockedListItem(blockedUsers)}
        </TabPanel>

        <TabPanel value={value} index={2}>
          <Typography variant="h6" gutterBottom>
            Friend Requests
          </Typography>
          <Divider />
          {renderRequestListItem(friendRequests)}
        </TabPanel>
      </Box>
    </Box>
  )
}

export default FriendPage
