// DefaultLayout.js
import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import HeaderBar from '~/components/HeaderBar/HeaderBar'
import MenuIcon from '@mui/icons-material/Menu'
import Sidebar from '~/components/SideBar/SideBar'

const DefaultLayout = ({ children }) => {
  return (
    <Box
      sx={{
        backgroundColor: (theme) => theme.palette.backgroundColor.secondary,
        boxSizing: 'border-box',
        paddingTop: (theme) => theme.other.headerBarHeight,
        paddingLeft: (theme) => theme.other.maxSideBarWidth,
        transition: 'padding-left 0.3s ease',
      }}
    >
      <HeaderBar />
      <Sidebar />
      {children}
    </Box>
  )
}

export default DefaultLayout
