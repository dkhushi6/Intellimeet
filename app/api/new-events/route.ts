import Event from "@/lib/models/event";
import { NextRequest, NextResponse } from "next/server";
//see all new events
export async function GET(req: NextRequest) {
  const newEvents = await Event.find().sort({ createdAt: -1 }).limit(5);
  if (!newEvents) {
    return NextResponse.json({ message: "events not found" });
  }
  if (newEvents) {
    return NextResponse.json({
      message: "event in descending order---",
      events: newEvents,
    });
  }
}
