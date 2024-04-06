"use client";
import { signIn, useSession } from "next-auth/react";
import { useSearchParams, redirect } from "next/navigation";
import React, { useEffect } from "react";

const page = () => {
  const { status } = useSession();
  const urlparams = useSearchParams();

  useEffect(() => {
    if (status === "unauthenticated") {
      signIn("github");
    } else if (status === "authenticated") {
      const callbackUrl = urlparams.get("callbackUrl");
      if (callbackUrl !== null) {
        redirect(callbackUrl);
      } else {
        //redirect to home
        redirect("/");
      }
    }
  }, [status]);
  return <div></div>;
};

export default page;
