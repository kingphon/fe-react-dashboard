import React from 'react'
import { useFormContext, Controller } from "react-hook-form";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField } from '@material-ui/core';

const RHFComboBox = ({
  size = "small",
  width = "100%",
  variant = "outlined",
  style = {},
  margin = "dense",
  label,
  name,
  selectList = [],
  ...rest
}) => {

  const { control, formState } = useFormContext();

  return (
    <Controller
      render={({ field }) => (
        <Autocomplete
          {...field}
          options={selectList}
          getOptionLabel={(option) => (option.label ? option.label : "")}
          getOptionSelected={(option, value) =>
            value === undefined || value === "" || option.value === value.value
          }
          renderInput={(params) => (
            <TextField
              {...params}
              error={!!formState.errors[name]}
              width={width}
              label={label}
              variant={variant}
              margin={margin}
              helperText={formState.errors[name]?.message}
              {...rest}
            />
          )}
          value={field.value}
          onChange={(_, data) => field.onChange(data)}
        />
      )}
      name={name}
      control={control}
    />
  )
}

export default RHFComboBox
