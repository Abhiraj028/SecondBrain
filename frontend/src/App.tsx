import { Dashboard } from './pages/Dashboard'
import './App.css'
import { SignUp } from './pages/SignUp'
import { SignIn } from './pages/SignIn'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import { SharedBrain } from './pages/SharedBrain'
import { useState } from 'react'

function App() {
  const [filter, setFilter] = useState<string>("");
  
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/dashboard" element={<Dashboard filter={filter} setFilter={setFilter} />} />
        <Route path="/brain/:link" element={<SharedBrain filter={filter} setFilter={setFilter} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
