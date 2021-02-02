import React from 'react'
import { Chip } from '@material-ui/core';

const StatusLabel = ({ color, text }) => (
    <Chip
        style={{ color: "#fff", backgroundColor: color }}
        label={text} 
    />
)

export default StatusLabel