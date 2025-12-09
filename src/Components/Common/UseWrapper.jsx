import React from "react";

function UseWrapper(arg) {
  let children = arg;
  let title = null;

  // Check if used as a component <UseWrapper ... />
  // In this case, arg is the props object.
  // We assume it's props if it's an object, not a valid React element, and not an array.
  if (arg && typeof arg === 'object' && !React.isValidElement(arg) && !Array.isArray(arg)) {
    children = arg.children;
    title = arg.title;
  }

  return (
    <div className="wrapper">
      {
        (title && title !== "") && <div className="page-title">
          <h1>{title}</h1>
        </div>
      }
      {children}
    </div>
  );
}

export default UseWrapper;
