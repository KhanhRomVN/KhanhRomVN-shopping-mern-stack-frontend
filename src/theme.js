import { experimental_extendTheme as extendTheme } from '@mui/material/styles'

const theme = extendTheme({
  other: {},
  colorSchemes: {
    light: {
      palette: {
        backgroundColor: {
          primary: '#355933',
          secondary: '#ffffff',
        },
        textColor: {
          primary: '#000000',
          secondary: '#355933',
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
          primary: '#30a32a',
          secondary: '#ffffff',
        },
        textColor: {
          primary: '#ffffff',
          secondary: '#355933',
        },
        hoverColor: {
          primary: '#000000',
          secondary: '#ffffff',
        },
      },
    },
  },
})

export default theme
