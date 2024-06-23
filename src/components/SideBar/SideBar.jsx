import { Drawer, List, ListItem, ListItemIcon, ListItemText, Typography, Box } from '@mui/material'
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
  {
    title: 'Menu',
    items: [
      { text: 'Dashboard', icon: <SpaceDashboardOutlinedIcon fontSize="small" />, path: '/' },
      { text: 'Cart', icon: <ShoppingCartOutlinedIcon fontSize="small" />, path: '/cart' },
      { text: 'Feed', icon: <DynamicFeedOutlinedIcon fontSize="small" />, path: '/feed' },
      { text: 'Message', icon: <ChatOutlinedIcon fontSize="small" />, path: '/chat' },
    ],
  },
  {
    title: 'Tools',
    items: [
      { text: 'Product', icon: <CategoryOutlinedIcon fontSize="small" />, path: '/my-product' },
      { text: 'Analytic', icon: <QueryStatsOutlinedIcon fontSize="small" />, path: '/analytic' },
      { text: 'Discount', icon: <LocalOfferOutlinedIcon fontSize="small" />, path: '/discount' },
    ],
  },
  {
    title: 'Others',
    items: [
      { text: 'Setting', icon: <SettingsOutlinedIcon fontSize="small" />, path: '/setting/personal-info' },
      { text: 'Security', icon: <GppGoodOutlinedIcon fontSize="small" />, path: '/security' },
      { text: 'Help', icon: <HelpOutlineOutlinedIcon fontSize="small" />, path: '/help' },
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
                    backgroundColor: (theme) => theme.other.primaryColor,
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 'auto',
                    marginRight: '8px',
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
