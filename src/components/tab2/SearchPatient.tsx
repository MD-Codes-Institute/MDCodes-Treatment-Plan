interface PropsFilterPatient {
  handleSearch: () => void;
  handleClear: () => void;
  setFilterPatient: React.Dispatch<React.SetStateAction<string>>;
  filterPatient: string;
}

const SearchPatient: React.FC<PropsFilterPatient> = ({
  handleSearch,
  handleClear,
  filterPatient,
  setFilterPatient,
}) => {
  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-row justify-between items-center">
        <label htmlFor="searchPatient">Search your patient:</label>
        <input
          type="search"
          id="searchPatient"
          value={filterPatient}
          onChange={(e) => setFilterPatient(e.target.value)}
          className="w-[40%] border rounded-xl px-3 py-1 focus:outline-none focus:border-amber-200 transition-shadow duration-150 input-search"
        />
      </div>
      <div className="flex flex-row w-full justify-between gap-5 px-10">
        <button className="text-white btn-search" onClick={handleSearch}>
          Search
        </button>
        <button className="text-white btn-search" onClick={handleClear}>
          Clear
        </button>
      </div>
    </div>
  );
};

export default SearchPatient;
