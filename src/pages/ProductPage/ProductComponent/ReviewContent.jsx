import React, { useState, useEffect } from 'react'
import { Box, Typography, Avatar, Divider, TextField, IconButton } from '@mui/material'
import axios from 'axios'
import { BACKEND_URI } from '~/API'
import SendIcon from '@mui/icons-material/Send'

const ReviewContent = ({ prodId }) => {
  const [reviews, setReviews] = useState([])
  const [commentText, setCommentText] = useState('')

  useEffect(() => {
    fetchReviews()
  }, [prodId])

  const fetchReviews = async () => {
    try {
      const response = await axios.post(`${BACKEND_URI}/product/get-reviews`, { prod_id: prodId })
      setReviews(response.data.reviews)
    } catch (error) {
      console.error('Error fetching reviews:', error)
    }
  }

  const handleCommentSubmit = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken')
      const response = await axios.post(
        `${BACKEND_URI}/product/comment-review`,
        {
          prod_id: prodId,
          reviewComment: commentText,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            accessToken: accessToken,
          },
        },
      )
      console.log('Comment submitted successfully:', response.data)
      setCommentText('')
      // Refresh reviews after successful submission
      fetchReviews()
    } catch (error) {
      console.error('Error submitting comment:', error)
    }
  }

  return (
    <Box sx={{ width: '550px', height: '330px' }}>
      <Box
        sx={{
          width: '100%',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <TextField
          variant="outlined"
          placeholder="Write a comment..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          fullWidth
          size="small"
          sx={{ mr: 1 }}
        />
        <IconButton color="inherit" onClick={handleCommentSubmit}>
          <SendIcon />
        </IconButton>
      </Box>
      <Box sx={{ width: '100%', height: '280px', overflowY: 'auto', padding: '10px' }}>
        {reviews.map((review) => (
          <Box key={review._id} sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <Avatar sx={{ width: 38, height: 38, marginRight: '10px' }} />
            <Box>
              <Typography variant="body2" sx={{ fontSize: '14px', color: '#ffffff' }}>
                Unknown {new Date(review.created_at).toLocaleString()}
              </Typography>
              <Divider />
              <Typography variant="body1" sx={{ fontSize: '16px', color: '#ffffff' }}>
                {review.reviewComment}
              </Typography>
            </Box>
          </Box>
        ))}
        {reviews.length === 0 && <Typography variant="body2">No reviews available for this product.</Typography>}
      </Box>
    </Box>
  )
}

export default ReviewContent
