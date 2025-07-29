"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import EventCard from "@/components/event-card";
import { EventType } from "@/lib/types/event-type";
import { Heart, PencilIcon, TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function Created() {
  const [events, setEvent] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleFetch = async () => {
      try {
        const res = await axios.get("/api/event/admin");
        setEvent(res.data.adminEvents);
      } catch (err) {
        console.error("Failed to fetch events", err);
      } finally {
        setLoading(false);
      }
    };
    handleFetch();
  }, []);
  const handleDelete = async ({ eventId }: { eventId: string }) => {
    try {
      const res = await axios.delete("/api/event/delete-edit", {
        data: { eventID: eventId },
      });
      console.log(res.data);
      toast.success("Event removed successfully");

      // Optionally remove from UI
      setEvent((prev) => prev.filter((event) => event._id !== eventId));
    } catch {
      toast.error("Failed to delete event");
    }
  };

  if (loading)
    return <p className="text-center mt-10">Loading your events...</p>;
  if (!events || events.length === 0)
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
    <div className="px-4 pt-2">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div key={event._id}>
            {" "}
            <EventCard event={event} />
            <div className="flex items-center space-x-2 mt-3">
              <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm">
                <PencilIcon className="h-4 w-4" />
                <span>Edit</span>
              </button>

              <Button
                className="flex items-center space-x-1 text-red-600 hover:text-red-700 text-sm"
                variant="ghost"
                onClick={() => {
                  handleDelete({ eventId: event._id });
                }}
              >
                <TrashIcon className="h-4 w-4" />
                <span>Delete</span>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
