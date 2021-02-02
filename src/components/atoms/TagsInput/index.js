import React, { useState } from 'react'
import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

const TagsInput = ({
    style = {},
    label = "Tags",
    multiple = true,
    name = "tags",
    options = [],
    source = [],
    noOptionsText = "Not Found",
    filterSelectedOptions = true,
    size='small',
    inputLabel = 'Select Box',
    renderInput,
    value: valueItems = [],
    onChange,
    ...rest
}) => {
    const [tags, setTags] = useState(source)

    const [noOptionsTextState, setNoOptionsTextState] = useState(noOptionsText)

    const [inputValue, setInputValue] = useState('')

    const [addedTags, setAddedTags] = useState(new Map())

    const handleSelectTags = ({ keyCode, target: { value }}) => {
        setNoOptionsTextState(`Enter to create tag '${value}'`)
        if (keyCode === 13 && value) {
            if (tags.findIndex(item => item.name === value) === -1) {
                tags.push({ name: value })
                setTags(tags)
                valueItems.push({ name: value })
                addedTags.set(value, value)
                setAddedTags(new Map(addedTags))
                onChange(value, { name, value: valueItems })
                setInputValue('')
            } else {
                setNoOptionsTextState(`Tag '${value}' is exist`)
            }
        }
    }

    const handleOnChange = (e, value = []) => {
        let map = new Map()
        value.forEach(item => {
            map.set(item.name, item.name)
        })
        setAddedTags(new Map(map))
        onChange(e, { name, value })
    }

    return (
        <Autocomplete
            style={{ width: "100%", marginTop: "8px", marginBottom: "8px", ...style }}
            size={size}
            title={label}
            options={tags.filter(item => addedTags.get(item.name) !== item.name)}
            autoHighlight
            getOptionLabel={option => option.name}
            multiple={multiple}
            noOptionsText={noOptionsTextState}
            filterSelectedOptions={filterSelectedOptions}
            includeInputInList
            inputValue={inputValue}
            onInputChange={(_, value) => setInputValue(value)}
            renderInput={params => (
                <TextField
                    {...params}
                    label={label}
                    variant="outlined"
                    fullWidth
                    onKeyUp={handleSelectTags}
                />
            )}
            value={valueItems}
            onChange={handleOnChange}
            {...rest}
        />
    )
}

export default TagsInput