import ProfileNav from "@/components/profileNav/page";
import UserProfile from "@/components/userProfile/page";
import React from "react";

interface Layoutprops {
  children: React.ReactNode;
}

export default function profileLayout({ children }: Layoutprops) {
  return (
    <div className="flex ">
      <div className="w-1/4 fixed">
        <UserProfile />
      </div>
      <div className="w-3/4 ml-[26%]">
        <ProfileNav />
        {children}
      </div>
    </div>
  );
}
