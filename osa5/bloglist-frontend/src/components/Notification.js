import React from "react";

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

export default Notification;
