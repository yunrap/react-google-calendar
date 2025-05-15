import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Event } from '../types/calendar';

interface EventState {
  events: Event[];
  selectedEvent: Event | null;
}

const initialState: EventState = {
  events: [],
  selectedEvent: null,
};

const eventSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    addEvent: (state, action: PayloadAction<Event>) => {
      state.events.push(action.payload);
    },
    setEvents: (state, action: PayloadAction<Event[]>) => {
      state.events = action.payload;
    },
    updateEvent: (state, action: PayloadAction<{ id: string | number; event: Event }>) => {
      const index = state.events.findIndex((e) => e.id === action.payload.id);
      if (index !== -1) {
        state.events[index] = action.payload.event;
      }
    },
    deleteEvent: (state, action: PayloadAction<string | number>) => {
      state.events = state.events.filter((event) => event.id !== action.payload);
    },
  },
});

export const { addEvent, deleteEvent } = eventSlice.actions;
export default eventSlice.reducer;
