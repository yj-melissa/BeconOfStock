import React, { ReactNode, useEffect, useRef } from 'react';
import axios_api from '../../../assets/config/Axios';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

const FollowModal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center'>
      <div className='absolute inset-0 bg-[#808080] opacity-50'></div>
      <div
        ref={modalRef}
        className='relative bg-white p-6 rounded-md shadow-lg z-10'
      >
        <span
          className='absolute top-0 right-0 mt-2 mr-2 cursor-pointer text-gray-500 hover:text-gray-800'
          onClick={onClose}
        >
          X
        </span>
        {children}
      </div>
    </div>
  );
};

export default FollowModal;
