"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

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
interface CreatorType {
  _id: string;
  name?: string;
  email?: string;
  image?: string;
  bio?: string;
}
export default function Creator({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [creatorId, setCreator] = useState("");
  const [user, setUser] = useState<CreatorType | null>(null);

  const [events, setEvents] = useState<EventType[]>([]);

  useEffect(() => {
    const resolveParams = async () => {
      const resolved = await params;
      setCreator(resolved.id);
    };
    resolveParams();
  }, [params]);

  useEffect(() => {
    const fetchEvent = async () => {
      if (!creatorId) return null;
      try {
        const res = await axios.get(`/api/createdByEvents/${creatorId}`);
        console.log("all", res.data);

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

      try {
        const res = await axios.get(`/api/createdByInfo/${creatorId}`);
        console.log("all", res.data);

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
                    {event.discountPrice > 0
                      ? event.discountPrice
                      : event.price}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Visitors: {event.visitCount}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
