import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isModalOpen: false,
  selectedGameId: '',
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setOpenModal: (state) => {
      state.isModalOpen = true;
    },

    setCloseModal: (state) => {
      state.isModalOpen = false;
    },

    setGameId: (state, action) => {
      state.selectedGameId = action.payload;
    },
  },

  selectors: {
    selectIsModalOpen: (state) => state.isModalOpen,
    selectGameId: (state) => state.selectedGameId,
  },
});

export const { setOpenModal, setCloseModal, setGameId } = modalSlice.actions;
export const { selectIsModalOpen, selectGameId } = modalSlice.selectors;
export default modalSlice.reducer;
