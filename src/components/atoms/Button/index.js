import React from 'react'
import MaterialButton from '@material-ui/core/Button';
import { CircularProgress } from '@material-ui/core';

const Button = ({
    loading,
    color = 'primary',
    variant = 'contained',
    iconLabel = false,
    icon,
    content,
    children,
    ...rest
}) => {
    return loading ? <LoadingButton content={content ? content : children} /> : (
        <MaterialButton 
            color={color}
            variant={variant}
            startIcon={icon}
            {...rest}
        >
            {content ? content : children}
        </MaterialButton>
    )
}

const LoadingButton = ({ content }) => (
    <MaterialButton
        disabled
        variant="contained"
    >
        <CircularProgress size={15} />&nbsp;&nbsp;{content}
    </MaterialButton>
)

export default Button