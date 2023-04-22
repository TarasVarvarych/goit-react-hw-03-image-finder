import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Modal } from 'components/Modal/Modal';
import { Component } from 'react';
export class ImageGalleryItem extends Component {
  state = {
    isModalOpen: false,
    selectedImageIndex: null,
  };

  openModal = index => {
    this.setState({ isModalOpen: true, selectedImageIndex: index });
  };
  handleModalClose = e => {
    this.setState({ isModalOpen: false, selectedImageIndex: null });
  };

  render() {
    const { images } = this.props;
    const { isModalOpen, selectedImageIndex } = this.state;
    return images.map(({ id, webformatURL, tags, largeImageURL }, index) => (
      <GalleryItem key={id} onClick={() => this.openModal(index)}>
        <img src={webformatURL} alt={tags} width="400" height="300" />
        {isModalOpen && selectedImageIndex === index && (
          <Modal
            img={largeImageURL}
            alt={tags}
            onClose={this.handleModalClose}
          />
        )}
      </GalleryItem>
    ));
  }
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
