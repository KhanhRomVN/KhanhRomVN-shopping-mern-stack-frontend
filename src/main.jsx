import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import CssBaseline from '@mui/material/CssBaseline'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import theme from './theme'
// import { Provider } from 'react-redux'
// import { store } from './redux/store'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CssVarsProvider theme={theme}>
      {/* <Provider store={store}> */}
      <CssBaseline />
      <App />
      {/* </Provider> */}
    </CssVarsProvider>
  </React.StrictMode>,
)
