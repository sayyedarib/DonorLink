import SignUp from "@/components/SignUp";
import React from "react";
import { useRouter } from "next/router";
const Auth = () => {
  const router = useRouter();
  return (
    <>
      <SignUp />
    </>
  );
};

export default Auth;
