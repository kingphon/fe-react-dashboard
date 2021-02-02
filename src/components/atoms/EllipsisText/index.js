import React from 'react';

const EllipsisText = ({ line = 2, children, ...rest }) => (
    <span
        style={{ 
            'display': '-webkit-box',
            'display': 'box',
            'line-clamp': {line},
            '-webkit-line-clamp': {line},
            'box-orient': 'vertical',
            '-webkit-box-orient': 'vertical', 
            'overflow': 'hidden'
        }}
        {...rest}
    >{children}</span>
);

export default EllipsisText;
