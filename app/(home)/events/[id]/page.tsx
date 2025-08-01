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
import { useSession } from "next-auth/react";
import { Share } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CreatorType, EventType } from "@/lib/types/event-type";
import { toast } from "sonner";

export default function Event({ params }: { params: Promise<{ id: string }> }) {
  const [eventId, setEventId] = useState<string | null>(null);
  const [creator, setCreator] = useState<CreatorType | null>(null);

  const [event, setEvent] = useState<EventType | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const { data: session } = useSession();

  const isCreator = session?.user?.id === event?.createdById;
  //params unwraping
  useEffect(() => {
    const resolveParams = async () => {
      const resolved = await params;
      setEventId(resolved.id);
    };
    resolveParams();
  }, [params]);

  useEffect(() => {
    const fetchEvent = async () => {
      if (!eventId) return null;
      try {
        const res = await axios.get(`/api/event/${eventId}`);
        // console.log("all", res.data);
        // console.log("Creator", res.data.createdByInfo);

        setEvent(res.data.currentEvent);
        setCreator(res.data.createdByInfo);
      } catch (error) {
        console.error("Error fetching event:", error);
      }
    };
    fetchEvent();
  }, [eventId]);

  const handleBuyNow = async () => {
    //if (!event) return;
    //const unitPrice =
    // event.discountPrice > 0 ? event.discountPrice : event.price;
    // const total = quantity * unitPrice;
    // alert(`You selected ${quantity} ticket(s). Total: ₹${total}`);
    // You can replace this with your purchase logic or API call
    console.log("User ID:", session?.user?.id);
    console.log("Event ID:", eventId);

    try {
      const payload = {
        userId: session?.user?.id,
        eventId,
        quantity,
      };
      const res = await axios.post("/api/purchase", payload);
      const message = res?.data?.message;
      toast.success(message);
    } catch (error) {
      console.error("error purchasing", error);
      toast.error("Error Buying ticket  event");
    }
  };

  const handleIncrease = () => {
    if (event && quantity < parseInt(event.occupancy)) {
      setQuantity((q) => q + 1);
    }
  };
  const handleDecrease = () => setQuantity((q) => (q > 1 ? q - 1 : 1));
  //save
  const handleSave = async () => {
    try {
      const res = await axios.post(`/api/save-event/${eventId}`, {
        eventId,
        userId: session?.user?.id,
      });
      const message = res?.data?.message;
      toast.success(message);
      // console.log(res.data);
    } catch (error) {
      console.error("saved events data not fetched problem in fetching", error);
      toast.error("Error saving event");
    }
  };
  if (!event) return <p>Loading...</p>;

  const unitPrice = event.discountPrice > 0 ? event.discountPrice : event.price;
  const totalPrice = quantity * unitPrice;

  return (
    <div className="max-w-5xl mx-auto p-4 flex flex-col lg:flex-row gap-6">
      <div className="lg:w-2/3 w-full">
        <Card className="rounded-2xl overflow-hidden shadow-lg pt-0">
          <Image
            src={event.image}
            alt={event.title}
            width={800} // Replace with actual width if known
            height={256} // h-64 = 16rem = 256px
            className="w-full h-64 object-cover"
            style={{ objectFit: "cover" }}
          />
          <div>
            {event.createdById === session?.user?.id ? (
              <span className="text-sm font-medium text-emerald-600">
                created by you
              </span>
            ) : (
              <div className="flex justify-between px-6">
                <div className="flex gap-2 ">
                  <div>
                    <Image
                      src={creator?.image ?? "/default-avatar.jpg"}
                      alt="creator avatar"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  </div>
                  <div>
                    <Link href={`/createdByEvents/${creator?._id}`}>
                      <div className="text-[15px] text-sm font-semibold leading-none cursor-pointer">
                        {creator?.name}
                      </div>
                    </Link>

                    <div className="text-[12px]text-xs text-muted-foreground">
                      {creator?.email}
                    </div>
                  </div>{" "}
                </div>
                <div>
                  <span className="text-green-700 bg-green-100 border border-green-300 text-xs px-3 py-1 rounded-full font-medium">
                    Creator
                  </span>
                </div>
              </div>
            )}
          </div>
          <CardHeader className="space-y-2">
            <div className="flex justify-between">
              <div>
                <CardTitle className="text-3xl">{event.title}</CardTitle>
                <CardDescription className="text-base text-muted-foreground">
                  {event.shortDescription}
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  aria-label="Toggle theme"
                  className="transition-all"
                >
                  <Share className="" />
                </Button>
                <Button onClick={handleSave}>save</Button>
              </div>
            </div>

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
        {isCreator ? (
          <Card className="p-6 rounded-2xl shadow-md border bg-muted">
            <h2 className="text-xl font-semibold text-gray-700">
              You{"'"}re the Organizer
            </h2>
            <p className="text-sm text-muted-foreground pt-2">
              You created this event, so ticket purchase is not required.
            </p>
          </Card>
        ) : (
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
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleDecrease}
                  >
                    −
                  </Button>
                  <span className="w-8 text-center">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleIncrease}
                  >
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
        )}
      </div>
    </div>
  );
}
