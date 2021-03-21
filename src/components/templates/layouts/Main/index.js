import React from 'react'
import '../../../../App.css'

import HorizontalSideBar from "../../../organisms/HorizontalSideBar";

const Render = ({ children }) => {
  return (
    <>
      <div className="flex w-full">
        <HorizontalSideBar />
        <div className="w-full ml-64">
          {children}
        </div>
      </div>
    </>
  )
}

const Main = ({ children }) => {

  const renderProps = {
    children,
  }

  return <Render {...renderProps} />
}

export default Main