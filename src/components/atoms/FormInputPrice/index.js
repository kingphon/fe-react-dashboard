import React, { useState } from "react";
import FormInput from "./FormInput";

const FormInputPrice = ({ defaultValue, onChange, ...rest }) => {
    const [value, setValue] = useState(defaultValue);

    return (
        <FormInput
            type="text"
            icon="money bill alternate outline"
            onChange={(e, input) => {
                const valueReal = input.value.split(".").join("");
                const price = Number(valueReal);
                if (price) {
                    setValue(price.toLocaleString("vi"));
                    onChange(price);
                } else {
                    onChange(value);
                }
            }}
            value={value}
            {...rest}
        />
    );
};

export default FormInputPrice;
