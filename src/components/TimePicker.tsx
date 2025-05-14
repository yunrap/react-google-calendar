import React, { useState, useEffect, useRef } from 'react';
import '../styles/components/TimePicker.scss';
import timeUtils from '../utils/timeUtils';

interface TimePickerProps {
  value?: string;
  onChange: (time: string) => void;
  placeholder?: string;
  startTime?: string; // 시작 시간 prop 추가
  isEndTime?: boolean; // 종료 시간 선택기인지 여부
}

const TimePicker: React.FC<TimePickerProps> = ({
  value,
  onChange,
  placeholder,
  startTime,
  isEndTime,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [timeSlots, setTimeSlots] = useState<string[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLUListElement>(null);
  const selectedItemRef = useRef<HTMLLIElement>(null);
  const dropdownId = `time-dropdown-${React.useId()}`;

  useEffect(() => {
    // 종료 시간 선택기이고 시작 시간이 있는 경우
    if (isEndTime && startTime) {
      setTimeSlots(timeUtils.generateTimeSlotsFromStart(startTime));
    } else {
      // 시작 시간 선택기이거나 시작 시간이 없는 경우 전체 시간 표시
      setTimeSlots(timeUtils.generateTimeSlots());
    }
  }, [startTime, isEndTime]);

  // 드롭다운이 열릴 때 선택된 시간으로 스크롤
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

  return (
    <div className="time-picker" ref={wrapperRef}>
      <div
        className="time-picker__display"
        onClick={() => setIsOpen(!isOpen)}
        role="button"
        tabIndex={0}
      >
        {timeUtils.formatDisplayTime(value) || placeholder || '시간 선택'}
      </div>
      {isOpen && (
        <ul id={dropdownId} className="time-picker__dropdown" ref={dropdownRef} role="listbox">
          {timeSlots.map((slot) => (
            <li
              key={slot}
              ref={value === slot ? selectedItemRef : null}
              className={`time-picker__item ${value === slot ? 'selected' : ''}`}
              onClick={() => handleTimeSelect(slot)}
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
