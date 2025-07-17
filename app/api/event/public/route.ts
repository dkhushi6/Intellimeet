//to see all public events
import Event from "@/lib/models/event";
import { connectDB } from "@/lib/mdb-connection";

import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();
  const publicEvents = await Event.find({ isPublic: true });

  if (!publicEvents || publicEvents.length === 0) {
    return NextResponse.json({ message: "No public events found." });
  } else {
    return NextResponse.json({
      message: "all public ebents are",
      publicEvents,
    });
  }
}
