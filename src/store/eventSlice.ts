import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Event as CalendarEvent } from 'react-big-calendar';

interface Event extends CalendarEvent {
  id: string;
}

interface EventState {
  events: Event[];
}

const initialState: EventState = {
  events: [],
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
