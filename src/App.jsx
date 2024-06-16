import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { publicRoutes } from './routes/routes'

const App = () => {
  return (
    <Router>
      <Routes>
        {publicRoutes.map((route, idx) => (
          <Route key={idx} path={route.path} element={route.element} />
        ))}
      </Routes>
    </Router>
  )
}

export default App
