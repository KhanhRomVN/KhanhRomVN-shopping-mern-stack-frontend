// Sidebar.js
import React from 'react'
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Typography, Box, Divider } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { Tooltip } from 'react-tippy'
import 'react-tippy/dist/tippy.css'
import SpaceDashboardOutlinedIcon from '@mui/icons-material/SpaceDashboardOutlined'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import DynamicFeedOutlinedIcon from '@mui/icons-material/DynamicFeedOutlined'
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined'
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined'
import QueryStatsOutlinedIcon from '@mui/icons-material/QueryStatsOutlined'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined'
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined'
import MenuIcon from '@mui/icons-material/Menu'

const menuItems = [
  {
    title: 'Menu',
    items: [
      { text: 'Dashboard', icon: <SpaceDashboardOutlinedIcon fontSize="small" />, path: '/' },
      { text: 'Cart', icon: <ShoppingCartOutlinedIcon fontSize="small" />, path: '/cart' },
      { text: 'Feed', icon: <DynamicFeedOutlinedIcon fontSize="small" />, path: '/feed' },
      { text: 'Friend', icon: <GroupAddOutlinedIcon fontSize="small" />, path: '/friend' },
      { text: 'Message', icon: <ChatOutlinedIcon fontSize="small" />, path: '/chat' },
    ],
  },
  {
    title: 'Tools',
    items: [
      { text: 'Product', icon: <CategoryOutlinedIcon fontSize="small" />, path: '/my-product' },
      { text: 'Analytic', icon: <QueryStatsOutlinedIcon fontSize="small" />, path: '/analytic' },
    ],
  },
  {
    title: 'Others',
    items: [
      { text: 'Setting', icon: <SettingsOutlinedIcon fontSize="small" />, path: '/setting/account-security' },
      { text: 'Help', icon: <HelpOutlineOutlinedIcon fontSize="small" />, path: '/help' },
    ],
  },
]

const Sidebar = ({ collapsed, handleToggleSidebar }) => {
  const navigate = useNavigate()

  return (
    <Drawer
      variant="permanent"
      sx={{
        ['& .MuiDrawer-paper']: {
          boxSizing: 'border-box',
          width: collapsed ? (theme) => theme.other.minSideBarWidth : (theme) => theme.other.maxSideBarWidth,
        },
      }}
    >
      <Box
        sx={{
          width: '100%',
          height: '60px',
          display: 'flex',
          boxSizing: 'border-box',
          padding: '10px 10px 10px 12px',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <img src="https://i.postimg.cc/jd0dTYF1/logo.png" alt="logo" style={{ objectFit: 'cover', height: '78%' }} />
          <Typography sx={{ fontSize: '20px', fontWeight: '600', marginTop: '6px' }}>Saleso</Typography>
        </Box>
      </Box>
      <Divider />
      <List
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: '30px',
          position: 'relative',
        }}
      >
        {menuItems.map((section, index) => (
          <div key={index}>
            {!collapsed && (
              <Typography variant="h6" sx={{ fontSize: '0.8rem', textAlign: 'start', padding: '0 0 2px 16px' }}>
                {section.title}
              </Typography>
            )}
            {section.items.map((item, itemIndex) => (
              <Tooltip title={collapsed ? item.text : ''} position="right" key={itemIndex} arrow={true} theme="light">
                <ListItem
                  button
                  onClick={() => navigate(item.path)}
                  sx={{
                    padding: collapsed ? '4px 16px' : '4px 84px 4px 16px',
                    '&:hover': {
                      backgroundColor: (theme) => theme.other.primaryColor,
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 'auto',
                      marginRight: collapsed ? '0' : '8px',
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
                  {!collapsed && <ListItemText primary={item.text} primaryTypographyProps={{ fontSize: '0.85rem' }} />}
                </ListItem>
              </Tooltip>
            ))}
          </div>
        ))}
      </List>
    </Drawer>
  )
}

export default Sidebar
