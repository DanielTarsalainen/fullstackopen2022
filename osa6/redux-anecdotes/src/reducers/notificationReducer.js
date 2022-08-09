import { createSlice } from "@reduxjs/toolkit";

const initialState = "";
let ongoingClearTimeouts = [];

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    showNotification(state, action) {
      return (state = action.payload);
    },
    removeNotification(state) {
      ongoingClearTimeouts = [];
      return (state = "");
    },
  },
});

export const setNotification = (text, time) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(showNotification(text));
    }, 200);

    const id = setTimeout(() => {
      dispatch(removeNotification());
    }, time * 1000);

    ongoingClearTimeouts.push(id);

    if (ongoingClearTimeouts.length > 1) {
      clearTimeout(ongoingClearTimeouts.at(-2));
      ongoingClearTimeouts.shift();
    }
  };
};

export const { showNotification, removeNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;
