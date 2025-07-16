import { EventType } from "@/lib/types/event-type";
import axios from "axios";
import { toast } from "sonner";

export async function UnsaveEvent(
  eventId: string,
  setEvents: React.Dispatch<React.SetStateAction<EventType[]>>
) {
  try {
    await axios.patch("/api/unsave", { eventId });
    toast.success("Event removed successfully");
  } catch (error) {
    toast.error("Error removing the event");
  }
}
