import React from "react";

const Fieldset = ({ icon, title, children, ...rest }) => (
  <fieldset
    className="border border-gray-300 my-2 p-2 bg-white"
    {...rest}
  >
    <legend className="font-bold">
      {icon}
      {title}
    </legend>
    {children}
  </fieldset>
);

export default Fieldset;
