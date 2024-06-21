import Box from '@mui/material/Box'
import HeaderBar from '~/components/HeaderBar/HeaderBar'
import SideBar from '~/components/SideBar/SideBar'

const DefaultLayout = ({ children }) => {
  return (
    <Box
      sx={{
        backgroundColor: (theme) => theme.palette.backgroundColor.secondary,
      }}
    >
      <HeaderBar />
      <SideBar />
      {children}
    </Box>
  )
}

export default DefaultLayout
