import React, { useState } from 'react';

interface DropdownItem {
  label?: string;
  onClick?: () => void;
  isDisabled?: boolean;
}

interface DropdownProps {
  title: string;
  subtitle: string;
  departments: DropdownItem[]|any;
}

const Dropdown: React.FC<DropdownProps> = ({ title, subtitle, departments }) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  const toggleDropdown = () => {
    setExpanded(!expanded);
  };

  return (
    <div>
      <div>
        <h1
          style={{ width: 250, height: 40 }}
          className="flex flex-initial font-bold bg-white  border-b-2 border-gray-200 pl-4 pt-4 cursor-pointer "
          onClick={toggleDropdown}
        >
          {title}
        </h1>
      </div>
      {expanded && (
        <div className="bg-white p-4" style={{ width: 250 }}>
          <div className="mb-4 ">
            <h2 className="">{subtitle}</h2>
            <ul>
              {departments.map((item:any, index:any) => (
                <li key={index} className="mb-1">
                  <button
                    onClick={item.onClick}
                    disabled={item.isDisabled}
                    className={`${item.isDisabled ? 'cursor-not-allowed opacity-50' : ''}`}
                  >
                    {item?.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
