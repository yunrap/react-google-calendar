import React from 'react';
import { Navigate } from 'react-big-calendar';
import Button from './Button';
import { useDispatch } from 'react-redux';
import { setCalendarDate, setDate } from '../store/dateSlice';
import { AppDispatch } from '../store/store';

interface HeaderProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  onNavigate: (action: 'TODAY' | 'PREV' | 'NEXT' | 'DATE') => void;
  date: Date;
}

const Header: React.FC<HeaderProps> = ({ isSidebarOpen, toggleSidebar, onNavigate, date }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleNavigate = (action: 'TODAY' | 'PREV' | 'NEXT') => {
    dispatch(setDate(date));
    dispatch(setCalendarDate(date));
    onNavigate(action);
  };

  return (
    <header className="App-header p-4 bg-gray-100 shadow-md flex items-center justify-between h-20">
      <div className="flex items-center gap-8">
        <div className="flex items-center">
          <button
            className={`p-2 z-20 cursor-pointer bg-transparent border-0 ${
              isSidebarOpen ? 'open' : ''
            }`}
            onClick={toggleSidebar}
          >
            <span className="block w-6 h-0.5 bg-gray-700 my-1" />
            <span className="block w-6 h-0.5 bg-gray-700 my-1" />
            <span className="block w-6 h-0.5 bg-gray-700 my-1" />
          </button>
          <h1 className="text-xl font-semibold text-gray-800 ml-4">Google Calendar</h1>
        </div>

        <div className="flex items-center gap-4">
          <Button className="px-6 rounded-full" onClick={() => handleNavigate(Navigate.TODAY)}>
            오늘
          </Button>
          <div>
            <Button
              onClick={() => handleNavigate(Navigate.PREVIOUS)}
              className="border-none text-2xl font-bold px-4"
            >
              &lt;
            </Button>
            <Button
              onClick={() => handleNavigate(Navigate.NEXT)}
              className="border-none text-2xl font-bold px-4"
            >
              &gt;
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-lg font-medium">{`${date.getFullYear()}년 ${
              date.getMonth() + 1
            }월 `}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
