import React from 'react'
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import BlockRoundedIcon from '@material-ui/icons/BlockRounded';
import Divider from '@material-ui/core/Divider';

const ProfileFormEntity = ({
  onClickEdit,
  label,
  value,
  name,
  canEdit = true,
  children,
  ...rest
}) => (
  <div>
    <div
      className="flex justify-between hover:bg-gray-300 p-3 m-3 cursor-pointer"
      onClick={() => onClickEdit(name)}
    >
      <p>{label}</p>
      <p>{value}</p>
      {canEdit ? <EditRoundedIcon /> : <BlockRoundedIcon />}
    </div>
    {children}
    <Divider />
  </div>
)

export default ProfileFormEntity