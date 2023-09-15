import {createSlice} from '@reduxjs/toolkit';

const bottomSheetSlice = createSlice({
  name: 'bottomSheet',
  initialState: {
    isOpen: true,
  },
  reducers: {
    setOpen: (state, action) => {
      state.isOpen = action.payload;
    },
  },
});

export const {setOpen} = bottomSheetSlice.actions;
export default bottomSheetSlice.reducer;
