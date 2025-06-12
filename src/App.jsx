import { HashRouter } from 'react-router-dom'
import AppRoutes from './admin/routes/AppRoutes'

const App = () => {


  return <>
    <HashRouter>
      <AppRoutes />
    </HashRouter>

  </>
}

export default App