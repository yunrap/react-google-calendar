import { DayPicker } from 'react-day-picker';
import { ko } from 'date-fns/locale';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { setCalendarDate } from '../store/dateSlice';
import { useMemo } from 'react';

interface DatePickerProps {
  value: Date | undefined;
  onChange?: (date: Date | undefined) => void;
}

export const DatePicker = ({ value, onChange }: DatePickerProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const calendarDate = useSelector((state: RootState) => state.date.calendarDate);
  const currentDate = useMemo(() => new Date(calendarDate), [calendarDate]);

  const handleMonthChange = (month: Date) => {
    dispatch(setCalendarDate(month.toISOString()));
  };

  const renderMonthCaption = () => (
    <div className="text-lg font-bold text-gray-700" key={currentDate.toString()}>
      {currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월
    </div>
  );

  return (
    <div className="rdp-wrapper">
      <DayPicker
        mode="single"
        selected={value}
        onSelect={onChange}
        month={currentDate}
        onMonthChange={handleMonthChange}
        locale={ko}
        weekStartsOn={0}
        showOutsideDays
        fixedWeeks
        classNames={{
          today: `bg-blue-700 text-white rounded-full justify-center`,
          selected: `bg-blue-300 text-white rounded-full`,
          button_next: 'rounded-full hover:bg-gray-200',
          button_previous: 'rounded-full hover:bg-gray-200',
          chevron: 'fill-black',
        }}
        components={{
          MonthCaption: renderMonthCaption,
        }}
      />
    </div>
  );
};
