import { Event as CalendarEvent } from 'react-big-calendar';

export interface Event extends CalendarEvent {
  id: string;
}

export interface CalendarProps {
  events?: Event[];
  date?: Date;
}
