import React from 'react'
import { List, ListItem, ListItemIcon, ListItemText, Divider, Typography, Box } from '@mui/material'
import { Link } from 'react-router-dom'
import {
  AccountCircle as AccountCircleIcon,
  Security as SecurityIcon,
  Store as StoreIcon,
  ShoppingCart as ShoppingCartIcon,
  Payment as PaymentIcon,
  Favorite as FavoriteIcon,
  Person as PersonIcon,
  PostAdd as PostAddIcon,
  Notifications as NotificationsIcon,
  Mail as MailIcon,
  Settings as SettingsIcon,
  Help as HelpIcon,
} from '@mui/icons-material'

const sections = [
  {
    title: 'Account Management',
    items: [
      { text: 'Personal Information', icon: <AccountCircleIcon fontSize="small" />, path: '/setting/personal-info' },
      { text: 'Security', icon: <SecurityIcon fontSize="small" />, path: '/setting/security' },
    ],
  },
  {
    title: 'Buying and Selling Settings',
    items: [
      { text: 'My Orders', icon: <ShoppingCartIcon fontSize="small" />, path: '/setting/my-orders' },
      { text: 'Payment and Shipping', icon: <PaymentIcon fontSize="small" />, path: '/setting/payment-shipping' },
      { text: 'Favorite List', icon: <FavoriteIcon fontSize="small" />, path: '/setting/favorite-list' },
    ],
  },
  {
    title: 'Store Management',
    items: [
      { text: 'My Products', icon: <StoreIcon fontSize="small" />, path: '/setting/my-products' },
      { text: 'Store Orders', icon: <ShoppingCartIcon fontSize="small" />, path: '/setting/store-orders' },
    ],
  },
  {
    title: 'Social Network Settings',
    items: [
      { text: 'Profile', icon: <PersonIcon fontSize="small" />, path: '/setting/profile' },
      { text: 'Posts and Status', icon: <PostAddIcon fontSize="small" />, path: '/setting/posts-status' },
    ],
  },
  {
    title: 'Notifications and Messages',
    items: [
      { text: 'Notifications', icon: <NotificationsIcon fontSize="small" />, path: '/setting/notifications' },
      { text: 'Messages', icon: <MailIcon fontSize="small" />, path: '/setting/messages' },
    ],
  },
  {
    title: 'App Settings',
    items: [
      { text: 'Interface Settings', icon: <SettingsIcon fontSize="small" />, path: '/setting/interface-settings' },
    ],
  },
  {
    title: 'Help and Support',
    items: [{ text: 'User Guide', icon: <HelpIcon fontSize="small" />, path: '/setting/user-guide' }],
  },
]

const SettingSideBar = () => {
  return (
    <Box sx={{ boxSizing: 'border-box' }}>
      {sections.map((section, index) => (
        <Box key={index} mb={2}>
          <Typography style={{ fontSize: '14px' }}>{section.title}</Typography>
          {section.items.map((item, idx) => (
            <ListItem
              button
              key={idx}
              component={Link}
              to={item.path}
              sx={{
                padding: '4px 35px 4px 14px',
                '&:hover': {
                  backgroundColor: (theme) => theme.other.primaryColor,
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: '30px' }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} primaryTypographyProps={{ style: { fontSize: '14px' } }} />
            </ListItem>
          ))}
          {index < sections.length - 1 && <Divider />}
        </Box>
      ))}
    </Box>
  )
}

export default SettingSideBar
