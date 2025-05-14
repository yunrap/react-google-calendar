import {
  Calendar,
  momentLocalizer,
  Event as CalendarEvent,
  Views,
  NavigateAction,
  View as CalendarView,
} from 'react-big-calendar';
import { useSelector } from 'react-redux';
import moment from 'moment';
import 'moment/locale/ko';
import 'moment-timezone';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useMemo, useState } from 'react';
import { RootState } from '../store/store';
import EventDetailModal from './EventDetailModal';

moment.tz.setDefault('Asia/Seoul');
moment.locale('ko');
const localizer = momentLocalizer(moment);

interface Event extends CalendarEvent {
  id: string;
}

interface MyCalendarProps {
  events?: Event[];
  date?: Date;
  onNavigate?: (date: Date, view: CalendarView, action: NavigateAction) => void;
}

const MyCalendar: React.FC<MyCalendarProps> = ({ date, onNavigate }) => {
  const events = useSelector((state: RootState) => state.events.events);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const { views: calendarViews } = useMemo(
    () => ({
      views: [Views.WEEK],
    }),
    []
  );

  const handleNavigate = (newDate: Date, view: CalendarView, action: NavigateAction) => {
    if (onNavigate) {
      onNavigate(newDate, view, action);
    }
  };

  const handleSelectEvent = (event: CalendarEvent) => {
    setSelectedEvent(event as Event);
  };

  return (
    <div className="h-full mx-4 overflow-auto">
      <Calendar
        date={date}
        toolbar={false}
        onNavigate={handleNavigate}
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        culture="ko"
        defaultView={Views.WEEK}
        views={calendarViews}
        onSelectEvent={handleSelectEvent}
      />
      {selectedEvent && (
        <EventDetailModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      )}
    </div>
  );
};

export default MyCalendar;
