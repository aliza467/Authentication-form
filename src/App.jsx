

 

import Dashboard  from './Dashboard/Dashboard'
import './App.css'
import LoginSignupForm from './Signup/LoginSignupForm'
import { Route, Routes } from 'react-router-dom'

function App() {
  

  return (
    <>
    <Routes>
      <Route path="/" element={<LoginSignupForm/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
    </Routes>
      
    </>
  )
}

export default App
