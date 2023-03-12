import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../Molecules/Header'
import './style.scss'
const PublicLayout = ({children}) => {
  return (
    <>
        <Header />
        {/* <Sidebar /> */}
        <div className='m-3 p-4 sidebar_right adjust'>
        {children}
        </div>
        {/* <RightSidebar /> */}
        <Outlet />
    </>
  )
}

export default PublicLayout