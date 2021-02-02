import React from 'react'
import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

const SelectSearch = ({
    style = {},
    required = false,
    label = '',
    size='small',
    renderInput,
    ...rest
}) => (
    <Autocomplete
        size={size}
        title={label}
        autoHighlight
        style={{ width: "100%", marginTop: "8px", marginBottom: "8px", ...style }}
        renderInput={params => (
            <TextField {...params} required={required} label={label} variant="outlined" fullWidth />
        )}
        {...rest}
    />
)

export default SelectSearch