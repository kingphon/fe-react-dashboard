import React from 'react'
import LocationCityRoundedIcon from '@material-ui/icons/LocationCityRounded';

import Header from '../../../organisms/Header'

const District = () => {
  return (
    <>
      <Header headerName={"Huyện"} headerLogo={<LocationCityRoundedIcon />} />
    </>
  )
}

export default District