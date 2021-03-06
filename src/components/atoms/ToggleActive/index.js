import React from 'react'
import { Switch, FormGroup, FormControlLabel } from '@material-ui/core';
import { ACTIVE, HIDDEN } from '../../../constants/entities';

const ToggleActive = ({
    labelPlacement = "start",
    color = "primary",
    name = 'status',
    checked = ACTIVE,
    onChange,
    ...rest
}) => (
    <FormGroup>
        <FormControlLabel
            control={
                <Switch
                    checked={checked === ACTIVE}
                    name={name}
                    color={color}
                    onChange={event => {
                        const { currentTarget: { name, checked } } = event
                        onChange(event, { name, value: checked ? ACTIVE : HIDDEN })
                    }}
                    {...rest}
                />
            }
            label={checked === ACTIVE ? 'Hiển thị' : 'Ẩn'}
            labelPlacement={labelPlacement}
        />
    </FormGroup>
)

export default ToggleActive