// import React, { useRef } from "react";
// import { Form, Icon } from "semantic-ui-react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import "./styles.module.css";

// const DatePickerModule = ({
//     label,
//     fluid = false,
//     onChange,
//     value,
//     ...rest
// }) => {
//     const datePicker = useRef(null);

//     return (
//         <Form.Field className={`atoms-datepicker${fluid ? ` fluid` : ``}`}>
//             <label>{label}</label>
//             <DatePicker
//                 ref={datePicker}
//                 selected={value}
//                 onChange={onChange}
//                 onSelected={onChange}
//                 {...rest}
//             />
//             <Icon
//                 name="calendar alternate outline"
//                 onClick={_ => datePicker.current.input.click()}
//             />
//         </Form.Field>
//     );
// };

// export default DatePickerModule;
