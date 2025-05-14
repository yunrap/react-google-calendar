import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DateState {
  currentDate: string;
}

const initialState: DateState = {
  currentDate: new Date().toISOString(),
};

const dateSlice = createSlice({
  name: 'date',
  initialState,
  reducers: {
    setDate: (state, action: PayloadAction<string>) => {
      state.currentDate = action.payload;
    },
  },
});

export const { setDate } = dateSlice.actions;
export default dateSlice.reducer;
