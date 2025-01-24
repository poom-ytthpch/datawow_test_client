import { User } from "@/types";
import { createSlice } from "@reduxjs/toolkit";


const initialState: User = {
  id: 0,
  username: "",
};

const authrSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signin: (state, action) => {
      const { id, username } = action.payload;
      state.id = id;
      state.username = username;
    },
  },
});

export const { signin } = authrSlice.actions;

export default authrSlice.reducer;
