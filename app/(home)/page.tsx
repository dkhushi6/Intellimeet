"use client";
import Dashboard from "@/components/dashboard";
import Feature from "@/components/feature/feature";
import NewEvent from "@/components/newEvent";

export default function Home() {
  return (
    <div className="">
      <div>
        <Dashboard />
      </div>
      <div>
        <NewEvent />{" "}
        <div>
          {" "}
          <Feature />
        </div>{" "}
      </div>
    </div>
  );
}
