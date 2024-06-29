import axios from 'axios'
import { BACKEND_URI } from '~/API'

export const fetchFriendsData = async () => {
  const accessToken = localStorage.getItem('accessToken')
  try {
    const [friendsResponse, requestsResponse, blockedResponse] = await Promise.all([
      axios.post(`${BACKEND_URI}/user/get-list-friend`, {}, { headers: { accessToken } }),
      axios.post(`${BACKEND_URI}/user/get-list-friend-request`, {}, { headers: { accessToken } }),
      axios.post(`${BACKEND_URI}/user/get-list-block-friend`, {}, { headers: { accessToken } }),
    ])
    return {
      friends: friendsResponse.data || [],
      friendRequests: requestsResponse.data || [],
      blockedUsers: blockedResponse.data.blockedUsers || [],
    }
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}

export const handleFriendAction = async (action, friendId) => {
  const accessToken = localStorage.getItem('accessToken')
  try {
    await axios.post(
      `${BACKEND_URI}/user/friend-actions`,
      { action, friend_id: friendId },
      { headers: { accessToken } },
    )
  } catch (error) {
    console.error(`Error ${action === 'accept' ? 'accepting' : 'refusing'} friend request:`, error)
    throw error
  }
}
