import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Signup from './Signup'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './Login'
import Firsthome from './Firsthome/Firsthome'
import Homepage from './Home/Homepage'
import "./../node_modules/bootstrap/dist/css/bootstrap.min.css"


function App() {
  

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Firsthome />}></Route>
      <Route path='/register' element={<Signup />}></Route>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/home' element={<Homepage />}></Route>
    </Routes>
  </BrowserRouter>
  )
}

export default App
