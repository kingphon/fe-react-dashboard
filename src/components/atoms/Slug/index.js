import React from 'react'

const Slug = ({ children, ...rest }) => (
    <i className="slug-display" {...rest}>
        http://domain.com/{children}.html
    </i>
)

export default Slug