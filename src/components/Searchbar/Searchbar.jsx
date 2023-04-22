import styled from 'styled-components';
import IconSearch from './SearchIcon';
export function Searchbar({ onSubmit }) {
  return (
    <Header>
      <SearchForm className="form" onSubmit={onSubmit}>
        <SearchButton type="submit" className="button">
          <IconSearch />
        </SearchButton>

        <SearchInput
          name="searchQuery"
          className="input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </Header>
  );
}

const Header = styled.header`
  margin-top: 10px;
  display: flex;
  justify-content: center;
`;

const SearchForm = styled.form`
  position: relative;
`;
const SearchInput = styled.input`
  width: 600px;
  height: 30px;
  background-color: #9fa8a3;
  font-size: 20px;
  padding: 5px 15px;
  border: none;
  outline: none;
  border-radius: 5px;
`;

const SearchButton = styled.button`
  position: absolute;
  top: 5px;
  right: 15px;
  padding: 5px;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #c5d5cb;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    scale: 1.05;
  }
`;
