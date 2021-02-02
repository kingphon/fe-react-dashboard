import React from 'react'

const Image = ({
    alt = "",
    width = 'auto',
    height = 'auto',
    style = {},
    circle = false,
    ...rest
}) => (
    <img style={{
        width: '100%', 
        width,
        height,
        border: '6px #f0f0f0 solid',
        borderRadius: circle ? '50%' : '0',
        ...style }} {...rest} alt={alt}
    />
)

export default Image