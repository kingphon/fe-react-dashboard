import React from 'react'
import { TextField } from '@material-ui/core';

const Input = ({
  size = "small",
  width = "100%",
  variant = "outlined",
  style = {},
  margin = "dense",
  errors,
  register,
  label,
  onChange,
  value = '',
  ...rest
}) => (
  <TextField
    style={{ width, marginTop: "8px", marginBottom: "8px", ...style }}
    error={!!errors}
    label={label}
    margin={margin}
    size={size}
    variant={variant}
    value={value}
    onChange={e => onChange(e, e.currentTarget)}
    // inputRef={register}
    {...rest} />
)

export default Input