import React, { useState, useEffect } from 'react'
import NotificationsActiveRoundedIcon from '@material-ui/icons/NotificationsActiveRounded';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import AddBoxRoundedIcon from '@material-ui/icons/AddBoxRounded';
import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded';
import {
  useDispatch,
  useSelector,
  shallowEqual
} from 'react-redux'
import { useLocation, useHistory } from 'react-router-dom'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';
import IconButton from "@material-ui/core/IconButton";
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';

import { doLogout, getProfile } from '../../../redux/reducers/rootReducer'
import Button from '../../atoms/Button'
import Input from '../../atoms/Input'

const Header = ({
  headerName,
  createButtonLoading,
  headerLogo,
  onChangeSearchKeywords,
  onOpenCreate,
}) => {
  const selector = useSelector(({
    rootReducer: {
      profile,
    }
  }) => ({
    profile,
  }), shallowEqual)

  const [searchKeywords, setSearchKeywords] = useState("")
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProfile())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const history = useHistory()
  const location = useLocation()
  const { home } = location.state || { from: { pathname: "/home" } }
  const options = [
    {
      name: "Log out",
      onClick: () => dispatch(doLogout(() => history.replace(home))),
      icon: ExitToAppRoundedIcon
    }
  ];

  return (
    <>
      <div className="h-16 bg-white p-4 px-6 flex items-center justify-between top-0 sticky z-50">
        <div className="flex items-center justify-start">
          <h3>{headerName}</h3>&nbsp;
                {headerLogo}
        </div>
        {onOpenCreate &&
          <Button
            endIcon={<AddBoxRoundedIcon />}
            color="default"
            onClick={onOpenCreate}
            loading={createButtonLoading}
          >
            Thêm
          </Button>
        }
        {onChangeSearchKeywords &&
          <div className="flex items-center w-4/6 px-2">
            <Input
              label="Tìm kiếm"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchRoundedIcon />
                  </InputAdornment>
                ),
              }}
              fullWidth
              value={searchKeywords}
              onChange={(_, { value }) => {
                setSearchKeywords(value)
                onChangeSearchKeywords(value)
              }}
            />
          </div>
        }
        <div className="flex items-center justify-end">
          <IconButton className="px-2">
            <NotificationsActiveRoundedIcon />
          </IconButton>
          <Avatar src={selector.profile.avatar} className="mx-2 cursor-pointer" onClick={() => history.push(`/profile`)} />
          <IconButton onClick={(event) => setAnchorEl(event.currentTarget)} className="px-2">
            <ExpandMoreRoundedIcon />
          </IconButton>
          <Menu
            className=""
            anchorEl={anchorEl}
            keepMounted
            open={open}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            getContentAnchorEl={null}
            onClose={() => setAnchorEl(null)}
          >
            {options.map((option, index) => (
              <MenuItem key={index} onClick={option.onClick}>
                <ListItemIcon>
                  <option.icon />
                </ListItemIcon>
                <p>
                  {option.name}
                </p>
              </MenuItem>
            ))}
          </Menu>
        </div>
      </div>
    </>
  )
}

export default Header