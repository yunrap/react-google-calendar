import React, { useState, useEffect, useRef } from 'react';
import timeUtils from '../utils/timeUtils';

interface TimePickerProps {
  value?: string;
  onChange: (time: string) => void;
  placeholder?: string;
  startTime?: string;
  isEndTime?: boolean;
}

const TimePicker: React.FC<TimePickerProps> = ({
  value,
  onChange,
  placeholder,
  startTime,
  isEndTime,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLUListElement>(null);
  const selectedItemRef = useRef<HTMLLIElement>(null);
  const dropdownId = `time-dropdown-${React.useId()}`;

  const [isOpen, setIsOpen] = useState(false);
  const [timeSlots, setTimeSlots] = useState<string[]>([]);

  const handleTimeSelect = (slot: string) => {
    onChange(slot);
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isEndTime && startTime) {
      setTimeSlots(timeUtils.generateTimeSlotsFromStart(startTime));
    } else {
      setTimeSlots(timeUtils.generateTimeSlots());
    }
  }, [startTime, isEndTime]);

  useEffect(() => {
    if (isOpen && value && dropdownRef.current && selectedItemRef.current) {
      setTimeout(() => {
        const dropdownHeight = dropdownRef.current?.clientHeight || 0;
        const itemHeight = selectedItemRef.current?.clientHeight || 0;
        const itemTop = selectedItemRef.current?.offsetTop || 0;

        const scrollPosition = itemTop - dropdownHeight / 2 + itemHeight / 2;
        dropdownRef.current?.scrollTo({
          top: Math.max(0, scrollPosition),
          behavior: 'auto',
        });
      }, 0);
    }
  }, [isOpen, value]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="time-picker" ref={wrapperRef}>
      <div
        className="time-picker__display"
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            setIsOpen((prev) => !prev);
          }
        }}
        role="button"
        tabIndex={0}
      >
        {timeUtils.formatDisplayTime(value) || placeholder || '시간 선택'}
      </div>
      {isOpen && (
        <ul
          id={dropdownId}
          className="time-picker__dropdown"
          ref={dropdownRef}
          role="listbox"
          aria-label="시간 선택"
        >
          {timeSlots.map((slot) => (
            <li
              key={slot}
              ref={value === slot ? selectedItemRef : null}
              className={`time-picker__item ${value === slot ? 'selected' : ''}`}
              onClick={() => handleTimeSelect(slot)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleTimeSelect(slot);
                }
              }}
              role="option"
              aria-selected={value === slot}
              tabIndex={0}
            >
              {timeUtils.formatDisplayTime(slot)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TimePicker;
