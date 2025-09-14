"use client";

import EventCard from "@/components/event-card";
import NoEvents from "@/components/no-events";
import { Button } from "@/components/ui/button";
import { EventType } from "@/lib/types/event-type";
import { UnsaveEvent } from "@/save-unsave/saveUnsave";
import axios from "axios";
import { HeartIcon } from "lucide-react";
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
      } catch (error) {
        console.error("Saved events data not fetched.", error);
      }
    };
    fetchSavedEvents();
  }, []);

  <NoEvents events={events} />;
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
