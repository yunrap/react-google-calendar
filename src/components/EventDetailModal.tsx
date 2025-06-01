import React from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import { deleteEvent } from '../store/eventSlice';
import { Button } from './Button';
import { Event } from '../types/calendar';

interface EventDetailModalProps {
  event: Event;
  onClose: () => void;
}

const EventDetailModal: React.FC<EventDetailModalProps> = ({ event, onClose }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleDelete = () => {
    dispatch(deleteEvent(event.id));
    onClose();
  };

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <button
        className="modal-overlay-button"
        onClick={onClose}
        onKeyDown={(e) => {
          if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
            onClose();
          }
        }}
        style={{ width: '100%', height: '100%', background: 'transparent', border: 'none' }}
      />
      <div className="modal-content" role="document">
        <header className="modal-header">
          <h2 className="modal-title">상세 보기</h2>
          <Button onClick={onClose} className="modal-close-btn">
            &times;
          </Button>
        </header>

        <body className="modal-body space-y-4">
          <h2 className="modal-title">{event.title}</h2>
        </body>

        <footer className="modal-footer">
          <Button
            className="bg-red-500 hover:bg-red-600 text-white border-none"
            onClick={handleDelete}
          >
            삭제
          </Button>
          <Button onClick={onClose}>닫기</Button>
        </footer>
      </div>
    </div>
  );
};

export default React.memo(EventDetailModal);
