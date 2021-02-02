import React from 'react'
import { FormGroup as FormGroupMaterial } from '@material-ui/core';

const FormGroup = ({ style = {}, ...rest }) => (
    <FormGroupMaterial
        style={{ justifyContent: 'space-between', ...style }}
        {...rest}
    />
)

export default FormGroup