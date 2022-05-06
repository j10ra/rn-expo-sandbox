import { createSlice, configureStore } from '@reduxjs/toolkit';

interface IAktivReducer {
  aktiv: any;
}

/**
 * Aktiv Slice
 */
export const slice = createSlice({
  name: 'aktiv',
  initialState: {
    imageDetails: {},
  },
  reducers: {
    setImageDetails: (state, { payload }) => {
      state.imageDetails = { ...payload };
    },
  },
});

export const { setImageDetails } = slice.actions;
export const getImageData = ({ aktiv }: IAktivReducer) => aktiv.imageDetails;
export const store = configureStore({
  reducer: {
    aktiv: slice.reducer,
  },
});
