import React, { useEffect } from 'react'
import NotificationsActiveRoundedIcon from '@material-ui/icons/NotificationsActiveRounded';
import ArrowDropDownRoundedIcon from '@material-ui/icons/ArrowDropDownRounded';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import AddBoxRoundedIcon from '@material-ui/icons/AddBoxRounded';

import Button from '../../atoms/Button'
import Input from '../../atoms/Input'

const Header = ({ headerName, createButtonLoading, headerLogo, onOpenCreate }) => {
  return (
    <>
      <div className="h-16 bg-white p-4 px-6 flex items-center justify-between top-0 sticky z-50">
        <div className="flex items-center w-1/4 justify-around">
          <div className="flex items-center">
            <h3>{headerName}</h3>&nbsp;
                {headerLogo}
          </div>
          <Button
            endIcon={<AddBoxRoundedIcon />}
            color="default"
            onClick={onOpenCreate}
            loading={createButtonLoading}
          >
            Thêm
          </Button>
        </div>
        <div className="flex items-center w-2/4 px-2">
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
          />
        </div>
        <div className="flex items-center w-1/4 justify-around">
          <h3 className="cursor-pointer">Tài khoản</h3>
          <Button startIcon={<NotificationsActiveRoundedIcon />} endIcon={<ArrowDropDownRoundedIcon className="-ml-5" />} color="default" />
          <h3 className="cursor-pointer">Đăng xuất</h3>
        </div>
      </div>
    </>
  )
}

export default Header