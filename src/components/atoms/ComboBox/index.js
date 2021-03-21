import React from 'react'
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';

const ComboBox = ({
  required,
  variant = "outlined",
  label,
  name,
  error,
  value,
  onChange,
  selectList,
  color = 'primary', ...rest }) => (
  <FormControl variant={variant} error={error} required={required} {...rest}>
    <InputLabel>{label}</InputLabel>
    <Select
      value={value}
      onChange={onChange}
      label={label}
      name={name}
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