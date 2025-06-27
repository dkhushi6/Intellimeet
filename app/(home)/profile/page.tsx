"use client";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import React from "react";

const page = () => {
  const { data: session } = useSession();
  return (
    <div>
      <div>{session?.user?.image}</div>
      <div>{session?.user?.name}</div>
      <div>{session?.user?.email}</div>
      <Button
        variant={"outline"}
        onClick={() => {
          signOut();
        }}
      >
        {" "}
        LogOut
      </Button>
    </div>
  );
};

export default page;
