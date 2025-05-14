import { useEffect } from 'react';

export const useBodyScroll = (
  isDialogOpen: boolean,
  dialogRef: React.RefObject<HTMLDialogElement | null>
) => {
  useEffect(() => {
    if (!dialogRef.current) return;

    const handleBodyScroll = (shouldLock: boolean) => {
      document.body.style.overflow = shouldLock ? 'hidden' : '';
    };

    if (isDialogOpen) {
      handleBodyScroll(true);
      dialogRef.current.showModal();
    } else {
      handleBodyScroll(false);
      dialogRef.current.close();
    }

    return () => handleBodyScroll(false);
  }, [isDialogOpen, dialogRef]);
};
