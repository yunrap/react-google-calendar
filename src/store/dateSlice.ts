import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DateState {
  calendarDate: string;
}

const initialState: DateState = {
  calendarDate: new Date().toISOString(),
};

const dateSlice = createSlice({
  name: 'date',
  initialState,
  reducers: {
    setCalendarDate: (state, action: PayloadAction<string>) => {
      // 왼쪽 캘린더
      state.calendarDate = action.payload;
    },
  },
});

export const { setCalendarDate } = dateSlice.actions;
export default dateSlice.reducer;
