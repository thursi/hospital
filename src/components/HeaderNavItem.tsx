import Link from 'next/link';
import React from 'react';

interface NavItemProps {
  href: string;
  label: string;
  items?: { href: string; name: string }[];
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  showDropdown?: boolean;
  toggleDropdown?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({
  href,
  label,
  items,
  onMouseEnter,
  onMouseLeave,
  showDropdown,
  toggleDropdown,
}) => (
  <li
    className="relative"
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
  >
    <button
      onClick={toggleDropdown}
      className="hover:text-red-500"
    >
      <Link href={href} legacyBehavior>
        <a className="hover:text-red-500">{label}</a>
      </Link>
    </button>
    {showDropdown && items && (
      <div className="absolute bg-white shadow-md mt-2 w-48">
        <ul className="flex flex-col space-y-2">
          {items.map((item, index) => (
            <li key={index}>
              <Link href={item.href} legacyBehavior>
                <a className="text-gray-600 block px-4 py-2">
                  {item.name}
                  <hr className="mt-2" />
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )}
  </li>
);

export default NavItem;
