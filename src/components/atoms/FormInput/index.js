// import React, { useState, useEffect } from "react";
// import { Form } from "semantic-ui-react";
// import styles from "./styles.module.scss";

// const FormInput = ({
//     type,
//     pattern,
//     patternErrorMessage,
//     onChange,
//     error,
//     required,
//     ...rest
// }) => {
//     const [errorState, setErrorState] = useState(error);

//     const handleOnChange = (e, input) => {
//         const value = input.value;
//         setErrorState("");

//         if (!value && required) {
//             return returnOnChange(e, input, "Field is Required");
//         }

//         const validateTypeResult = validateValueType(type, value);
//         if (validateTypeResult) {
//             return returnOnChange(e, input, validateTypeResult);
//         }

//         if (!value.match(new RegExp(pattern, "g"))) {
//             return returnOnChange(e, input, patternErrorMessage);
//         }

//         onChange(e, input, "")
//     };

//     const returnOnChange = (e, input, errorMessage) => {
//         setErrorState(errorMessage);
//         onChange(e, input, errorMessage);
//         return false;
//     };

//     const validateValueType = (type, value) => {
//         switch (type) {
//         case "email":
//             return !validateEmail(value) ? "Email không hợp lệ" : "";
//         case "url":
//             return !validateUrl(value) ? "Url không hợp lệ" : "";
//         default:
//             return "";
//         }
//     };

//     const validateUrl = url => {
//         const pattern = new RegExp(
//         "^(https?:\\/\\/)?" + // protocol
//         "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
//         "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
//         "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
//         "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
//             "(\\#[-a-z\\d_]*)?$",
//         "i"
//         );
//         return !!pattern.test(url);
//     };

//     const validateEmail = email => {
//         var re = /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//         return re.test(String(email).toLowerCase());
//     };

//     useEffect(() => {
//         setErrorState(error);
//     }, [error]);

//     return (
//         <Form.Input
//             type={type}
//             className={styles.root}
//             {...rest}
//             error={errorState ? errorState : false}
//             required={required}
//             onChange={handleOnChange}
//         />
//     );
// };

// export default FormInput;
