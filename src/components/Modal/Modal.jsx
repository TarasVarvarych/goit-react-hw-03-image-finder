import styled from 'styled-components';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { useEffect } from 'react';
const modalRoot = document.querySelector('#modal-root');
const ESCAPE_KEY = 'Escape';
const KEYDOWN_LISTENER = 'keydown';

export function Modal({ img, alt, onClose }) {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === ESCAPE_KEY) {
        onClose();
      }
    };

    window.addEventListener(KEYDOWN_LISTENER, handleKeyDown);
    return () => {
      return window.removeEventListener(KEYDOWN_LISTENER, handleKeyDown);
    };
  }, [onClose]);

  const handleBackDropClick = e => {
    if (e.target === e.currentTarget) {
      e.stopPropagation();
      onClose();
    }
  };
  return createPortal(
    <Overlay onClick={handleBackDropClick}>
      <ModalContent>
        <img src={img} alt={alt} width="800" />
      </ModalContent>
    </Overlay>,
    modalRoot
  );
}

const Overlay = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  img: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};
