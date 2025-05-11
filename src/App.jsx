import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Exercise5 from './src/pages/Exercise5'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Exercise5 />
    </>
  )
}

export default App
