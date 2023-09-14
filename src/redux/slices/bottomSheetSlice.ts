import {createSlice} from '@reduxjs/toolkit';

const bottomSheetSlice = createSlice({
  name: 'bottomSheet',
  initialState: {
    reviewSheet: null,
    isOpen: true,
  },
  reducers: {
    setOpen: (state, action) => {
      state.isOpen = action.payload;
    },
  },
});

export const {setReview, setOpen} = bottomSheetSlice.actions;
export default bottomSheetSlice.reducer;
