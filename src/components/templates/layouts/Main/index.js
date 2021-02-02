import React from 'react'
import '../../../../App.css'

import HorizontalSideBar from "../../../organisms/HorizontalSideBar";

const Render = ({ children }) => {
  return (
    <>
      <div className="flex w-full h-full">
        <HorizontalSideBar />
        <div className="w-full">
          <div>
            {children}
          </div>
        </div>
      </div>
    </>
  )
}

const Main = ({ children }) => {
  console.log(children)

  const renderProps = {
    children,
  }

  return <Render {...renderProps} />
}

export default Main