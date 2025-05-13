import {
  Calendar,
  momentLocalizer,
  Event,
  Views,
  NavigateAction,
  View as CalendarView,
} from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/ko';
import 'moment-timezone';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useMemo } from 'react';
import CustomToolbar from './CustomToolbar';

moment.tz.setDefault('Asia/Seoul');
moment.locale('ko');
const localizer = momentLocalizer(moment);

interface MyCalendarProps {
  events?: Event[];
  date?: Date;
  onNavigate?: (newDate: Date, view: CalendarView, action: NavigateAction) => void;
}

const MyCalendar: React.FC<MyCalendarProps> = ({ events = [], date, onNavigate }) => {
  const { views: calendarViews } = useMemo(
    () => ({
      views: [Views.WEEK],
    }),
    []
  );

  return (
    <div className="" style={{ height: '500px' }}>
      <Calendar
        date={date}
        onNavigate={onNavigate}
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        culture="ko"
        defaultView={Views.WEEK}
        views={calendarViews}
        components={{
          toolbar: CustomToolbar,
        }}
      />
    </div>
  );
};

export default MyCalendar;
