import React from 'react'
import { Icon as IconMaterial } from '@material-ui/core';

const Icon = ({ name = '', ...rest }) => (
    <IconMaterial className={`fa fa-${name}`} {...rest} />
)

export default Icon