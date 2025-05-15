import React, { useCallback, useMemo, useState } from 'react';
import { Calendar, momentLocalizer, Views, HeaderProps } from 'react-big-calendar';
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

const WeekHeader = ({ date: headerDate, localizer }: HeaderProps) => {
  const calendarDate = useSelector((state: RootState) => state.date.calendarDate);
  const isCurrentDay = moment(headerDate).isSame(moment(calendarDate), 'day');

  return (
    <div className="flex flex-col items-center">
      <span className="text-gray-700">{localizer.format(headerDate, 'dddd')}</span>
      <span
        className={`w-8 h-8 flex items-center justify-center rounded-full ${
          isCurrentDay ? 'bg-blue-500 text-white' : ''
        }`}
      >
        {localizer.format(headerDate, 'D')}
      </span>
    </div>
  );
};

const MyCalendar: React.FC<CalendarProps> = ({ date }) => {
  const events = useSelector((state: RootState) => state.events.events);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const calendarViews = useMemo(() => [Views.WEEK], []);

  const handleSelectEvent = useCallback((event: Event) => {
    setSelectedEvent(event);
  }, []);

  return (
    <div className="h-[calc(100vh-6rem)] sm:h-full sm:my-3  overflow-auto">
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
        components={{
          week: {
            header: WeekHeader,
          },
        }}
      />
      {selectedEvent && (
        <EventDetailModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      )}
    </div>
  );
};

export default MyCalendar;
