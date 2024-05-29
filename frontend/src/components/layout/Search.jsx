import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    if (keyword?.trim()) {
      navigate(`/?keyword=${keyword}`);
    } else {
      navigate(`/`);
    }
  };

  return (
    <form onSubmit={submitHandler} className="flex items-center w-full">
      <input
        type="text"
        id="search_field"
        className="flex-grow px-6 py-3 text-lg border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition duration-200"
        placeholder="Enter Product Name ..."
        name="keyword"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <button
        id="search_btn"
        className="bg-orange-400 text-white px-6 py-3 rounded-r-lg hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-200"
        type="submit"
      >
        <i className="fa fa-search" aria-hidden="true"></i>
      </button>
    </form>
  );
};

export default Search;