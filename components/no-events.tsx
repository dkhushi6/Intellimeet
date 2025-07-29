import { Heart, Link } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import { EventType } from "@/lib/types/event-type";
type NoEventsProps = {
  events: EventType[] | null;
};
const NoEvents: React.FC<NoEventsProps> = ({ events }) => {
  if (!events) {
    return (
      <p className="text-center py-10 text-muted-foreground">Loading...</p>
    );
  }

  if (events.length === 0)
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-64 h-64 mb-8 bg-muted rounded-full flex items-center justify-center">
          <Heart className="w-32 h-32 text-muted-foreground" />
        </div>
        <h3 className="text-2xl font-semibold mb-2">No saved events yet</h3>
        <p className="text-muted-foreground mb-6 max-w-md">
          No events there yet. Browse our events and add the ones that interest
          you.
        </p>
        <Link href="/events">
          <Button size="lg">Browse Events</Button>
        </Link>
      </div>
    );
};

export default NoEvents;
