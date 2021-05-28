import React from 'react'
import { useFormContext, Controller } from "react-hook-form";
import { Switch, FormGroup, FormControlLabel } from '@material-ui/core';

const RHFToggleActive = ({
  labelPlacement = "start",
  color = "primary",
  name = 'status',
  ...rest
}) => {

  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={value}
                color={color}
                onChange={(e) => onChange(e.target.checked)}
                {...rest}
              />
            }
            label={value ? 'Hiển thị' : 'Ẩn'}
            labelPlacement={labelPlacement}
          />
        </FormGroup>
      )}
    />
  )
}

export default RHFToggleActive