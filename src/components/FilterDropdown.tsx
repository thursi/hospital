import { useState } from "react";

interface FilterDropdownProps {
  options: Array<{ label: string; value: string }>;
  placeholder: string;
  onChange: (lable: string) => void;
  value: any; // Add this line
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  options,
  placeholder,
  onChange,
  value, // Add this line
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchTerm(searchValue);
    setFilteredOptions(
      options.filter((option) =>
        option.label.toLowerCase().includes(searchValue)
      )
    );
  };

  const handleSelect = (option: any) => {
    onChange(option);
    setSearchTerm(""); // Reset search term
    setFilteredOptions(options); // Reset options
    setDropdownVisible(false); // Hide the dropdown
  };

  const handleFocus = () => {
    setDropdownVisible(true);
    setFilteredOptions(options); // Show all options on focus
  };

  const handleBlur = () => {
    // Set a timeout to delay hiding dropdown until after click event
    setTimeout(() => setDropdownVisible(false), 200);
  };

  return (
    <div className="relative">
      <input
        type="text"
        placeholder={placeholder}
        value={value?.label}
        onChange={handleSearch}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
      {isDropdownVisible && (
        <ul className="absolute bg-white shadow-md mt-1 max-h-48 w-full overflow-y-auto z-10">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <li
                key={index}
                className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                onClick={() => handleSelect(option)}
              >
                {option.label}
              </li>
            ))
          ) : (
            <li className="px-4 py-2 text-gray-500">No results found</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default FilterDropdown;
