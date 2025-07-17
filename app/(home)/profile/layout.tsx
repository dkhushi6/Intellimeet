import ProfileNav from "@/components/profileNav/page";
import { Card } from "@/components/ui/card";
import UserProfile from "@/components/userProfile/page";
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

export default function ProfileLayout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col md:flex-row min-h-screen max-w-8xl mx-auto">
      {/* Sidebar / User Profile */}
      <aside className="md:w-1/4 w-full p-4 md:pr-2">
        <UserProfile />
      </aside>

      {/* Main Content */}
      <main className="md:w-3/4 w-full p-4 md:pl-2 ">
        <Card className="rounded-2xl shadow-lg p-4 ">
          <ProfileNav />
          <div className="mt-2">{children}</div> {/* Reduced margin-top here */}
        </Card>
      </main>
    </div>
  );
}
