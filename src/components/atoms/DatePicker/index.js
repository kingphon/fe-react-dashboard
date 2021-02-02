import React from "react";
import { KeyboardDatePicker, KeyboardDateTimePicker, KeyboardTimePicker } from "@material-ui/pickers";

const DatePicker = ({ 
    size="small",
    variant = "inline",
    inputVariant = "outlined",
    style = {},
    type = 'date',
    disableToolbar = true,
    name = 'date',
    margin = 'dense',
    format = 'dd/MM/yyyy',
    autoOk = true,
    value = new Date(),
    onChange,
    ...rest
}) => {
    let DatePickerOption = KeyboardDatePicker

    switch (type) {
        case 'date':
            DatePickerOption = KeyboardDatePicker
            break;
        case 'date-time': {
            DatePickerOption = KeyboardDateTimePicker
            format = 'HH:mm dd/MM/yyyy'
            break;
        }
        case 'time': {
            DatePickerOption = KeyboardTimePicker
            format = 'HH:mm'
            break;
        }
        default:
            break;
    }

    return (
        <DatePickerOption
            style={{ width: "100%", marginTop: "8px", marginBottom: "8px", ...style }}
            disableToolbar
            size={size}
            variant={variant}
            inputVariant={inputVariant}
            autoOk={autoOk}
            format={format}
            margin={margin}
            value={value}
            onChange={value => {
                onChange(value, { name, value })
            }}
            {...rest}
        />
    )
}

export default DatePicker