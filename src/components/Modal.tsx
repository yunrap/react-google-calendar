import React, { useState, useEffect, useRef } from 'react';
import moment from 'moment';
import '../styles/components/Modal.scss';
import Button from './Button';
import Input from './Input';
import TimePicker from './TimePicker';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  modalTitle?: string;
  onSave: (data: { title: string; startTime: string; endTime: string }) => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, modalTitle, onSave }) => {
  const [title, setTitle] = useState('');
  const [startTime, setStartTime] = useState('10:00');
  const [endTime, setEndTime] = useState('10:30');

  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTitle('');
      const now = moment();
      const roundedNow = moment(now)
        .minute(Math.floor(now.minute() / 15) * 15)
        .second(0)
        .millisecond(0);
      const initialStart = roundedNow.format('HH:mm');
      setStartTime(initialStart);
      setEndTime(moment(initialStart, 'HH:mm').add(30, 'minutes').format('HH:mm'));
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
    }
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && wrapperRef.current === event.target) {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose, wrapperRef]);

  const handleStartTimeChange = (newStartTime: string) => {
    setStartTime(newStartTime);
    const newEndTime = moment(newStartTime, 'HH:mm').add(30, 'minutes').format('HH:mm');
    setEndTime(newEndTime);
  };

  const handleSave = () => {
    if (!setEndTime || !endTime || !title) {
      alert('제목, 시작 시간, 종료 시간을 모두 입력해주세요.');
      return;
    }
    onSave({
      title: title,
      startTime: startTime,
      endTime: endTime,
    });
  };

  if (!isOpen) {
    return null;
  }

  const minEndTime = startTime
    ? moment(startTime, 'HH:mm').add(30, 'minutes').format('HH:mm')
    : '00:00';

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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목 추가"
            name="eventTitle"
          />
          <div className="flex items-center space-x-2">
            <TimePicker
              value={startTime}
              onChange={handleStartTimeChange}
              placeholder="시작 시간"
            />
            <span>-</span>
            <TimePicker
              value={endTime}
              onChange={setEndTime}
              placeholder="종료 시간"
              startTime={minEndTime}
            />
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
