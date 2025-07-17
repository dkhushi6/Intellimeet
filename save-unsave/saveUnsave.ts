import { EventType } from "@/lib/types/event-type";
import axios from "axios";
import { toast } from "sonner";

export async function UnsaveEvent(
  eventId: string,
  setEvents: React.Dispatch<React.SetStateAction<EventType[]>>
) {
  try {
    await axios.patch("/api/unsave", { eventId });
    setEvents((prev) => prev.filter((event) => event._id !== eventId));

    toast.success("Event unsaved successfully");
  } catch (error) {
    toast.error("Error unsaving the event");
  }
}
