"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { EventType } from "@/lib/types/event-type";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import EventCard from "@/components/event-card";
import { Filter } from "@/components/filter";
export default function AllEvents() {
  const [events, setEvents] = useState<EventType[] | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const [filterStatus, setFilterStatus] = useState<
    "all" | "online" | "offline"
  >("all");
  const [sortBy, setSortBy] = useState<"date" | "price">("date");

  // Fetch events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get("/api/event");
        setEvents(res.data.events ?? []);
      } catch (error) {
        console.error("Error fetching events", error);
      }
    };
    fetchEvents();
  }, []);

  // Filtered and sorted events
  const filteredEvents = events
    ?.filter((event) => {
      const matchesSearch =
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.shortDescription.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" || event.category === selectedCategory;

      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "date":
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case "price":
          return a.price - b.price;

        default:
          return 0;
      }
    });

  // UI fallback states
  if (events === null)
    return <p className="text-center mt-10">Loading events...</p>;
  if (events.length === 0)
    return <p className="text-center mt-10">No events found.</p>;

  return (
    <div className="px-4 md:px-10 pt-6 max-w-7xl mx-auto">
      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
        <Filter
          events={events}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
      </div>

      {/* Event Count */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold">
          {filteredEvents?.length} Events Found
        </h2>
        <p className="text-muted-foreground text-sm">
          Discover events that match your interests
        </p>
      </div>

      {/* Grid */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3
 gap-6 pb-16"
      >
        {filteredEvents?.map((event) => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>
    </div>
  );
}
