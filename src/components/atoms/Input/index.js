import React from 'react'
import { useFormContext, Controller } from "react-hook-form";
import { TextField } from '@material-ui/core';

// const { control } = useFormContext();
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
  // register,
  ...rest
}) => {
  
  return (
  // <Controller
  //   as={TextField}
  //   name={name}
  //   control={control}
  //   defaultValue=""
  //   label={label}
  //   fullWidth={true}
  //   {...props}
  // />

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
)}

export default Input