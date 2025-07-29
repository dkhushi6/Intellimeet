"use client";

import { Badge, Calendar, Clock, Monitor, MapPin, Users } from "lucide-react";
import React from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { EventType } from "@/lib/types/event-type";
import Link from "next/link";
import Image from "next/image";

type EventCardProps = {
  event: EventType;
};

const EventCard = ({ event }: EventCardProps) => {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden  p-0">
      <div className="relative">
        <Image
          src={event.image}
          alt={event.title}
          width={800} // optional, use real width if known
          height={192} // h-48 = 12rem = 192px
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          style={{ objectFit: "cover" }}
        />
        <div className="absolute top-4 right-4"></div>
        <Button
          className="absolute top-4  left-4 bg-background/80 backdrop-blur-sm rounded-2xl"
          variant="outline"
        >
          {event.category}
        </Button>
      </div>

      <CardContent className="p-6">
        <Link href={`/events/${event._id}`}>
          {" "}
          <h3 className="text-xl font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {event.title}
          </h3>
        </Link>

        <p className="text-muted-foreground mb-4 line-clamp-2">
          {event.shortDescription}
        </p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="w-4 h-4 text-primary" />
            <span>{new Date(event.date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4 text-primary" />
            <span>
              {event.startTime} - {event.endTime}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            {event.isOffline ? (
              <>
                <MapPin className="w-4 h-4 text-primary" />
                <span>{event.location.address}</span>
              </>
            ) : (
              <>
                <Monitor className="w-4 h-4 text-primary" />
                <span>Online Event</span>
              </>
            )}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="w-4 h-4" />
            <span>
              {(event.visitCount || 0).toLocaleString()} people viewed
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {event.discountPrice > 0 ? (
              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold">
                  ₹{event.discountPrice}
                </span>
                <span className="text-sm text-muted-foreground line-through">
                  ₹{event.price}
                </span>
              </div>
            ) : event.price === 0 ? (
              <Badge className="text-green-600 bg-green-50">Free</Badge>
            ) : (
              <span className="text-lg font-semibold">₹{event.price}</span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EventCard;
