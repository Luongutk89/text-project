import { configureStore } from '@reduxjs/toolkit';
import notesReducer from './slice/notesSlice';

export const store = configureStore({
    reducer: {
        notes: notesReducer,
    },
})