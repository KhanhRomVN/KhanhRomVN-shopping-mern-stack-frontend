import React from 'react'
import { Drawer, List, ListItem, ListItemIcon, Box, Tooltip } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import SpaceDashboardOutlinedIcon from '@mui/icons-material/SpaceDashboardOutlined'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import DynamicFeedOutlinedIcon from '@mui/icons-material/DynamicFeedOutlined'
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined'
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined'
import QueryStatsOutlinedIcon from '@mui/icons-material/QueryStatsOutlined'
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import GppGoodOutlinedIcon from '@mui/icons-material/GppGoodOutlined'
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined'

const menuItems = [
  { text: 'Dashboard', icon: <SpaceDashboardOutlinedIcon fontSize="small" />, path: '/' },
  { text: 'Cart', icon: <ShoppingCartOutlinedIcon fontSize="small" />, path: '/cart' },
  { text: 'Feed', icon: <DynamicFeedOutlinedIcon fontSize="small" />, path: '/feed' },
  { text: 'Message', icon: <ChatOutlinedIcon fontSize="small" />, path: '/chat' },
  { text: 'Product', icon: <CategoryOutlinedIcon fontSize="small" />, path: '/my-product' },
  { text: 'Analytic', icon: <QueryStatsOutlinedIcon fontSize="small" />, path: '/analytic' },
  { text: 'Discount', icon: <LocalOfferOutlinedIcon fontSize="small" />, path: '/discount' },
  { text: 'Setting', icon: <SettingsOutlinedIcon fontSize="small" />, path: '/setting' },
  { text: 'Security', icon: <GppGoodOutlinedIcon fontSize="small" />, path: '/security' },
  { text: 'Help', icon: <HelpOutlineOutlinedIcon fontSize="small" />, path: '/help' },
]

const IconOnlySideBar = () => {
  const navigate = useNavigate()
  return (
    <Drawer
      variant="permanent"
      sx={{
        '& .MuiDrawer-paper': {
          boxSizing: 'border-box',
          width: '60px',
          marginTop: (theme) => theme.other.headerBarHeight,
        },
      }}
    >
      <List sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '10px' }}>
        {menuItems.map((item, index) => (
          <Tooltip title={item.text} placement="right" arrow key={index}>
            <ListItem
              button
              onClick={() => navigate(item.path)}
              sx={{
                justifyContent: 'center',
                color: (theme) => theme.palette.textColor.primary,
                '&:hover': {
                  backgroundColor: (theme) => theme.other.primaryColor,
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 'auto',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {item.icon}
                </Box>
              </ListItemIcon>
            </ListItem>
          </Tooltip>
        ))}
      </List>
    </Drawer>
  )
}

export default IconOnlySideBar
