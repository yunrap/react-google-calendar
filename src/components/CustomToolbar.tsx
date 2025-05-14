import React from 'react';
import { Navigate, ToolbarProps as BigCalendarToolbarProps } from 'react-big-calendar';
import Button from './Button';
import '../styles/components/CustomToolbar.scss';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import { setCalendarDate } from '../store/dateSlice';

export interface CustomToolbarProps {
  label: string;
  onNavigate: (action: 'TODAY' | 'PREV' | 'NEXT' | 'DATE', date?: Date) => void;
}

const CustomToolbar: React.FC<BigCalendarToolbarProps> = (props) => {
  const { label, onNavigate, date } = props;
  const dispatch = useDispatch<AppDispatch>();

  const handleNavigate = (action: 'TODAY' | 'PREV' | 'NEXT') => {
    dispatch(setCalendarDate(date));
    onNavigate(action);
  };

  return (
    <div className="custom-toolbar">
      <div className="custom-toolbar__navigation-group">
        <Button className="px-10" onClick={() => handleNavigate(Navigate.TODAY)}>
          오늘
        </Button>
        <Button onClick={() => handleNavigate(Navigate.PREVIOUS)}>&lt;</Button>
        <Button onClick={() => handleNavigate(Navigate.NEXT)}>&gt;</Button>
      </div>
      <div className="custom-toolbar__label">{label}</div>
      <div className="custom-toolbar__view-group"></div>
    </div>
  );
};

export default CustomToolbar;
