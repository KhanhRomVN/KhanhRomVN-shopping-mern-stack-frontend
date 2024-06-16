import React, { useState, useEffect, useCallback } from 'react'
import AppBar from '@mui/material/AppBar'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Button from '@mui/material/Button'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { v4 as uuidv4 } from 'uuid'
import { BACKEND_URI } from '~/API'
import HeaderBar from '~/components/HeaderBar/HeaderBar'

const styles = {
  appBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '60px',
    padding: '0 20px',
  },
  profileHeader: {
    display: 'flex',
    alignItems: 'center',
  },
  backgroundSection: {
    width: '100%',
    height: '350px',
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInfo: {
    position: 'absolute',
    bottom: '20px',
    left: '20px',
    display: 'flex',
    alignItems: 'flex-end',
    gap: '10px',
  },
  tabsContainer: {
    display: 'flex',
    width: '100%',
    boxSizing: 'border-box',
    padding: '12px 12px 0 12px',
  },
  userInfoContainer: {
    flexGrow: 3,
    boxSizing: 'border-box',
    padding: '12px',
    display: 'flex',
    flexDirection: 'column',
  },
}

const ProfilePage = () => {
  const { username } = useParams()
  const [user, setUser] = useState({})
  const [value, setValue] = useState(0)
  const [isCurrentUser, setIsCurrentUser] = useState(false)
  const [isFriend, setIsFriend] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)

  useEffect(() => {
    fetchUserData()
  }, [username])

  const fetchUserData = useCallback(async () => {
    try {
      const response = await axios.post(`${BACKEND_URI}/user/user-detail`, { username })
      const fetchedUser = response.data
      setUser(fetchedUser)
      const currentUser = JSON.parse(localStorage.getItem('currentUser'))
      setIsCurrentUser(currentUser?.username === fetchedUser.username)
      checkIfFriend(fetchedUser.user_id)
    } catch (error) {
      console.error('Error fetching user data:', error)
    }
  }, [username])

  const checkIfFriend = useCallback(async (friendId) => {
    try {
      const accessToken = localStorage.getItem('accessToken')
      const response = await axios.post(
        `${BACKEND_URI}/user/check-friend`,
        { friend_id: friendId },
        { headers: { 'Content-Type': 'application/json', accessToken } },
      )
      setIsFriend(response.data.is_Friend === 'true')
    } catch (error) {
      console.error('Error checking friend status:', error)
    }
  }, [])

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    setSelectedFile(file)
  }

  const handleAddPhoto = async () => {
    if (!selectedFile) {
      console.error('No file selected.')
      return
    }

    setUploading(true)

    try {
      const fileExtension = selectedFile.name.split('.').pop()
      const fileName = `${uuidv4()}.${fileExtension}`
      const storageRef = ref(`backgrounds/${fileName}`)

      const snapshot = await uploadBytes(storageRef, selectedFile)
      const downloadURL = await getDownloadURL(snapshot.ref)
      await updateUserBackground(downloadURL)

      setUser((prevUser) => ({ ...prevUser, background_uri: downloadURL }))
      console.log('Upload success:', downloadURL)
      window.location.reload()
    } catch (error) {
      console.error('Error uploading file:', error)
    } finally {
      setUploading(false)
      setSelectedFile(null)
    }
  }

  const updateUserBackground = async (downloadURL) => {
    try {
      const response = await axios.post(`${BACKEND_URI}/user/update-user`, { background_uri: downloadURL })
      if (response.status !== 200) {
        console.error('Failed to update background_uri:', response.statusText)
      }
    } catch (error) {
      console.error('Error updating background_uri:', error)
    }
  }

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleAddFriend = async () => {
    const accessToken = localStorage.getItem('accessToken')
    const friend_id = user.user_id
    try {
      const response = await axios.post(
        `${BACKEND_URI}/user/add-friend`,
        { friend_id },
        { headers: { 'Content-Type': 'application/json', accessToken } },
      )
      if (response.status === 200) {
        console.log('Friend added successfully!')
        setIsFriend(true)
      } else {
        console.error('Failed to add friend:', response.statusText)
      }
    } catch (error) {
      console.error('Error adding friend:', error)
    }
  }

  return (
    <>
      <HeaderBar />
      <Box sx={styles.backgroundSection}>
        <Box sx={styles.profileInfo}>
          <Avatar
            alt="Avatar"
            src={user.avatar_uri || '/static/images/avatar/default.jpg'}
            sx={{
              width: '90px',
              height: '90px',
            }}
          />
          <Typography variant="h5">{user.username}</Typography>
        </Box>
      </Box>

      <Box sx={styles.tabsContainer}>
        <Box sx={{ flexGrow: 9 }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Carts" />
            <Tab label="My Products" />
            <Tab label="Posts" />
          </Tabs>
        </Box>
        <Box sx={styles.userInfoContainer}>
          <Typography variant="h6">User Information</Typography>
          <Typography variant="h7">Username: {user.username}</Typography>
          <Typography variant="h7">Role: {user.role}</Typography>
          <Typography variant="h7">Name: {user.name}</Typography>
          <Typography variant="h7">About: {user.about}</Typography>
          <Typography variant="h7">Address: {user.address}</Typography>
        </Box>
      </Box>
    </>
  )
}

export default ProfilePage
