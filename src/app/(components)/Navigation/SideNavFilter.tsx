import { useDebounce } from "@/lib/useDebounce";
import { X } from "lucide-react";
import React, { useState } from "react";

type SideNavFilterProps = {
  setParentFilterString: (filterString: string) => void;
};

const SideNavFilter: React.FC<SideNavFilterProps> = ({
  setParentFilterString,
}) => {
  const [filterString, setFilterString] = useState("");
  const debouncedCallback = useDebounce(() => {
    setParentFilterString(filterString);
  }, 1000);

  const handleFilterStringOnChange = (value: string) => {
    setFilterString(value);
    // Trigger this on a debounce
    debouncedCallback();
    // setParentFilterString(value);
  };

  const clearFilterString = () => {
    setFilterString("");
    setParentFilterString("");
  };

  return (
    <div className="w-full bg-slate-800 text-white text-xs p-2 py-1 border-b border-b-slate-500 flex gap-1">
      <input
        className="bg-slate-800 outline-none w-full"
        placeholder="Find page"
        value={filterString}
        onChange={(event) => handleFilterStringOnChange(event.target.value)}
      />
      {filterString !== "" && (
        <X
          size="15"
          className="text-white cursor-pointer"
          onClick={clearFilterString}
        />
      )}
    </div>
  );
};

export default SideNavFilter;
