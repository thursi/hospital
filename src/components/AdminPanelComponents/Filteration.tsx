"use client";

import FilterIcon from "../svg/filter-icon";

interface Props {
  getApi: any;
}
const Filteration = (props: Props) => {
  return (
    <div className="absolute z-20 top-2 right-2 h-8 w-8 bg-white text-center">
      <FilterIcon />
    </div>
  );
};

export default Filteration;
