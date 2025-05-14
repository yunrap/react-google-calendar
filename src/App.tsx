import { useState, useCallback, useMemo } from 'react';
import MyCalendar from './components/MyCalendar';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from './store/store';
import { setDate } from './store/dateSlice';
import { Navigate, View as CalendarView, NavigateAction } from 'react-big-calendar';
import Modal from './components/Modal';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const dispatch = useDispatch<AppDispatch>();
  const currentDateString = useSelector((state: RootState) => state.date.currentDate);
  const currentCalendarDate = useMemo(() => new Date(currentDateString), [currentDateString]);

  const handleNavigate = useCallback(
    (action: 'TODAY' | 'PREV' | 'NEXT' | 'DATE') => {
      let newDate = new Date(currentCalendarDate);

      switch (action) {
        case Navigate.TODAY:
          newDate = new Date();
          break;
        case Navigate.PREVIOUS:
          newDate.setDate(currentCalendarDate.getDate() - 7);
          break;
        case Navigate.NEXT:
          newDate.setDate(currentCalendarDate.getDate() + 7);
          break;
      }

      dispatch(setDate(newDate));
    },
    [dispatch, currentCalendarDate]
  );

  const handleCalendarNavigate = useCallback(
    (newDate: Date, view: CalendarView, action: NavigateAction) => {
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
        <Header
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          onNavigate={handleNavigate}
          date={currentCalendarDate}
        />
        <main className="flex flex-1">
          {isSidebarOpen && (
            <Sidebar isModalOpen={isModalOpen} openModal={() => setIsModalOpen(true)} />
          )}
          <div className="flex-1 sm:p-4 rounded-lg bg-white shadow-md h-full sm:h-[calc(100vh-6rem)] ">
            <MyCalendar date={currentCalendarDate} onNavigate={handleCalendarNavigate} />
          </div>
        </main>
        <button
          className="fixed bottom-10 right-10 bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg xl:hidden"
          onClick={() => setIsModalOpen(true)}
        >
          +
        </button>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} modalTitle="등록 하기" />
    </div>
  );
}

export default App;
