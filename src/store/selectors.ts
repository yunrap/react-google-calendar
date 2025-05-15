import { createSelector } from '@reduxjs/toolkit';
import { RootState } from './store';

export const selectCalendarDate = (state: RootState) => state.date.calendarDate;

export const selectCurrentDate = createSelector(
  selectCalendarDate,
  (calendarDate) => new Date(calendarDate)
);
