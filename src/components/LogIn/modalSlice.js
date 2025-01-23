import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    isOpenModal: false,
  },
  reducers: {
    openModal: (state) => {
      console.log("openModal reducer called");
      state.isOpenModal = true;
    },
    closeModal: (state) => {
      state.isOpenModal = false;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
