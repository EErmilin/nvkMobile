import {createSlice} from '@reduxjs/toolkit';

const bottomSheetSlice = createSlice({
  name: 'bottomSheet',
  initialState: {
    reviewModalRef: null,
    isOpen: false,
  },
  reducers: {
    setRef: (state, action) => {
      state.reviewModalRef = action.payload;
    },
  },
});

export const {setRef} = bottomSheetSlice.actions;
export default bottomSheetSlice.reducer;
