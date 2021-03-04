import React from 'react'

import Fieldset from '../../atoms/Fieldset'
import Input from '../../atoms/Input';

const PageSearch = ({
    title = "Search",
    buttonSearchLabel="Search",
    color = "blue",
    loading = false,
    placeholder="Type some thing and enter to search...",
    onSearch,
    value,
    ...rest 
}) => (
    <Fieldset icon="search" title={title}>
        <Input
            placeholder="Type some thing and enter to search..."
            value={value}
            onChange={(_, { value }) => onSearch(value)}
            {...rest}
        />
    </Fieldset>
)

export default PageSearch