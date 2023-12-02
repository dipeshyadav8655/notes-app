import React from 'react'
// import List from './Component/List/List'
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <div className='mx-[10vw] mt-[5vw]'>
      <Outlet />
    </div>
  )
}

export default App