"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Heart, MapPin, Monitor, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import EventCard from "@/components/event-card";
import { EventType } from "@/lib/types/event-type";

export default function Purchased() {
  const [events, setEvent] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleFetch = async () => {
      try {
        const res = await axios.get("/api/purchase/user");
        setEvent(res.data.userPur.map((p: any) => p.eventId)); //new

        console.log(res.data);
      } catch (err) {
        console.error("Failed to fetch events", err);
      } finally {
        setLoading(false);
      }
    };
    handleFetch();
  }, []);

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
          You haven't saved any events yet. Browse our events and save the ones
          that interest you.
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
          <EventCard key={event._id} event={event} />
        ))}
      </div>
    </div>
  );
}
