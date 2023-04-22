import styled from 'styled-components';
import PropTypes from 'prop-types';

export function LoadMoreBtn({ onLoadMore }) {
  return (
    <LoadMoreButton type="button" onClick={onLoadMore}>
      Load more
    </LoadMoreButton>
  );
}

const LoadMoreButton = styled.button`
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 150px;
  padding: 10px 15px;
  font-size: 20px;
  font-weight: 700;
  background-color: #c5d5cb;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    scale: 1.05;
  }
`;
LoadMoreBtn.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
};
