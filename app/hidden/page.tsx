"use client";
import { signOut } from "next-auth/react";
import React from "react";
import { useDisconnect, useAccount } from "wagmi";

const HiddenPage = () => {
  const [mounted, setMounted] = React.useState(false);
  const { address } = useAccount();
  const { disconnectAsync } = useDisconnect();
  const handleSignout = async () => {
    disconnectAsync();
    signOut({callbackUrl:"/"});
  };
  
  React.useEffect(() => setMounted(true), []);
  if(!mounted) return <></>

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 suppressHydrationWarning className="text-5xl tracking-tight font-extrabold text-gray-300 mb-2">
        Congratulations {address?.slice(0, 5)}...{address?.slice(-5)}
      </h1>
      <h2 className="text-3xl text-gray-500">
        You have successfully signed in using
      </h2>
      <p className="text-gray-500">
        <span className="font-semibold text-green-400 text-xl">
          io.network
        </span>
      </p>
      <button
        className="rounded-lg py-2 px-4 mt-6 bg-red-700 hover:border hover:border-red-700 hover:bg-transparent fixed top-0 right-4"
        onClick={handleSignout}
      >
        Sign Out
      </button>
    </div>
  );
};

export default HiddenPage;
