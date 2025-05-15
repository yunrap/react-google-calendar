import { Event } from '../types/calendar';

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);

export const mockEvents: Event[] = [
  {
    id: '1',
    title: '팀 미팅',
    start: new Date(today.setHours(10, 0, 0, 0)),
    end: new Date(today.setHours(11, 30, 0, 0)),
  },
  {
    id: '2',
    title: '점심 약속',
    start: new Date(today.setHours(12, 30, 0, 0)),
    end: new Date(today.setHours(13, 30, 0, 0)),
  },
  {
    id: '3',
    title: '프로젝트 회의',
    start: new Date(tomorrow.setHours(14, 0, 0, 0)),
    end: new Date(tomorrow.setHours(15, 0, 0, 0)),
  },
  {
    id: '4',
    title: '코드 리뷰',
    start: new Date(tomorrow.setHours(16, 0, 0, 0)),
    end: new Date(tomorrow.setHours(17, 0, 0, 0)),
  }
];
