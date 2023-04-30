import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Modal } from 'components/Modal/Modal';
import { useState } from 'react';
export function ImageGalleryItem({ images }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const openModal = index => {
    setIsModalOpen(true);
    setSelectedImageIndex(index);
  };
  const handleModalClose = e => {
    setIsModalOpen(false);
    setSelectedImageIndex(null);
  };

  return images.map(({ id, webformatURL, tags, largeImageURL }, index) => (
    <GalleryItem key={id} onClick={() => openModal(index)}>
      <img src={webformatURL} alt={tags} width="400" height="300" />
      {isModalOpen && selectedImageIndex === index && (
        <Modal img={largeImageURL} alt={tags} onClose={handleModalClose} />
      )}
    </GalleryItem>
  ));
}

const GalleryItem = styled.li`
  -webkit-box-shadow: 3px 6px 5px 0px rgba(159, 168, 163, 1);
  -moz-box-shadow: 3px 6px 5px 0px rgba(159, 168, 163, 1);
  box-shadow: 3px 6px 5px 0px rgba(159, 168, 163, 1);
  &:hover {
    scale: 1.02;
    cursor: pointer;
  }
`;

ImageGalleryItem.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
};
