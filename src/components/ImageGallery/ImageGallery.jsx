import styled from 'styled-components';
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
