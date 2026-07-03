import { useState } from 'react'
import './App.css'
import Navbar from './Components/Navbar'
import ToDo from './Components/ToDo'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="container">
      <Navbar/>
      <ToDo/>
    </div>
  )
}

export default App
