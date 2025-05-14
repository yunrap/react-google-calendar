import { useEffect } from 'react';

// 모달 외부 클릭 및 ESC 키 처리
export const useModalClose = (
  isOpen: boolean,
  onClose: () => void,
  wrapperRef: React.RefObject<HTMLDivElement | null>
) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && wrapperRef.current === event.target) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscKey);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose, wrapperRef]);
};
