"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { CreatorType, EventType } from "@/lib/types/event-type";
import EventCard from "@/components/event-card";
import { useParams } from "next/navigation";

export default function Creator() {
  const params = useParams();
  const [user, setUser] = useState<CreatorType | null>(null);
  const creatorId = params.id;
  const [events, setEvents] = useState<EventType[]>([]);

  useEffect(() => {
    const fetchEvent = async () => {
      console.log("CREATERID", creatorId);
      if (!creatorId) return null;
      try {
        const res = await axios.get(`/api/createdByEvents/${creatorId}`);
        console.log("all user data", res.data);

        setEvents(res.data.adminEvents);
      } catch (error) {
        console.error("Error fetching event:", error);
      }
    };
    fetchEvent();
  }, [creatorId]);
  useEffect(() => {
    const fetchUser = async () => {
      if (!creatorId) return null;
      console.log("creator id", creatorId);
      try {
        const res = await axios.get(`/api/createdByInfo/${creatorId}`);
        console.log("USER", res.data);

        setUser(res.data.user);
      } catch (error) {
        console.error("Error fetching event:", error);
      }
    };
    fetchUser();
  }, [creatorId]);
  return (
    <div className="flex justify-between">
      <div className="w-1/4">
        <div className="">
          {user && (
            <Card className="w-full max-w-sm shadow-lg rounded-2xl border ">
              <div className="flex flex-col items-center text-center space-y-4">
                <Image
                  src={user.image?.trim() || "/default-avatar.jpg"}
                  alt={user.name || "User"}
                  width={120}
                  height={120}
                  className="rounded-full border-4 border-blue-100 shadow-md"
                />

                <div>
                  <CardTitle className="text-xl font-semibold">
                    {user.name}
                  </CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">
                    {user.email}
                  </CardDescription>
                </div>

                {user.bio && (
                  <div className="bg-gray-50 text-sm text-gray-600 rounded-md px-4 py-2 w-full whitespace-pre-line">
                    {user.bio}
                  </div>
                )}

                <div className="flex justify-between w-full text-center pt-4 border-t text-sm text-muted-foreground">
                  <div className="flex-1">
                    <p className="font-semibold text-base text-primary">
                      {events.length}
                    </p>
                    <p>Events</p>
                  </div>
                  <div className="flex-1 border-l">
                    <p className="font-semibold text-base text-primary">
                      Creator
                    </p>
                    <p>Role</p>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
      <div className="w-3/4">
        {" "}
        <div className="px-4 pt-10">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Events ({events.length})
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
