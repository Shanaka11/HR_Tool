import React from "react";

type LovItemProps = {
  dataItem: Record<string, string>;
};

const LovItem = ({ dataItem }: LovItemProps) => {
  return (
    <div className="flex flex-col gap-1">
      {Object.entries(dataItem).map(([field, value]) => (
        <div key={field} className="flex flex-col">
          <span className="hidden group-hover:block text-xs text-gray-500">
            {field}
          </span>
          <span>{value}</span>
        </div>
      ))}
    </div>
  );
};

export default LovItem;
