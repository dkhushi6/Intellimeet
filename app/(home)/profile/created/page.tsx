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

export default function Created() {
  interface EventType {
    _id: string;
    title: string;
    shortDescription: string;
    image: string;
    visitCount: number;
    date: Date;
    startTime: string;
    endTime: string;
    price: number;
    discountPrice: number;
    createdById: string;
    occupancy: string;
    category: string;
    isPublic: boolean;
    isOffline: boolean;
    location: {
      address: string;
      placeId: string;
      coordinates: {
        lat: number;
        lng: number;
      };
    };
  }

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

  if (loading)
    return <p className="text-center mt-10">Loading your events...</p>;
  if (!events || events.length === 0)
    return (
      <p className="text-center mt-10 text-muted-foreground">
        No events found.
      </p>
    );

  return (
    <div className="px-4 pt-10">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Your Created Events ({events.length})
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <Card
            key={event._id}
            className="rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-48 object-cover"
            />

            <CardHeader>
              <div className="flex items-center justify-between">
                <Link href={`/events/${event._id}`}>
                  <CardTitle className="text-xl hover:underline">
                    {event.title}
                  </CardTitle>
                </Link>
                <Badge
                  variant={event.isPublic ? "default" : "outline"}
                  className="text-xs"
                >
                  {event.isPublic ? "Public" : "Private"}
                </Badge>
              </div>
              <CardDescription>{event.shortDescription}</CardDescription>
            </CardHeader>

            <CardContent className="space-y-2">
              <p className="text-sm">
                <strong>Date:</strong>{" "}
                {new Date(event.date).toLocaleDateString()}
              </p>
              <p className="text-sm">
                <strong>Time:</strong> {event.startTime} - {event.endTime}
              </p>
              <Badge className="text-xs">{event.category}</Badge>

              {event.isOffline ? (
                <div className="space-y-1">
                  <p className="text-sm">
                    <strong>Location:</strong> {event.location.address}
                  </p>
                </div>
              ) : (
                <p className="text-sm font-semibold text-green-600">
                  Online Event
                </p>
              )}

              <p className="text-sm">
                <strong>Price:</strong> ₹
                {event.discountPrice > 0 ? event.discountPrice : event.price}
              </p>
              <p className="text-sm text-muted-foreground">
                Visitors: {event.visitCount}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
