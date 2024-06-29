import { experimental_extendTheme as extendTheme } from '@mui/material/styles'

const theme = extendTheme({
  other: {
    headerBarHeight: '61px',
    maxSideBarWidth: '196px',
    minSideBarWidth: '50px', // Smaller width for collapsed state
    primaryColor: '#e15a15',
  },
  colorSchemes: {
    light: {
      palette: {
        backgroundColor: {
          primary: '#ffffff',
          secondary: '#e8e8e8',
        },
        textColor: {
          primary: '#000000',
          secondary: '#929297',
        },
        hoverColor: {
          primary: '#ffffff',
          secondary: '#ffffff',
        },
      },
    },
    dark: {
      palette: {
        backgroundColor: {
          primary: '#121212',
          secondary: '#18171c',
        },
        textColor: {
          primary: '#ffffff',
          secondary: '#5c5c5e',
        },
        hoverColor: {
          primary: '#09090b',
          secondary: '#18171c',
        },
      },
    },
  },
})

export default theme
