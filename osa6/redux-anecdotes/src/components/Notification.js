import { connect } from "react-redux";

const Notification = ({ notification }) => {
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };

  return <div style={style}>{notification} </div>;
};

const notificationStateToProps = (state) => {
  return {
    notification: state.notifications,
  };
};

const ConnectedNotifications = connect(notificationStateToProps)(Notification);

export default ConnectedNotifications;
