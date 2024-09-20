import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const CustomToolTip = ({ children, message, position = "top" }) => {
  return (
    <OverlayTrigger
      placement={position}
      overlay={<Tooltip id="tooltip">{message}</Tooltip>}
    >
      {children}
    </OverlayTrigger>
  );
};

export default CustomToolTip;
