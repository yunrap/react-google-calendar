import { useState, useCallback } from 'react';
import MyCalendar from './components/MyCalendar';
import Sidebar from './components/Sidebar';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from './store/store';
import { setDate } from './store/dateSlice';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const dispatch = useDispatch<AppDispatch>();
  const currentCalendarDateString = useSelector((state: RootState) => state.date.currentDate);
  const currentCalendarDate = new Date(currentCalendarDateString);

  const handleCalendarNavigate = useCallback(
    (newDate: Date) => {
      dispatch(setDate(newDate));
    },
    [dispatch]
  );

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="App flex h-screen bg-gray-50">
      <div className="flex-1 flex flex-col">
        <header className="App-header p-4 bg-white shadow-md flex items-center h-20">
          <button
            className={`p-2 z-20 cursor-pointer bg-transparent border-0 ${
              isSidebarOpen ? 'open' : ''
            }`}
            onClick={toggleSidebar}
            aria-label={isSidebarOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isSidebarOpen}
          >
            <span className="block w-6 h-0.5 bg-gray-700 my-1" />
            <span className="block w-6 h-0.5 bg-gray-700 my-1" />
            <span className="block w-6 h-0.5 bg-gray-700 my-1" />
          </button>
        </header>
        <main className="flex flex-1">
          {isSidebarOpen && (
            <Sidebar
              isModalOpen={isModalOpen}
              openModal={() => setIsModalOpen(true)}
              closeModal={() => setIsModalOpen(false)}
            />
          )}
          <div className="flex-1 p-4 rounded-lg bg-white shadow-md h-[calc(100vh-6rem)] ">
            <MyCalendar date={currentCalendarDate} onNavigate={handleCalendarNavigate} />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
