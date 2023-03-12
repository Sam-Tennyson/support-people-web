import React from 'react'
import './style.scss'
const PrivateLayout = ({children}) => {
  return (
    <>
      <div className='private-screen'>
        {children}
      </div>
    </>
  )
}

export default PrivateLayout