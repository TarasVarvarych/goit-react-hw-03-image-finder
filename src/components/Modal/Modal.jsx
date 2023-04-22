import styled from 'styled-components';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { Component } from 'react';
const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackDropClick = e => {
    if (e.target === e.currentTarget) {
      e.stopPropagation();
      this.props.onClose();
    }
  };
  render() {
    const { img, alt } = this.props;
    return createPortal(
      <Overlay onClick={this.handleBackDropClick}>
        <ModalContent>
          <img src={img} alt={alt} width="800" />
        </ModalContent>
      </Overlay>,
      modalRoot
    );
  }
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
