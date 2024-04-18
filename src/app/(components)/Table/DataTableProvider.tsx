"use client";

import { Provider, createStore } from "jotai";
import React, { useState } from "react";

const DataTableProvider = ({ children }: { children: React.ReactNode }) => {
  const [store] = useState(() => createStore());
  return <Provider store={store}>{children}</Provider>;
};

export default DataTableProvider;
