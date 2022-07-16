import React from 'react'
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom'
import AuthPage from './Pages/Auth/Auth'
import ProtectedRoute from './Protected'
import Homepage from './Pages/Homepage/Homepage'

const App = () => {
  const authStatus = JSON.parse(localStorage.getItem('manager'));
  
  
  return (
   <Router>
    <Routes>
      <Route path="/" element={<AuthPage/>}></Route>
     <Route path="/homepage" element={<ProtectedRoute manager={authStatus.token} >
      <Homepage/> 
     </ProtectedRoute>} />
    </Routes>
   </Router>
  )
}

export default App