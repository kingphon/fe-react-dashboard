// import React, { useState, useEffect } from "react";
// import { Form } from 'semantic-ui-react'
// import Slug from "../Slug";
// import { makeSlug } from "../../../commons/utils";
// import './style.css'

// const FormInputSlug = ({
//     onChange,
//     required = false,
//     defaultValue = '',
//     slugValue = '',
//     error = '',
//     slugError = '',
//     ...rest
// }) => {

//     const [state, setState] = useState({
//         defaultValue,
//         tempSlugValue: '',
//         slugValue,
//         error,
//         slugError
//     })

//     useEffect(state => {
//         setState({ ...state, defaultValue, error })
//     }, [defaultValue, error, slugValue, slugError])
//     // react-hooks/exhaustive-deps

//     const handleChangeValue = (e, input) => {
//         setState({ ...state, tempSlugValue: makeSlug(input.value)})
//         if (required && !input.value) {
//             setState({ ...state, error: "Field is required" })
//             onChange(e, input, "Field is required", slugValue, '')
//         } else {
//             onChange(e, input, '', slugValue, '')
//         }
//     }
    
//     return (
//         <div className="input-slug">
//             <Form.Input
//                 onChange={handleChangeValue}
//                 defaultValue={defaultValue}
//                 error={error ? error : false}
//                 {...rest}
//             />
//             {state.tempSlugValue && <Slug>{state.tempSlugValue}</Slug>}
//         </div>
//     );
// }

// export default FormInputSlug;
