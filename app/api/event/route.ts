import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mdb-connection";
import Event from "@/lib/models/event";

//creating an event
export async function POST(req: NextRequest) {
  await connectDB();
  const body = await req.json();

  const {
    title,
    longDescription,
    shortDescription,
    image,
    day,
    date,
    start,
    end,
    prize,
    discountPrize,
    createdById,
    location,
  } = body;

  if (
    !title ||
    !longDescription ||
    !shortDescription ||
    !image ||
    !day ||
    !date ||
    !start ||
    !end ||
    !prize ||
    !discountPrize ||
    !location?.address ||
    !location?.placeId ||
    !location?.coordinates?.lat ||
    !location?.coordinates?.lng
  ) {
    return NextResponse.json(
      { message: "All fields are required" },
      { status: 400 }
    );
  }
  if (!createdById) {
    return NextResponse.json({ message: "enter admin ID" });
  }
  const exEvent = await Event.findOne({ title });
  if (exEvent) {
    return NextResponse.json({
      message: "event exist already change the user name",
    });
  }
  const event = await Event.create({
    title,
    longDescription,
    shortDescription,
    image,
    day,
    date,
    start,
    end,
    prize,
    discountPrize,
    createdById,
    location,
  });
  return NextResponse.json({ message: "event created successfully", event });
}

// see all events
export async function GET(req: NextRequest) {
  await connectDB();
  const allEvent = await Event.find();
  if (!allEvent) {
    return NextResponse.json({ message: "error fetching events" });
  } else {
    return NextResponse.json({ message: "all events are", events: allEvent });
  }
}
