import React, { useState, useEffect, useRef, useId, KeyboardEvent } from 'react';
import '../styles/components/Modal.scss';
import Button from './Button';
import Input from './Input';
import TimePicker from './TimePicker';
import timeUtils from '../utils/timeUtils';
import { DayPicker } from 'react-day-picker';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { addEvent } from '../store/eventSlice';
import { setDate } from '../store/dateSlice';
import moment from 'moment';
import { useModalClose } from '../hooks/useModalClose';
import { useBodyScroll } from '../hooks/useBodyScroll';
import { ko } from 'date-fns/locale';

interface EventState {
  title: string;
  inputValue: string;
  startTime: string;
  endTime: string;
  selectedDate: Date | undefined;
  month: Date | undefined;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  modalTitle?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, modalTitle }) => {
  const dialogId = useId();
  const headerId = useId();
  const dispatch = useDispatch<AppDispatch>();
  const currentDateString = useSelector((state: RootState) => state.date.currentDate);
  const currentDate = React.useMemo(() => new Date(currentDateString), [currentDateString]);

  const dialogRef = useRef<HTMLDialogElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [eventState, setEventState] = useState<EventState>({
    title: '',
    inputValue: '',
    startTime: '',
    endTime: '',
    selectedDate: currentDate,
    month: new Date(),
  });

  useModalClose(isOpen, onClose, wrapperRef);
  useBodyScroll(isDialogOpen, dialogRef);
  useEffect(() => {
    setEventState((prev) => ({
      ...prev,
      selectedDate: currentDate,
      inputValue: timeUtils.formatKoreanDate(currentDate),
    }));
  }, [currentDate]);

  useEffect(() => {
    if (isOpen) {
      const defaultStartTime = timeUtils.getDefaultStartTime();
      setEventState((prev) => ({
        ...prev,
        title: '',
        startTime: defaultStartTime,
        endTime: timeUtils.getMinEndTime(defaultStartTime),
        inputValue: timeUtils.formatKoreanDate(currentDate),
      }));
    }
  }, [isOpen, currentDate]);

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
    if (!date) return;
    dispatch(setDate(date));
    setEventState((prev) => ({
      ...prev,
      selectedDate: date,
      inputValue: timeUtils.formatKoreanDate(date),
    }));
    dialogRef.current?.close();
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

  if (!isOpen) return null;

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
          <div className="relative flex items-center">
            <input
              className="p-2 border rounded w-full"
              type="text"
              value={eventState.inputValue}
              placeholder="MM/dd/yyyy"
              onChange={(e) => handleStateChange('inputValue', e.target.value)}
              onMouseUp={() => setIsDialogOpen(true)}
              onFocus={() => setIsDialogOpen(true)}
            />
            <dialog
              className="absolute p-2 bg-white rounded-lg shadow-lg z-50 max-w-52"
              ref={dialogRef}
              id={dialogId}
              aria-modal
              aria-labelledby={headerId}
              onClose={() => setIsDialogOpen(false)}
            >
              <DayPicker
                locale={ko}
                mode="single"
                selected={eventState.selectedDate}
                onSelect={handleDayPickerSelect}
                month={eventState.month}
                onMonthChange={(month) => handleStateChange('month', month)}
                className="!w-auto"
              />
            </dialog>
            <div className="flex pl-2 items-center space-x-2">
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
          <Button onClick={onClose}>취소</Button>
          <Button className="bg-blue-500 hover:bg-blue-600 text-white" onClick={handleSave}>
            저장
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
