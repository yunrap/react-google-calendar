import { DayPicker } from 'react-day-picker';
import 'react-day-picker/style.css';
import { ko } from 'date-fns/locale';
import '../styles/components/DatePicker.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { setDate } from '../store/dateSlice';

interface DatePickerProps {
  value: Date | undefined;
  onChange?: (date: Date | undefined) => void;
}

export function DatePicker({ value, onChange }: DatePickerProps) {
  const dispatch = useDispatch<AppDispatch>();
  const currentDate = useSelector((state: RootState) => new Date(state.date.currentDate));
  const handleMonthChange = (month: Date) => {
    dispatch(setDate(month.toISOString()));
  };

  return (
    <div className="rdp-wrapper rounde">
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
          today: `bg-blue-700 text-white rounded-full flex items-center justify-center`,
          selected: `bg-blue-300 text-white rounded-full flex items-center justify-center`,
          head_row: 'flex justify-between items-center',
          caption: 'text-lg font-bold text-center',
          caption_label: 'text-lg font-bold text-center text-gray-700',
          button_next: 'rounded-full hover:bg-gray-200',
          button_previous: 'rounded-full rounded-md hover:bg-gray-200',
          chevron: 'fill-black',
        }}
        components={{
          MonthCaption: () => (
            <div className="text-lg font-bold text-gray-700" key={currentDate.toString()}>
              {currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월
            </div>
          ),
        }}
      />
    </div>
  );
}
