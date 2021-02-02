// import React, { useState } from "react";
// import { Icon } from "semantic-ui-react";
// import FormInput from "./FormInput";

// const FormInputPassword = ({ onChange, ...rest }) => {
//     const [displayIcon, setDisplayIcon] = useState(false);
//     const [show, setShow] = useState(false);

//     return (
//         <FormInput
//             type={show ? "text" : "password"}
//             icon={
//                 displayIcon ? (
//                 <Icon
//                     name={show ? "eye" : "eye slash"}
//                     link
//                     onMouseDown={_ => setShow(true)}
//                     onMouseUp={_ => setShow(false)}
//                 />
//                 ) : null
//             }
//             onChange={(e, input) => {
//                 if (input.value) {
//                 setDisplayIcon(true);
//                 } else {
//                 setDisplayIcon(false);
//                 }
//                 onChange(input.value);
//             }}
//             {...rest}
//         />
//     );
// };

// export default FormInputPassword;
