import {createSlice} from '@reduxjs/toolkit';
import {Appearance} from 'react-native';

import {IThemeState} from '../types/ThemeTypes';

const initialState: IThemeState = {
  theme: Appearance.getColorScheme() ?? 'light',
  text: 'Системная',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme(state, action) {
      state.text = action.payload;
      if (action.payload === 'Светлая') {
        state.theme = 'light';
      } else {
        if (action.payload === 'Темная') {
          state.theme = 'dark';
        } else {
          state.theme = Appearance.getColorScheme() ?? 'light';
        }
      }
    },
  },
});

export const {setTheme} = themeSlice.actions;
export default themeSlice.reducer;
