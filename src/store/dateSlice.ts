import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DateState {
  currentDate: Date;
  calendarDate: Date;
}

const initialState: DateState = {
  currentDate: new Date(),
  calendarDate: new Date(),
};

const dateSlice = createSlice({
  name: 'date',
  initialState,
  reducers: {
    setDate: (state, action: PayloadAction<Date>) => {
      // 오른쪽 캘린더
      state.currentDate = action.payload;
    },
    setCalendarDate: (state, action: PayloadAction<Date>) => {
      // 왼쪽 캘린더
      state.calendarDate = action.payload;
    },
  },
});

export const { setDate, setCalendarDate } = dateSlice.actions;
export default dateSlice.reducer;
