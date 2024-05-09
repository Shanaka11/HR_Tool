"use client";

import { createStore, Provider } from "jotai";
import React, { useState } from "react";

const DataTableProvider = ({ children }: { children: React.ReactNode }) => {
  // const [store] = useState(() => createStore());
  return <Provider>{children}</Provider>;
};

export default DataTableProvider;
