// import {Lazy, Suspense} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
// import Loader from 'react-loader-spinner'
import './App.css'

// const Home = Lazy(() => import('./components/Home'))
// const ProtectedRoute = Lazy(() => import('./components/ProtectedRoute'))
// const Login = Lazy(() => import('./components/Login'))
// const Jobs = Lazy(() => import('./components/Jobs'))
// const JobItemDetails = Lazy(() => import('./components/JobItemDetails'))
// const NotFound = Lazy(() => import('./components/NotFound'))
import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './components/Login'
import Jobs from './components/Jobs'
import JobItemDetails from './components/JobItemDetails'
import NotFound from './components/NotFound'

// Replace your code here
const App = () => (
  //   <Suspense fallback={<LoadingView />}>
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/jobs" component={Jobs} />
    <ProtectedRoute exact path="/jobs/:id" component={JobItemDetails} />
    <Route path="/not-found" component={NotFound} />
    <Redirect to="not-found" />
  </Switch>
  //   </Suspense>
)

export default App
