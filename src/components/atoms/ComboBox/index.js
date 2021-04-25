import React from 'react'
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { useAutocomplete } from '@material-ui/lab';

const ComboBox = ({
  required,
  variant = "outlined",
  label,
  name,
  error,
  value = "",
  inputValue = "",
  onChange,
  onChangeInputValue,
  selectList,
  color = 'primary', ...rest }) => {
  return (
    <Autocomplete
      inputValue={inputValue}
      onInputChange={onChangeInputValue}
      value={selectList.find(option => option.value === value)}
      onChange={onChange}
      options={selectList}
      getOptionLabel={(option) => option.label}
      renderInput={(params) => {
        console.log(params)
        return (<TextField
          {...params}
          value={value}
          onChange={onChange}
          label={label}
          variant={variant}
          required={required}
          error={error}
        />)
      }}
      {...rest}
    />
    /* <FormControl variant={variant} error={error} required={required} {...rest}>
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
    </FormControl> */
  )
}

export default ComboBox