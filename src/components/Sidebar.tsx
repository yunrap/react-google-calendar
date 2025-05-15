import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import Button from './Button';
import { DatePicker } from './DatePicker';
import { setCalendarDate } from '../store/dateSlice';
import { selectCurrentDate } from '../store/selectors';

interface SidebarProps {
  openModal: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ openModal }) => {
  const dispatch = useDispatch<AppDispatch>();
  const currentDate = useSelector(selectCurrentDate);

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      dispatch(setCalendarDate(date.toISOString()));
    }
  };

  return (
    <div className="bg-gray-100 p-[0.7rem] h-full overflow-y-auto w-60 shrink-0 hidden sm:block">
      <div className="my-4">
        <Button
          onClick={openModal}
          className="px-10 py-2 bg-white border-none shadow-md border border-gray-200 "
          size="xlarge"
        >
          만들기
        </Button>
      </div>
      <DatePicker value={currentDate} onChange={handleDateChange} />
    </div>
  );
};

export default Sidebar;
