import ProfileNav from "@/components/profileNav/page";
import UserProfile from "@/components/userProfile/page";
import React from "react";

interface Layoutprops {
  children: React.ReactNode;
}

export default function profileLayout({ children }: Layoutprops) {
  return (
    <div className="flex ">
      <div className="w-1/4">
        <UserProfile />
      </div>
      <div className="w-3/4">
        <ProfileNav />
        {children}
      </div>
    </div>
  );
}
