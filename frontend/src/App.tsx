import { Dashboard } from './pages/Dashboard'
import './App.css'
import { SignUp } from './pages/SignUp'
import { SignIn } from './pages/SignIn'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import { SharedBrain } from './pages/SharedBrain'

function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/brain/?shareLink" element={<SharedBrain />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
