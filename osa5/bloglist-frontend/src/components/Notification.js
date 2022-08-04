import React from "react";
import PropTypes from "prop-types";

const Notification = ({ notificationMessage, notificationColor }) => {
  if (notificationMessage === null) {
    return null;
  }

  return (
    <div className="error" style={notificationColor}>
      {notificationMessage}
    </div>
  );
};

Notification.propTypes = {
  notificationColor: PropTypes.object.isRequired,
};

export default Notification;
