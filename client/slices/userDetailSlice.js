import { createSlice } from "@reduxjs/toolkit";

const userDetailSlice = createSlice({
  name: "userDetails",
  initialState: { },
  reducers: {
    userDetailUpdate:(state, action)=>{
        state.userDetails=action.payload;
    },
signOutUser:(state)=>{
    console.log("signOutCalled");
    state.userDetails={}
}
  },
});

export default userDetailSlice;
