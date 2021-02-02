import React from 'react'
import { TextField } from '@material-ui/core';

const Input = ({
  size = "small",
  width = "100%",
  variant = "outlined",
  style = {},
  margin = "dense",
  error = '',
  onChange,
  value = '',
  ...rest
}) => (
  <TextField
    style={{ width, marginTop: "8px", marginBottom: "8px", ...style }}
    error={!!error}
    margin={margin}
    size={size}
    variant={variant}
    helperText={error}
    value={value}
    onChange={e => onChange(e, e.currentTarget)}
    {...rest} />
)

export default Input