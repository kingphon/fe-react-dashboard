// import React, { useState } from "react";
// import { Button, Popup, Icon } from "semantic-ui-react";

// const ConfirmPopup = ({
//     message = "Are you sure want to do this action?",
//     onPositive,
//     ...rest
// }) => {
//     const [open, setOpen] = useState(false);

//     return (
//         <Popup
//             wide
//             className="confirm-popup"
//             open={open}
//             position="top right"
//             onClose={_ => setOpen(false)}
//             hideOnScroll
//             trigger={
//                 <Icon
//                 {...rest}
//                 onClick={_ => {
//                     setOpen(true);
//                 }}
//                 />
//             }
//             content={
//                 <div>
//                     <b>{message}</b>
//                     <div style={{ display: "block", textAlign: "center", paddingTop: "8px" }} >
//                         <Button
//                             size="mini"
//                             color="green"
//                             content="Yes"
//                             icon="check"
//                             onClick={_ => {
//                                 onPositive();
//                                 setOpen(false);
//                             }}
//                         />
//                         &nbsp;&nbsp;
//                         <Button
//                             size="mini"
//                             color="red"
//                             content="No"
//                             icon="close"
//                             onClick={_ => setOpen(false)}
//                         />
//                     </div>
//                 </div>
//             }
//             on="click"
//         />
//     );
// };

// export default ConfirmPopup;
