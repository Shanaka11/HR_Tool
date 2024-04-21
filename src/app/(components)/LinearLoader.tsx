import React from "react";

const LinearLoader = () => {
  return (
    <div className="w-full">
      <div className="h-1 w-full bg-white overflow-hidden">
        <div className="animate-progress w-full h-full bg-primary"></div>
      </div>
    </div>
  );
};

export default LinearLoader;
