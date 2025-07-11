import { useState } from 'react'
import './App.css'
import Home from './components/Home.jsx'
import Temp from './components/Temp.jsx'
import Register from './components/Register.jsx'
import Login from'./components/Login.jsx'
function App() {
  return (
     <div>
      
       <center>
        <h1>Anvi's Cafe</h1>
      <p>Welcome to the cafe.</p>
       </center>
      <Register/>
      <Login/>
     </div>
  )
}
export default App
