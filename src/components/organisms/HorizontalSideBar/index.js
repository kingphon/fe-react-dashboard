import React, { useState } from 'react'
import { NavLink } from "react-router-dom";
import LocationOnRoundedIcon from '@material-ui/icons/LocationOnRounded';
import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded';
import ExpandLessRoundedIcon from '@material-ui/icons/ExpandLessRounded';
import BusinessRoundedIcon from '@material-ui/icons/BusinessRounded';
import LocationCityRoundedIcon from '@material-ui/icons/LocationCityRounded';
import HouseRoundedIcon from '@material-ui/icons/HouseRounded';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';

const HorizontalSideBar = () => {
  const [menu, setMenu] = useState([{
    name: "Vị trí",
    beforeIcon: LocationOnRoundedIcon,
    afterIcon: ExpandMoreRoundedIcon,
    subMenu: {
      open: false,
      item: [{
        name: "Tỉnh",
        path: "/province",
        icon: BusinessRoundedIcon
      },
      {
        name: "Huyện",
        path: "/district",
        icon: LocationCityRoundedIcon
      },
      {
        name: "Xã",
        path: "/zone",
        icon: HouseRoundedIcon
      }]
    }
  },
  {
    name: "Tài khoản",
    icon: AccountCircleRoundedIcon,
    path: "/account"
  }])

  const handleOpenSubMenu = index => {
    menu[index].subMenu.open = !menu[index].subMenu.open
    menu[index].afterIcon = menu[index].afterIcon === ExpandMoreRoundedIcon ? ExpandLessRoundedIcon : ExpandMoreRoundedIcon
    setMenu([...menu])
  }
  return (
    <>
      <div className="rounded bg-blue-300 text-white w-64 absolute h-full">
        <div className="rounded text-center p-4 border-b h-16 w-full">
          <img className="w-full h-full object-cover object-center" src="/images/logo.png" alt="logo" />
        </div>
        <div>
          {menu.map((item, index) =>
            item.subMenu ?
              (<div key={index}>
                <div
                  className="rounded m-3 p-2 px-6 cursor-pointer text-center h-10 flex items-center justify-between hover:bg-blue-200"
                  onClick={() => handleOpenSubMenu(index)}
                >
                  <div className="flex">
                    <item.beforeIcon className="mr-2" />
                    {item.name}
                  </div>
                  <item.afterIcon />
                </div>
                {item.subMenu.open &&
                  (<div className="text-center">
                    {item.subMenu.item.map((subItem, subIndex) => (
                      <NavLink className="rounded border-b m-3 ml-8 p-2 text-center h-10 flex items-center justify-center hover:bg-blue-200" activeClassName="bg-blue-200" key={subIndex} to={subItem.path}>
                        <subItem.icon />
                            &nbsp;
                        {subItem.name}
                      </NavLink>)
                    )}
                  </div>)}

              </div>)
              :
              (<NavLink className="rounded m-3 p-2 px-6 h-10 flex items-center hover:bg-blue-200" activeClassName="bg-blue-200" key={index} to={item.path}>
                <item.icon className="mr-2" />
                {item.name}
              </NavLink>)
          )}
        </div>
      </div>
    </>
  )
}

export default HorizontalSideBar