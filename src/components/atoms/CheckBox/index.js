import React from 'react'
import { FormControlLabel, Checkbox } from '@material-ui/core';

const CheckBox = ({ label, color = 'primary', ...rest }) => (
    <FormControlLabel
        control={
            <Checkbox
                color={color}
                {...rest}
            />
        }
        label={label}
    />
)

export default CheckBox