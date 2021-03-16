import React from 'react'
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';

const ComboBox = ({
  required,
  variant = "outlined",
  label,
  error,
  value,
  onChange,
  selectList,
  color = 'primary', ...rest }) => (
  <FormControl variant={variant} error={error} required={required} className="w-full my-2">
    <InputLabel>{label}</InputLabel>
    <Select
      value={value}
      onChange={onChange}
      label={label}
    >
      {selectList.map((select, index) =>
        <MenuItem
          key={index}
          value={select.value}>
          {select.label}
        </MenuItem>
      )}
    </Select>
  </FormControl>
)

export default ComboBox