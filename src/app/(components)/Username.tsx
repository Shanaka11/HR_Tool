"use client";

import React from "react";

import { useUserContext } from "./UserProvider";

type UsernameProps = {
  classname?: string;
};

const Username: React.FC<UsernameProps> = ({ classname }) => {
  const userInfo = useUserContext();
  return <span className={classname}>{userInfo.userName}</span>;
};

export default Username;
