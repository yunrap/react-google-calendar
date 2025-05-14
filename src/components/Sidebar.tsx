import React from 'react';
import Button from './Button';
import { DatePicker } from './DatePicker';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { setDate } from '../store/dateSlice';

interface SidebarProps {
  isModalOpen: boolean;
  openModal: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isModalOpen, openModal }) => {
  const dispatch = useDispatch<AppDispatch>();
  const currentDateString = useSelector((state: RootState) => state.date.currentDate);
  const currentDate = new Date(currentDateString);

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      dispatch(setDate(date));
    }
  };

  return (
    <div className="bg-gray-100 p-4 h-full overflow-y-auto w-60 shrink-0 hidden sm:block">
      <div className="my-4">
        <Button onClick={openModal} className="px-10 py-2" size="large">
          만들기
        </Button>
      </div>
      <DatePicker value={currentDate} onChange={handleDateChange} />
    </div>
  );
};

export default Sidebar;
