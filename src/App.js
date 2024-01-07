import './App.css'
import {Switch, Route} from 'react-router-dom'
import NotFound from './components/NotFound'
import Login from './components/Login'
import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute'

const App = () => (
  <Switch>
    <Route exact path="/ebank/login" component={Login} />
    <ProtectedRoute path="/" component={Home} />
    <Route path="/bad-path" component={NotFound} />
    <Route component={NotFound} />
  </Switch>
)

export default App
