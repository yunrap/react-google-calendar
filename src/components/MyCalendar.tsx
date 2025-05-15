import React, { useCallback, useMemo, useState } from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/ko';
import 'moment-timezone';
import EventDetailModal from './EventDetailModal';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { CalendarProps, Event } from '../types/calendar';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

moment.tz.setDefault('Asia/Seoul');
moment.locale('ko');
const localizer = momentLocalizer(moment);

const MyCalendar: React.FC<CalendarProps> = ({ date }) => {
  const events = useSelector((state: RootState) => state.events.events);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const calendarViews = useMemo(() => [Views.WEEK], []);

  const handleSelectEvent = useCallback((event: Event) => {
    setSelectedEvent(event);
  }, []);

  return (
    <div className="h-[calc(100vh-6rem)] sm:h-full sm:my-3 mx-4 overflow-auto">
      <Calendar
        date={date}
        toolbar={false}
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
