import React, { SyntheticEvent } from "react";
import { useAuth } from "../Context/useAuth";

type Props = {};

const Search = (props: Props) => {
  const { search, setSearch, onSearchClick } = useAuth();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchClick(e);
  };

  return (
    <form
      className="flex items-center bg-white border border-gray-300 rounded-lg overflow-hidden w-full max-w-lg"
      onSubmit={handleSubmit}
    >
      <input
        className="flex-1 px-4 py-3 text-gray-700 focus:outline-none"
        id="search-input"
        placeholder="Search companies..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button
        type="submit"
        className="px-5 py-3 bg-blue-300 text-gray-800 hover:bg-blue-400 transition duration-300"
      >
        Search
      </button>
    </form>
  );
};

export default Search;
