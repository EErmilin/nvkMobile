import AsyncStorage from '@react-native-async-storage/async-storage';
import {configureStore} from '@reduxjs/toolkit';
import {persistStore, persistReducer} from 'redux-persist';

import {rootReducer, reducersObj} from './index';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: Object.keys(reducersObj),
  blacklist: ['screens', 'post'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

let persistor = persistStore(store);

export {store, persistor};
