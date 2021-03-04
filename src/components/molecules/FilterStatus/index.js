import React from 'react'
import Fieldset from '../../atoms/Fieldset'
import { Radio, FormGroup, RadioGroup, FormControlLabel } from '@material-ui/core';
import SortRoundedIcon from '@material-ui/icons/SortRounded';

// import { ALL } from '../../../constants/entites';
const FilterStatus = ({
    children,
    statusValue = "ALL",
    listStatus = [],
    onChangeStatus,
    ...rest
}) => (
    <Fieldset icon={<SortRoundedIcon />} title=" Status" {...rest}>
        {children}
        <div className="flex flex-wrap justify-between">
            <FormGroup row>
                <RadioGroup row
                    onChange={({ currentTarget: { value } }) => onChangeStatus(value)}
                >
                    {listStatus.map(item => (
                        <FormControlLabel
                            control={<Radio color="primary" />}
                            key={item.key}
                            label={item.label}
                            value={item.key}
                            labelPlacement="end"
                            checked={statusValue === item.key}
                        />
                    ))}
                </RadioGroup>
            </FormGroup>
        </div>
    </Fieldset>
)

export default FilterStatus