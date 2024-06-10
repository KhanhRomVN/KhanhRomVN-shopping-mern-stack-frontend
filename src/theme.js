import { experimental_extendTheme as extendTheme } from '@mui/material/styles'

const theme = extendTheme({
  KRDev: {
    headerBarHeight: '64px',
  },
  colorSchemes: {
    light: {
      palette: {
        background: {
          default: '#ffffff',
          other: '#f5f8fc',
        },
        text: {
          primary: '#000000',
          secondary: '#525866',
        },
        hover: {
          primary: '#dcdee0',
        },
      },
    },
    dark: {
      palette: {
        background: {
          default: '#131314',
          other: '#1e1f20',
        },
        text: {
          primary: '#ffffff',
          secondary: '#a8b3cf',
        },
        hover: {
          primary: '#2d323b',
        },
      },
    },
  },
})

export default theme
