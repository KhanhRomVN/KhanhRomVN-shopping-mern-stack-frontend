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
    title: 'Account',
    items: [
      { text: 'Account&Security', icon: <AccountCircleIcon fontSize="small" />, path: '/setting/account-security' },
      { text: 'Address', icon: <SecurityIcon fontSize="small" />, path: '/setting/address' },
      { text: 'Bank/Card', icon: <SecurityIcon fontSize="small" />, path: '/setting/bankcard' },
    ],
  },
  {
    title: 'Settings',
    items: [
      { text: 'Chat setting', icon: <ShoppingCartIcon fontSize="small" />, path: '/setting/chat' },
      { text: 'Notification settings', icon: <PaymentIcon fontSize="small" />, path: '/setting/notification' },
      { text: 'Personal setting', icon: <FavoriteIcon fontSize="small" />, path: '/setting/personal' },
      { text: 'Blocklist', icon: <FavoriteIcon fontSize="small" />, path: '/setting/blocklist' },
      { text: 'Language', icon: <FavoriteIcon fontSize="small" />, path: '/setting/language' },
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
