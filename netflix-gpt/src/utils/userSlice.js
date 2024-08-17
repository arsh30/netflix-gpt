import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    // as soon as we login, this addUser (Reducer fun) will be called
    addUser: (state, action) => {
      return action.payload;
    },

    removeUser: (state, action) => {
      // when we click on signout then this action called
      return null;
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
