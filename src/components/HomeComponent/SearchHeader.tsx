import React from 'react';
import { X, ChevronLeft } from 'lucide-react';

const SearchHeader = ({ searchText, onBack, onClose }:any) => {
  return (
    <div className="flex items-center gap-4 bg-gray-100 py-3 rounded-lg">
      <button 
        onClick={onBack}
        className="text-gray-600 hover:text-gray-800 p-1"
        aria-label="Go back"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      
      <div className="flex-1">
        <div className="text-sm text-gray-600">
          Search results for
        </div>
        <div className="font-medium text-gray-800">
          {searchText}
        </div>
      </div>

      <button 
        onClick={onClose}
        className="text-gray-600 hover:text-gray-800 p-1"
        aria-label="Close search"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
};

export default SearchHeader;