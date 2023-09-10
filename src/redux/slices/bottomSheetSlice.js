import {createSlice} from '@reduxjs/toolkit';

const bottomSheetSlice = createSlice({
  name: 'bottomSheet',
  initialState: {
    isVisible: false,
  },
  reducers: {
    setIsVisible: (state, action) => {
      state.isVisible = action.payload;
    },
  },
});

export const {setIsVisible} = bottomSheetSlice.actions;
export default bottomSheetSlice.reducer;
