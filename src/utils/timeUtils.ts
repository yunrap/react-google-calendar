import moment from 'moment';

export interface TimeRange {
  startTime: string;
  endTime: string;
}

/**
 * Time Calculation Functions
 * 시간 계산과 관련된 유틸리티 함수들
 */

/**
 * 현재 시간을 기준으로 30분 단위로 반올림된 시작 시간을 반환
 * ex) 현재 시간이 14:05라면 14:30을 반환
 * ex) 현재 시간이 14:35라면 15:00을 반환
 */
const getDefaultStartTime = (): string => {
  const now = moment();
  const minutes = now.minutes();
  if (minutes < 30) {
    return now.minutes(30).format('HH:mm');
  } else {
    return now.startOf('hour').add(1, 'hour').format('HH:mm');
  }
};

/**
 * 주어진 시작 시간으로부터 30분 후의 시간을 반환
 */
const getMinEndTime = (startTime: string | null): string => {
  return startTime ? moment(startTime, 'HH:mm').add(30, 'minutes').format('HH:mm') : '00:00';
};

/**
 * Time Generation Functions
 * 시간 목록 생성과 관련된 유틸리티 함수들
 */

/**
 * 00:00부터 23:30까지 30분 간격의 전체 시간 슬롯을 생성
 * @returns 30분 간격의 시간 배열 (HH:mm 형식)
 */
const generateTimeSlots = (): string[] => {
  const slots: string[] = [];
  let currentTime = moment().startOf('day');
  const endOfDay = moment().endOf('day');

  while (currentTime.isSameOrBefore(endOfDay)) {
    slots.push(currentTime.format('HH:mm'));
    currentTime.add(30, 'minutes');
  }

  return slots;
};

/**
 * 지정된 시작 시간 30분 후부터 하루 끝까지의 시간 슬롯을 생성
 * @param startTime - 시작 시간 (HH:mm 형식)
 * @returns 30분 간격의 시간 배열 (HH:mm 형식)
 */
const generateTimeSlotsFromStart = (startTime: string): string[] => {
  const slots: string[] = [];
  let currentTime = moment(startTime, 'HH:mm').add(30, 'minutes');
  const endOfDay = moment().endOf('day');

  if (!currentTime.isValid()) {
    return slots;
  }

  while (currentTime.isSameOrBefore(endOfDay)) {
    slots.push(currentTime.format('HH:mm'));
    currentTime.add(30, 'minutes');
  }

  return slots;
};

/**
 * Time Formatting Functions
 * 시간 포맷팅과 관련된 유틸리티 함수들
 */

/**
 * 시간을 한글 형식으로 변환 (오전/오후 포함)
 * ex) "14:30" -> "오후 2:30"
 */
const formatDisplayTime = (timeValue: string | undefined): string => {
  if (!timeValue) return '';
  const time = moment(timeValue, 'HH:mm');
  const hour = time.hour();
  const ampm = hour < 12 ? '오전' : '오후';
  const formattedHour = hour < 12 ? hour : hour - 12;
  return `${ampm} ${formattedHour || 12}:${time.format('mm')}`;
};

/**
 * 날짜를 한글 형식으로 변환 (요일 포함)
 * ex) "2025-05-14" -> "5월 14일 (수)"
 */
function formatKoreanDate(date: Date): string {
  if (!date) return '';
  const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric', weekday: 'long' };
  let formatted = date.toLocaleDateString('ko-KR', options);
  return formatted.replace(/ (\S+)$/, '($1)');
}

const timeUtils = {
  getMinEndTime,
  getDefaultStartTime,
  generateTimeSlots,
  generateTimeSlotsFromStart,
  formatDisplayTime,
  formatKoreanDate,
};

export default timeUtils;
