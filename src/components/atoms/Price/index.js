import React from "react";

const Price = ({ value, unit = "đ" }) => {
    const style = {
        color: "red"
    };
    return (
        <span style={style}>
            <b>{value.toLocaleString("vi")}</b>
            {unit}
        </span>
    );
};

export default Price;
