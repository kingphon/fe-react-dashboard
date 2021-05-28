import React from 'react'
import HouseRoundedIcon from '@material-ui/icons/HouseRounded';

import Header from '../../organisms/Header'


const MainPage = () => {
  return (
    <div className="w-full h-full">
      <Header
        headerName={"Home"}
        headerLogo={<HouseRoundedIcon />}
      />
    </div>
  )
}

export default MainPage