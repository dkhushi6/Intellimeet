"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function Event({ params }: { params: { id: string } }) {
  interface EventType {
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

  const [event, setEvent] = useState<EventType | null>(null);
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(`/api/event/${params.id}`);
        setEvent(res.data.currentEvent);
      } catch (error) {
        console.error("Error fetching event:", error);
      }
    };
    fetchEvent();
  }, [params.id]);

  const handleBuyNow = () => {
    if (!event) return;
    const unitPrice =
      event.discountPrice > 0 ? event.discountPrice : event.price;
    const total = quantity * unitPrice;
    alert(`You selected ${quantity} ticket(s). Total: ₹${total}`);
    // You can replace this with your purchase logic or API call
  };

  const handleIncrease = () => {
    if (event && quantity < parseInt(event.occupancy)) {
      setQuantity((q) => q + 1);
    }
  };
  const handleDecrease = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  if (!event) return <p>Loading...</p>;

  const unitPrice = event.discountPrice > 0 ? event.discountPrice : event.price;
  const totalPrice = quantity * unitPrice;

  return (
    <div className="max-w-5xl mx-auto p-4 flex flex-col lg:flex-row gap-6">
      {/* Left: Event Details */}
      <div className="lg:w-2/3 w-full">
        <Card className="rounded-2xl overflow-hidden shadow-lg">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-64 object-cover"
          />
          <CardHeader className="space-y-2">
            <CardTitle className="text-3xl">{event.title}</CardTitle>
            <CardDescription className="text-base text-muted-foreground">
              {event.shortDescription}
            </CardDescription>
            <div className="flex gap-2 mt-2 flex-wrap">
              <Badge variant="outline">{event.category}</Badge>
              <Badge variant="secondary">
                {event.isOffline ? "Offline" : "Online"}
              </Badge>
              <Badge>{event.isPublic ? "Public" : "Private"}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p>
              <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}{" "}
              <strong>Time:</strong> {event.startTime} – {event.endTime}
            </p>
            {event.isOffline && (
              <p>
                <strong>Location:</strong> {event.location.address}
              </p>
            )}
            <p>
              <strong>Price:</strong> ₹{unitPrice}
            </p>
            <p className="text-muted-foreground">
              Visitors: {event.visitCount}
            </p>
            <div className="pt-4">
              <h3 className="text-lg font-semibold">About this event:</h3>
              <p className="text-sm leading-relaxed">{event.longDescription}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right: Ticket Purchase Box */}
      <div className="lg:w-1/3 w-full">
        <Card className="p-6 rounded-2xl shadow-md space-y-4 border">
          <h2 className="text-xl font-semibold">Buy Ticket</h2>

          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              <span className="font-medium">Price per Ticket:</span> ₹
              {unitPrice}
            </p>

            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Quantity</label>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" onClick={handleDecrease}>
                  −
                </Button>
                <span className="w-8 text-center">{quantity}</span>
                <Button variant="outline" size="icon" onClick={handleIncrease}>
                  +
                </Button>
              </div>
            </div>

            <div className="pt-2 text-sm">
              <strong>Total Price:</strong> ₹{totalPrice}
            </div>
          </div>

          <Button
            className="w-full bg-black text-white hover:bg-gray-800"
            onClick={handleBuyNow}
          >
            Buy Now
          </Button>
        </Card>
      </div>
    </div>
  );
}
