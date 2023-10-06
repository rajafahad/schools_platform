import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modals: {},
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal(state, action) {
      const { modalName, modalProps } = action.payload;
      state.modals[modalName] = {
        isOpen: true,
        modalProps: modalProps || {},
      };
    },
    closeModal(state, action) {
      const { modalName } = action.payload;
      delete state.modals[modalName];
    },

    toggleModal(state, action) {
      const { modalName, modalProps } = action.payload;
      if (state.modals[modalName]) {
        // If modal is already open, close it
        delete state.modals[modalName];
      } else {
        // If modal is closed, open it
        state.modals[modalName] = {
          isOpen: true,
          modalProps: modalProps || {},
        };
      }
    },
    // shouldUpdateData(state, action) {
    //   const { modalName, modalProps } = action.payload;
    //   state.modals[modalName] = {
    //     shouldUpdateData: true,
    //     modalProps: modalProps || {},
    //   };
    // },


  },
});

export const { openModal, closeModal ,toggleModal,shouldUpdateData } = modalSlice.actions;
export default modalSlice.reducer;
