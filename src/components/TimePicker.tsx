import React, { useState, useEffect, useRef } from 'react';
import moment from 'moment';
import '../styles/components/TimePicker.scss';

interface TimePickerProps {
  value?: string;
  onChange: (time: string) => void;
  startTime?: string;
  endTime?: string;
  interval?: number;
  placeholder?: string;
}

const TimePicker: React.FC<TimePickerProps> = ({
  value,
  onChange,
  startTime = moment().format('HH:mm'),
  endTime = '23:45',
  interval = 15,
  placeholder = '시간 선택',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [timeSlots, setTimeSlots] = useState<string[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const slots: string[] = [];
    let currentTime = moment(startTime, 'HH:mm');
    const finalTime = moment(endTime, 'HH:mm');

    while (currentTime.isSameOrBefore(finalTime)) {
      slots.push(currentTime.format('HH:mm'));
      currentTime.add(interval, 'minutes');
    }
    setTimeSlots(slots);
  }, [startTime, endTime, interval]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [wrapperRef]);

  const handleTimeSelect = (slot: string) => {
    onChange(slot);
    setIsOpen(false);
  };

  const formatDisplayTime = (timeValue: string | undefined) => {
    if (!timeValue) return placeholder;
    return moment(timeValue, 'HH:mm').format('오후 h:mm');
  };

  return (
    <div className="time-picker" ref={wrapperRef}>
      <div className="time-picker__display" onClick={() => setIsOpen(!isOpen)}>
        {formatDisplayTime(value)}
      </div>
      {isOpen && (
        <ul className="time-picker__dropdown">
          {timeSlots.map((slot) => (
            <li
              key={slot}
              className={`time-picker__item ${value === slot ? 'selected' : ''}`}
              onClick={() => handleTimeSelect(slot)}
            >
              {moment(slot, 'HH:mm').format('오후 h:mm')}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TimePicker;
