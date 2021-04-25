import React from 'react'
import { useFormContext, Controller } from "react-hook-form";
import { TextField } from '@material-ui/core';

const RHFInput = ({
  size = "small",
  width = "100%",
  variant = "outlined",
  style = {},
  margin = "dense",
  label,
  name,
  defaultValue = "",
  ...rest
}) => {

  const { formState, control } = useFormContext();
  
  return (
    <Controller
      render={({
        field: { onChange, value },
      }) => (
        <TextField
          style={{ width, marginTop: "8px", marginBottom: "8px", ...style }}
          error={!!formState.errors[name]}
          label={formState.errors[name]?.message ?? label}
          margin={margin}
          size={size}
          variant={variant}
          value={value}
          onChange={onChange}
          {...rest}
        />
      )}
      name={name}
      control={control}
      defaultValue={defaultValue}
    />
  )
}

export default RHFInput
