import React from 'react'
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Typography, Box } from '@mui/material'
import {
  Home,
  ShoppingCart,
  People,
  Message,
  Category,
  Assessment,
  LocalOffer,
  Settings,
  Security,
  Help,
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

const menuItems = [
  {
    title: 'Menu',
    items: [
      { text: 'Dashboard', icon: <Home fontSize="small" />, path: '/' },
      { text: 'Cart', icon: <ShoppingCart fontSize="small" />, path: '/cart' },
      { text: 'Feed', icon: <People fontSize="small" />, path: '/feed' },
      { text: 'Message', icon: <Message fontSize="small" />, path: '/message' },
    ],
  },
  {
    title: 'Tools',
    items: [
      { text: 'Product', icon: <Category fontSize="small" />, path: '/my-product' },
      { text: 'Analytic', icon: <Assessment fontSize="small" />, path: '/analytic' },
      { text: 'Discount', icon: <LocalOffer fontSize="small" />, path: '/discount' },
    ],
  },
  {
    title: 'Others',
    items: [
      { text: 'Setting', icon: <Settings fontSize="small" />, path: '/setting' },
      { text: 'Security', icon: <Security fontSize="small" />, path: '/security' },
      { text: 'Help', icon: <Help fontSize="small" />, path: '/help' },
    ],
  },
]

const SideBar = () => {
  const navigate = useNavigate()
  return (
    <Drawer
      variant="permanent"
      sx={{
        ['& .MuiDrawer-paper']: {
          boxSizing: 'border-box',
          marginTop: (theme) => theme.other.headerBarHeight,
        },
      }}
    >
      <List sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '45px' }}>
        {menuItems.map((section, index) => (
          <div key={index}>
            <Typography variant="h6" sx={{ fontSize: '0.8rem', textAlign: 'start', padding: '0 0 2px 16px' }}>
              {section.title}
            </Typography>
            {section.items.map((item, itemIndex) => (
              <ListItem
                button
                key={itemIndex}
                onClick={() => navigate(item.path)}
                sx={{
                  padding: '4px 84px 4px 16px',
                  '&:hover': {
                    backgroundColor: '#f0f0f0', // Thay đổi màu nền khi hover
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 'auto', // Remove the default minWidth to bring the icon closer
                    marginRight: '8px', // Adjust the space between the icon and text
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
                <ListItemText primary={item.text} primaryTypographyProps={{ fontSize: '0.85rem' }} />
              </ListItem>
            ))}
          </div>
        ))}
      </List>
    </Drawer>
  )
}

export default SideBar
