"use client";

import { signOut } from "next-auth/react";
import React from "react";

const SignOut = () => {
  const handleOnClick = () => {
    signOut();
  };

  return <button onClick={handleOnClick}>SignOut</button>;
};

export default SignOut;
