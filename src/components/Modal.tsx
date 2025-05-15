import React, { useState, useEffect, useRef, KeyboardEvent } from 'react';
import { DayPicker } from 'react-day-picker';
import moment from 'moment';
import { ko } from 'date-fns/locale';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { addEvent } from '../store/eventSlice';
import { useModalClose } from '../hooks/useModalClose';
import Button from './Button';
import Input from './Input';
import TimePicker from './TimePicker';
import timeUtils from '../utils/timeUtils';
import { setCalendarDate } from '../store/dateSlice';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  modalTitle?: string;
}

interface EventState {
  title: string;
  startTime: string;
  endTime: string;
  selectedDate: Date;
  month: Date;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, modalTitle }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const dayPickerRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch<AppDispatch>();
  const calendarDate = useSelector((state: RootState) => state.date.calendarDate);
  const currentDate = React.useMemo(() => new Date(calendarDate), [calendarDate]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [eventState, setEventState] = useState<EventState>({
    title: '',
    startTime: '',
    endTime: '',
    selectedDate: currentDate,
    month: new Date(),
  });

  useModalClose(isOpen, onClose, wrapperRef);

  const handleStateChange = (type: keyof EventState, value: any) => {
    if (type === 'startTime') {
      const minEndTime = timeUtils.getMinEndTime(value);
      setEventState((prev) => ({
        ...prev,
        startTime: value,
        endTime: minEndTime,
      }));
    } else {
      setEventState((prev) => ({
        ...prev,
        [type]: value,
      }));
    }
  };

  const handleDayPickerSelect = (date: Date | undefined) => {
    setIsDialogOpen(false);
    if (!date) return;
    dispatch(setCalendarDate(date.toISOString()));
    setEventState((prev) => ({
      ...prev,
      selectedDate: date,
    }));
  };

  const handleSave = () => {
    const { title, startTime, endTime, selectedDate } = eventState;
    if (!title || !startTime || !endTime || !selectedDate) {
      alert('제목, 월, 시작 시간, 종료 시간을 모두 입력해주세요.');
      return;
    }

    const newEvent = {
      id: Date.now().toString(),
      title,
      start: moment(selectedDate)
        .hour(parseInt(startTime.split(':')[0], 10))
        .minute(parseInt(startTime.split(':')[1], 10))
        .second(0)
        .millisecond(0)
        .toDate(),
      end: moment(selectedDate)
        .hour(parseInt(endTime.split(':')[0], 10))
        .minute(parseInt(endTime.split(':')[1], 10))
        .second(0)
        .millisecond(0)
        .toDate(),
    };

    dispatch(addEvent(newEvent));
    onClose();
  };

  useEffect(() => {
    setEventState((prev) => ({
      ...prev,
      selectedDate: currentDate,
    }));
  }, [currentDate]);

  useEffect(() => {
    setIsDialogOpen(false);
    if (isOpen) {
      const defaultStartTime = timeUtils.getDefaultStartTime();
      setEventState((prev) => ({
        ...prev,
        title: '',
        startTime: defaultStartTime,
        endTime: timeUtils.getMinEndTime(defaultStartTime),
      }));
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dayPickerRef.current && !dayPickerRef.current.contains(event.target as Node)) {
        setIsDialogOpen(false);
      }
    };

    if (isDialogOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDialogOpen]);

  if (!isOpen) return null;

  const renderMonthCaption = () => (
    <div className="text-lg font-bold text-gray-700" key={eventState.toString()}>
      {eventState.month.getFullYear()}년 {eventState.month.getMonth() + 1}월
    </div>
  );

  return (
    <div className="modal-overlay" ref={wrapperRef} onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          {modalTitle && <h2 className="modal-title">{modalTitle}</h2>}
          <Button onClick={onClose} className="modal-close-btn">
            &times;
          </Button>
        </div>
        <div className="modal-body space-y-4">
          <Input
            value={eventState.title}
            onChange={(e) => handleStateChange('title', e.target.value)}
            onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleSave();
              }
            }}
            autoFocus
            placeholder="제목 추가"
            name="eventTitle"
          />
          <div className="relative flex sm:flex-row flex-col">
            <input
              className="relative p-2 border rounded w-full"
              type="text"
              inputMode="none"
              value={timeUtils.formatKoreanDate(eventState.selectedDate!)}
              placeholder="MM/dd/yyyy"
              onMouseUp={() => setIsDialogOpen(true)}
              onFocus={() => setIsDialogOpen(true)}
            />
            <div className="relative sm:static">
              {isDialogOpen && (
                <div
                  ref={dayPickerRef}
                  className="absolute left-0 top-full mt-2 p-2 bg-white rounded-lg shadow-lg z-50 max-w-52"
                >
                  <DayPicker
                    mode="single"
                    selected={eventState.selectedDate}
                    onSelect={handleDayPickerSelect}
                    month={eventState.month}
                    onMonthChange={(month) => handleStateChange('month', month)}
                    locale={ko}
                    showOutsideDays
                    classNames={{
                      today: `bg-blue-700 text-white rounded-full justify-center`,
                      selected: `bg-blue-300 text-white rounded-full`,
                      button_next: 'rounded-full hover:bg-gray-200',
                      button_previous: 'rounded-full hover:bg-gray-200',
                      chevron: 'fill-black',
                    }}
                    components={{
                      MonthCaption: renderMonthCaption,
                    }}
                  />
                </div>
              )}
            </div>

            <div className="flex sm:pl-2 pt-2 sm:pt-0 items-center space-x-2">
              <TimePicker
                value={eventState.startTime}
                onChange={(time) => handleStateChange('startTime', time)}
                placeholder="시작 시간"
              />
              <span>-</span>
              <TimePicker
                value={eventState.endTime}
                onChange={(time) => handleStateChange('endTime', time)}
                placeholder="종료 시간"
                startTime={eventState.startTime}
                isEndTime
              />
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <Button onClick={onClose} className="border-none">
            취소
          </Button>
          <Button
            className="bg-blue-500 hover:bg-blue-600 text-white border-none"
            onClick={handleSave}
          >
            저장
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
