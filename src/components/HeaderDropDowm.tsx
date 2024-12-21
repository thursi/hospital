import React from 'react';
import NavItem from './HeaderNavItem';

interface DropdownProps {
  items: { href: string; name: string }[];
  label: string;
  showDropdown: boolean;
  toggleDropdown: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  items,
  label,
  showDropdown,
  toggleDropdown,
  onMouseEnter,
  onMouseLeave,
}) => (
  <NavItem
    href="#"
    label={label}
    items={items}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    showDropdown={showDropdown}
    toggleDropdown={toggleDropdown}
  />
);

export default Dropdown;
