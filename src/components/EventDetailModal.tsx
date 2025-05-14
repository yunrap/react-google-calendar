import React from 'react';
import { Event } from 'react-big-calendar';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import { deleteEvent } from '../store/eventSlice';
import Button from './Button';
import '../styles/components/Modal.scss';

interface EventDetailModalProps {
  event: Event & { id: string };
  onClose: () => void;
}

const EventDetailModal: React.FC<EventDetailModalProps> = ({ event, onClose }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleDelete = () => {
    dispatch(deleteEvent(event.id));
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">상세 보기</h2>
          <Button onClick={onClose} className="modal-close-btn">
            &times;
          </Button>
        </div>

        <div className="modal-body space-y-4">
          <h2 className="modal-title">{event.title}</h2>
        </div>

        <div className="modal-footer">
          <Button
            className="bg-red-500 hover:bg-red-600 text-white border-none"
            onClick={handleDelete}
          >
            삭제
          </Button>
          <Button onClick={onClose}>닫기</Button>
        </div>
      </div>
    </div>
  );
};

export default EventDetailModal;
