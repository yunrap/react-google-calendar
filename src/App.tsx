import { useState, useCallback } from 'react';
import { Navigate, NavigateAction } from 'react-big-calendar';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from './store/store';
import { selectCurrentDate } from './store/selectors';
import Header from './components/Header';
import MyCalendar from './components/MyCalendar';
import Modal from './components/Modal';
import Sidebar from './components/Sidebar';
import { setCalendarDate } from './store/dateSlice';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const dispatch = useDispatch<AppDispatch>();
  const currentDate = useSelector(selectCurrentDate);

  const handleNavigateDatePicker = useCallback(
    (action: NavigateAction) => {
      let newDate = currentDate;

      switch (action) {
        case Navigate.TODAY:
          newDate = new Date();
          break;
        case Navigate.PREVIOUS:
          newDate.setDate(newDate.getDate() - 7);
          break;
        case Navigate.NEXT:
          newDate.setDate(newDate.getDate() + 7);
          break;
      }

      dispatch(setCalendarDate(newDate.toISOString()));
    },
    [currentDate, dispatch]
  );

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen(!isSidebarOpen);
  }, [isSidebarOpen]);

  return (
    <div className="App flex h-screen bg-gray-50">
      <div className="flex-1 flex flex-col">
        <Header
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          onNavigate={handleNavigateDatePicker}
          date={currentDate}
        />
        <main className="flex flex-1">
          {isSidebarOpen && <Sidebar openModal={() => setIsModalOpen(true)} />}
          <div className="flex-1 sm:p-4 rounded-lg bg-white shadow-md h-full sm:h-[calc(100vh-6rem)] ">
            <MyCalendar date={currentDate} />
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
