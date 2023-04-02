import React from 'react'
import { Outlet } from 'react-router-dom'
import MUIHeader from '../Cells/MUIHeader'
import Header from '../Molecules/Header'
import LeftSidebar from '../Molecules/LeftSidebar'
import './style.scss'
const PublicLayout = ({children}) => {
  return (
    <>
        {/* <Header /> */}
        <MUIHeader />
        {/* <Sidebar /> */}

          <div className=' mx-2 sidebar_right adjust'>
          {children}
          </div>
          {/* <div className="p-4 left-sidebar adjust">
            <LeftSidebar />
          </div> */}
        <Outlet />
    </>
  )
}

export default PublicLayout