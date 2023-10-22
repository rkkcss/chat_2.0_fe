import React from "react";

export const SearchInUsers = ({ searchInput, handleInputChange }) => {
  return (
    <div className="transition duration-100 w-full">
      <input
        type="text"
        placeholder="Keresés a beszélgetések között..."
        className="shadow 
            border rounded-xl 
            w-full px-2.5 py-2.5 
            text-gray-700 
            leading-tight 
            focus:outline-emerald-100 
            focus:shadow-outline"
        onChange={handleInputChange}
      />
    </div>
  );
};
