"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import EventCard from "./event-card";
import { ChevronLeftIcon, ChevronRightIcon, Flame } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";
import { EventType } from "@/lib/types/event-type";
import { Button } from "./ui/button";

const NewEvent = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [events, setEvents] = useState<EventType[] | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get("/api/new-events");
        setEvents(res.data.events);
      } catch (error) {
        console.error("Error fetching events", error);
      }
    };
    fetchEvents();
  }, []);
  if (!events) return <p className="text-center mt-10">Loading events...</p>;

  if (events.length === 0)
    return <p className="text-center mt-10">No events found.</p>;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(events.length - 2));
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) =>
        (prev - 1 + Math.ceil(events.length - 2)) % Math.ceil(events.length - 2)
    );
  };

  return (
    <div>
      <section className="py-20 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div className="">
              <div className="flex gap-2 items-baseline">
                <Flame className="h-10 w-10 text-[#6366F1]" />
                <h2 className="text-4xl font-bold  mb-2">New Events</h2>
              </div>

              <p className="text-gray-600">
                Discover the latest events happening around you
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={prevSlide}
                className="p-3 rounded-full bg-white hover:bg-gray-50 transition-colors duration-200 shadow-md hover:shadow-lg"
              >
                <ChevronLeftIcon className="h-5 w-5 text-gray-600" />
              </Button>
              <Button
                variant="outline"
                onClick={nextSlide}
                className="p-3 rounded-full bg-white hover:bg-gray-50 transition-colors duration-200 shadow-md hover:shadow-lg"
              >
                <ChevronRightIcon className="h-5 w-5 text-gray-600" />
              </Button>
            </div>
          </div>

          <div className="overflow-hidden">
            <motion.div
              className="flex space-x-6"
              animate={{ x: -currentSlide * 320 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              {events.map((event) => (
                <div key={event._id} className="w-80 flex-shrink-0">
                  <EventCard event={event} />
                </div>
              ))}
            </motion.div>
          </div>

          <div className="text-center mt-8">
            <Link
              href="/explore"
              className="inline-flex items-center text-[#6366F1] hover:text-[#4d4fb0] font-semibold transition-colors duration-200 text-lg"
            >
              Browse All Events →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewEvent;
