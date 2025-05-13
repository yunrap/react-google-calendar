import { useState, useCallback } from 'react';
import moment from 'moment';
import { Event, NavigateAction, View } from 'react-big-calendar';
import Button from './components/Button';
import MyCalendar from './components/MyCalendar';
import Modal from './components/Modal';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [calendarEvents, setCalendarEvents] = useState<Event[]>([]);

  const [currentCalendarDate, setCurrentCalendarDate] = useState(new Date());

  const handleCalendarNavigate = useCallback(
    (newDate: Date, view: View, action: NavigateAction) => {
      setCurrentCalendarDate(newDate);
    },
    []
  );

  const handleSaveEventFromModal = (formData: {
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
    <div className="App p-4">
      <header className="App-header mb-4"></header>
      <MyCalendar
        events={calendarEvents}
        date={currentCalendarDate}
        onNavigate={handleCalendarNavigate}
      />
      <div className="my-4">
        <Button onClick={() => setIsModalOpen(true)}>이벤트 만들기</Button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        modalTitle="새 이벤트 만들기"
        onSave={handleSaveEventFromModal}
      />
    </div>
  );
}

export default App;
