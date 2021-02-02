import React from 'react'

const ErrorLine = ({ style, message, ...rest }) => ( 
    <span style={{ display: 'block', color: '#f44336', ...rest }}>{message}</span>
)

export default ErrorLine