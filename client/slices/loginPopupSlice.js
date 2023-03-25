import { createSlice } from "@reduxjs/toolkit";

const loginPopupSlice = createSlice({
   name: "loginPopupVisibility",
   initialState: { visible: false },
   reducers: {
      changeVisibility: (state) => {
       console.log("change visibility called");
      if(state.visible==false){
         state.visible=true;
      }
      else{
         state.visible=false;
      }
    },
  },
});

export default loginPopupSlice;
