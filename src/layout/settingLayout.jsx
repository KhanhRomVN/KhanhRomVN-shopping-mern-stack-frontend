import Box from '@mui/material/Box'
import SettingSideBar from '~/pages/SettingPage/SettingSideBar'

const SettingLayout = ({ children }) => {
  return (
    <Box
      sx={{
        width: 'auto',
        marginTop: (theme) => theme.other.headerBarHeight,
        marginLeft: (theme) => theme.other.marginLeftWidth,
        boxSizing: 'border-box',
        padding: '8px',
        display: 'flex',
      }}
    >
      <SettingSideBar />
      {children}
    </Box>
  )
}

export default SettingLayout
