"use client";

import EventCard from "@/components/event-card";
import { Button } from "@/components/ui/button";
import { EventType } from "@/lib/types/event-type";
import { UnsaveEvent } from "@/save-unsave/saveUnsave";
import axios from "axios";
import { Heart, HeartIcon } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const Page = () => {
  const [events, setEvent] = useState<EventType[]>([]);

  useEffect(() => {
    const fetchSavedEvents = async () => {
      try {
        const res = await axios.get("/api/user");
        setEvent(res.data.userEventSaved.savedEvents);
        const message = res?.data?.message;
        toast.success(message);
      } catch (error) {
        console.error("Saved events data not fetched.", error);
        toast.error("Error saving event");
      }
    };
    fetchSavedEvents();
  }, []);

  if (!events) {
    return (
      <p className="text-center py-10 text-muted-foreground">Loading...</p>
    );
  }

  if (events.length === 0)
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-64 h-64 mb-8 bg-muted rounded-full flex items-center justify-center">
          <Heart className="w-32 h-32 text-muted-foreground" />
        </div>
        <h3 className="text-2xl font-semibold mb-2">No saved events yet</h3>
        <p className="text-muted-foreground mb-6 max-w-md">
          You haven{"'"}t saved any events yet. Browse our events and save the
          ones that interest you.
        </p>
        <Button size="lg">
          <Link href="/events">Browse Events</Link>
        </Button>
      </div>
    );

  return (
    <div className="px-4 p-2">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div key={event._id}>
            <EventCard event={event} />
            <div className="flex items-center space-x-2 mt-3 cursor-pointer">
              <Button
                className="flex items-center space-x-1 text-red-600 hover:text-red-700 text-sm"
                onClick={() => UnsaveEvent(event._id, setEvent)}
                variant="ghost"
              >
                <HeartIcon className="h-4 w-4" />
                <span>Unsave</span>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
