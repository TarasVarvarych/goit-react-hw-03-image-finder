import styled from 'styled-components';
import PropTypes from 'prop-types';
export function ImageGallery({ children }) {
  return <Gallery>{children}</Gallery>;
}

const Gallery = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  gap: 15px;
  padding: 20px;
  justify-content: center;
`;

ImageGallery.propTypes = {
  children: PropTypes.node.isRequired,
};
