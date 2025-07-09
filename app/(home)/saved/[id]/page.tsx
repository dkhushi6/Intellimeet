"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const page = () => {
  interface EventType {
    _id: string;
    title: string;
    longDescription: string;
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

  useEffect(() => {
    const fetchSavedEvents = async () => {
      try {
        const res = await axios.get("/api/user");
        console.log(res.data);
        setEvent(res.data.userEventSaved.savedEvents);
      } catch (error) {
        console.error("saved events data not fetched problem in fetching");
      }
    };
    fetchSavedEvents();
  }, []);
  if (!events) {
    return <p>Loading...</p>;
  }
  if (events.length === 0) return <p>No events found.</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {events.map((event) => (
        <Card key={event._id} className="rounded-2xl shadow-md overflow-hidden">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-48 object-cover"
          />
          <CardHeader>
            <CardTitle className="text-xl">{event.title}</CardTitle>
            <CardDescription>{event.shortDescription}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm text-muted-foreground">
              {event.longDescription.slice(0, 100)}...
            </p>
            <p className="text-sm">
              <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
            </p>
            <p className="text-sm">
              <strong>Time:</strong> {event.startTime} - {event.endTime}
            </p>
            {event.isOffline ? (
              <div className="space-y-1">
                <p className="text-sm">
                  <strong>Location:</strong> {event.location.address}
                </p>
                <p className="text-sm">
                  <strong>Price:</strong> ₹
                  {event.discountPrice > 0 ? event.discountPrice : event.price}
                </p>
                <p className="text-sm text-muted-foreground">
                  Visitors: {event.visitCount}
                </p>
              </div>
            ) : (
              <p className="text-sm font-semibold text-green-600">ONLINE</p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default page;
