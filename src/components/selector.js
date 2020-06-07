import React from "react";

const Selector = ({ activePage }) => {
  const len = activePage.length;
  let text = "{";
  for (let i = 0; i < len + 2; ++i) {
    text += "&nbsp;&nbsp;&nbsp;";
  }
  text += "}";
  return (
    <span dangerouslySetInnerHTML={{ __html: text }} id="nav-hover-selector">
    </span>
  );
};

export default Selector;
