import { useState } from 'react'
import './App.css'
import Home from './components/Home.jsx'
import Temp from './components/Temp.jsx'
import Register from './components/Register.jsx'
function App() {
  return (
     <div>
      
       <center>
        <h1>Anvi's Cafe</h1>
      <p>Welcome to the cafe.</p>
       </center>
      <Register/>
     </div>
  )
}
export default App
