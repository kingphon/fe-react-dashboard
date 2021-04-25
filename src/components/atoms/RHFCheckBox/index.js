import React from 'react'
import { useFormContext, Controller } from "react-hook-form";
import { FormControlLabel, Checkbox } from '@material-ui/core';

const RHFCheckBox = ({
  name,
  label,
  color = 'primary',
  ...rest
}) => {

  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <FormControlLabel
          control={
            <Checkbox
              onChange={(e) => onChange(e.target.checked)}
              checked={value}
              color={color}
              {...rest}
            />
          }
          label={label}
        />
      )}
    />
  )
}

export default RHFCheckBox