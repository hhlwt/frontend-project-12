/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const modalsSlice = createSlice({
  name: 'modals',
  initialState: {
    currentModal: null,
    modalShow: false,
    modalProps: {},
  },
  reducers: {
    setCurrentModal(state, { payload }) {
      state.modalShow = true;
      state.currentModal = payload.currentModal;
      state.modalProps = payload.modalProps;
    },
    hideModal(state) {
      state.modalShow = false;
      state.currentModal = null;
      state.modalProps = {};
    },
  },
});

export const selectModalsState = (state) => state.modals;
export const { setCurrentModal, hideModal } = modalsSlice.actions;
export default modalsSlice.reducer;
