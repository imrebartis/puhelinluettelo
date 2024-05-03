const SearchFilter = ({ searchInput, handleSearchInputChange }) => (
  <div>
    filter shown with{' '}
    <input id="search" name="search" value={searchInput} onChange={handleSearchInputChange} autoComplete="off" />
  </div>
);

export default SearchFilter;
