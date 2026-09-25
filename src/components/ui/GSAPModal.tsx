import React, { useEffect, useRef, useState } from 'react';
import { useGameStore } from '../../store/useGameStore';
import { TRACK_THEMES } from '../../utils/theme';
import gsap from 'gsap';

interface GSAPModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  maxWidthClass?: string;
}

export const GSAPModal: React.FC<GSAPModalProps> = ({
  isOpen,
  onClose,
  children,
  maxWidthClass = 'max-w-xl'
}) => {
  const { activeTrack } = useGameStore();
  const theme = TRACK_THEMES[activeTrack] || TRACK_THEMES.python;

  const [renderModal, setRenderModal] = useState(isOpen);
  const backdropRef = useRef<HTMLDivElement>(null);
  const modalBoxRef = useRef<HTMLDivElement>(null);
  const isClosingRef = useRef(false);

  useEffect(() => {
    if (isOpen) {
      setRenderModal(true);
      isClosingRef.current = false;
    } else if (renderModal && !isClosingRef.current) {
      handleClose();
    }
  }, [isOpen]);

  useEffect(() => {
    if (renderModal && backdropRef.current && modalBoxRef.current && !isClosingRef.current) {
      const tl = gsap.timeline();
      tl.fromTo(
        backdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.25, ease: 'power2.out' }
      );
      tl.fromTo(
        modalBoxRef.current,
        { opacity: 0, scale: 0.82, y: 35 },
        { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: 'back.out(1.6)' },
        '-=0.15'
      );
    }
  }, [renderModal]);

  const handleClose = () => {
    if (isClosingRef.current) return;
    isClosingRef.current = true;

    if (backdropRef.current && modalBoxRef.current) {
      const tl = gsap.timeline({
        onComplete: () => {
          setRenderModal(false);
          isClosingRef.current = false;
          onClose();
        }
      });

      tl.to(modalBoxRef.current, {
        opacity: 0,
        scale: 0.88,
        y: 15,
        duration: 0.2,
        ease: 'power2.in'
      });
      tl.to(backdropRef.current, { opacity: 0, duration: 0.15 }, '-=0.1');
    } else {
      setRenderModal(false);
      onClose();
    }
  };

  if (!renderModal) return null;

  return (
    <div
      ref={backdropRef}
      onClick={(e) => {
        if (e.target === backdropRef.current) handleClose();
      }}
      className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4"
    >
      <div
        ref={modalBoxRef}
        className={`${theme.modalBg} border ${theme.modalBorder} rounded-3xl w-full ${maxWidthClass} shadow-2xl relative flex flex-col max-h-[90vh] overflow-hidden transition-colors duration-300`}
      >
        {children}
      </div>
    </div>
  );
};
