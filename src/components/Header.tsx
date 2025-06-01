import React from 'react';
import { Navigate, NavigateAction } from 'react-big-calendar';
import { Button } from './Button';

interface HeaderProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  onNavigate: (action: NavigateAction) => void;
  date: Date;
}

const Header: React.FC<HeaderProps> = ({ isSidebarOpen, toggleSidebar, onNavigate, date }) => {
  const handleNavigate = (action: NavigateAction) => {
    onNavigate(action);
  };

  return (
    <header className="App-header p-0 sm:p-4 bg-gray-100 flex items-center justify-between h-20">
      <div className="flex items-center sm:gap-8 justify-between">
        <div className="flex items-center">
          <button
            className={`p-2 z-20 cursor-pointer bg-transparent border-0 hidden sm:block ${
              isSidebarOpen ? 'open' : ''
            }`}
            onClick={toggleSidebar}
          >
            <span className="block w-6 h-0.5 bg-gray-700 my-1" />
            <span className="block w-6 h-0.5 bg-gray-700 my-1" />
            <span className="block w-6 h-0.5 bg-gray-700 my-1" />
          </button>
          <h1 className="text-xl sm:text-xl font-semibold text-gray-800 ml-4">Google Calendar</h1>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <Button
            className="px-3 sm:px-6 rounded-full hidden sm:block"
            onClick={() => handleNavigate(Navigate.TODAY)}
          >
            오늘
          </Button>
          <Button
            onClick={() => handleNavigate(Navigate.PREVIOUS)}
            className="border-none text-2xl font-bold px-2 sm:px-4"
          >
            &lt;
          </Button>
          <Button
            onClick={() => handleNavigate(Navigate.NEXT)}
            className="border-none text-2xl font-bold px-2 sm:px-4"
          >
            &gt;
          </Button>
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

export default React.memo(Header);
