import { useState, useCallback } from 'react';
import moment from 'moment';
import { Event } from 'react-big-calendar';
import MyCalendar from './components/MyCalendar';
import Sidebar from './components/Sidebar';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from './store/store';
import { setDate } from './store/dateSlice';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [calendarEvents, setCalendarEvents] = useState<Event[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const dispatch = useDispatch<AppDispatch>();
  const currentCalendarDateString = useSelector((state: RootState) => state.date.currentDate);
  const currentCalendarDate = new Date(currentCalendarDateString);

  const handleCalendarNavigate = useCallback(
    (newDate: Date) => {
      dispatch(setDate(newDate.toISOString()));
    },
    [dispatch]
  );

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSaveEventModal = (formData: {
    title: string;
    startTime: string;
    endTime: string;
  }) => {
    const { title, startTime, endTime } = formData;

    const eventDate = moment(currentCalendarDate).month(4).date(13);

    const newEvent: Event = {
      title: title,
      start: moment(eventDate)
        .hour(parseInt(startTime.split(':')[0], 10))
        .minute(parseInt(startTime.split(':')[1], 10))
        .second(0)
        .millisecond(0)
        .toDate(),
      end: moment(eventDate)
        .hour(parseInt(endTime.split(':')[0], 10))
        .minute(parseInt(endTime.split(':')[1], 10))
        .second(0)
        .millisecond(0)
        .toDate(),
    };

    setCalendarEvents((prevEvents) => [...prevEvents, newEvent]);
    setIsModalOpen(false);
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
              onSaveModal={handleSaveEventModal}
            />
          )}
          <div className="flex-1 p-4">
            <MyCalendar
              events={calendarEvents}
              date={currentCalendarDate}
              onNavigate={handleCalendarNavigate}
            />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
