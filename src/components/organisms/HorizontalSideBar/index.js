import React, { useState } from 'react'
import { NavLink } from "react-router-dom";
import LocationOnRoundedIcon from '@material-ui/icons/LocationOnRounded';
import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded';
import ExpandLessRoundedIcon from '@material-ui/icons/ExpandLessRounded';
import CategoryRoundedIcon from '@material-ui/icons/CategoryRounded';
import BusinessRoundedIcon from '@material-ui/icons/BusinessRounded';
import LocationCityRoundedIcon from '@material-ui/icons/LocationCityRounded';
import HouseRoundedIcon from '@material-ui/icons/HouseRounded';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';

const HorizontalSideBar = () => {
  const [menu, setMenu] = useState(
    [
      {
        name: "Home",
        icon: HouseRoundedIcon,
        path: "/home"
      },
      {
        name: "Location",
        beforeIcon: LocationOnRoundedIcon,
        afterIcon: ExpandMoreRoundedIcon,
        subMenu: {
          open: false,
          item: [{
            name: "Province",
            path: "/province",
            icon: BusinessRoundedIcon
          },
          {
            name: "District",
            path: "/district",
            icon: LocationCityRoundedIcon
          },
          {
            name: "Ward",
            path: "/ward",
            icon: HouseRoundedIcon
          }]
        }
      },
      {
        name: "Classification",
        beforeIcon: CategoryRoundedIcon,
        afterIcon: ExpandMoreRoundedIcon,
        subMenu: {
          open: false,
          item: [{
            name: "Category",
            path: "/category",
            icon: CategoryRoundedIcon
          },
          {
            name: "Type Group",
            path: "/type-group",
            icon: CategoryRoundedIcon
          },
          {
            name: "Type",
            path: "/type",
            icon: CategoryRoundedIcon
          }]
        }
      },
      {
        name: "Profile",
        icon: AccountCircleRoundedIcon,
        path: "/profile"
      }
    ])

  const handleOpenSubMenu = index => {
    menu[index].subMenu.open = !menu[index].subMenu.open
    menu[index].afterIcon = menu[index].afterIcon === ExpandMoreRoundedIcon ? ExpandLessRoundedIcon : ExpandMoreRoundedIcon
    setMenu([...menu])
  }
  return (
    <>
      <div
        className="
        bg-blue-300 
        text-white 
        w-64 
        absolute 
        h-full"
      >
        <div
          className="
          text-center 
          p-4 
          border-b 
          h-16 
          w-full"
        >
          <img
            className="
            w-full 
            h-full 
            object-cover 
            object-center"
            src="/images/logo.png"
            alt="logo" />
        </div>
        <div>
          {menu.map((item, index) =>
            item.subMenu ?
              (<div key={index}>
                <div
                  className="
                  my-3 
                  p-2 
                  px-6 
                  cursor-pointer 
                  text-center 
                  h-10 
                  flex 
                  items-center 
                  justify-between 
                  hover:bg-blue-200"
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
                      <NavLink
                        className="
                        border-b 
                        my-3 
                        ml-8 
                        p-2 
                        text-center 
                        h-10 
                        flex 
                        items-center 
                        justify-center 
                        hover:bg-blue-200"
                        activeClassName="
                        border-r-2 
                        border-white"
                        key={subIndex}
                        to={subItem.path}>
                        <subItem.icon />
                            &nbsp;
                        {subItem.name}
                      </NavLink>)
                    )}
                  </div>)}

              </div>)
              :
              (<NavLink
                className="
                my-3 
                p-2 
                px-6 
                h-10 
                flex 
                items-center 
                hover:bg-blue-200"
                activeClassName="
                border-r-2 
                border-white"
                key={index}
                to={item.path}>
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