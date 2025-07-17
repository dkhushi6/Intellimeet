import { connectDB } from "@/lib/mdb-connection";
import { NextRequest, NextResponse } from "next/server";
import Event from "@/lib/models/event";

//deleting an event
export async function DELETE(req: NextRequest) {
  await connectDB();
  const body = await req.json();
  const { eventID } = body;
  if (!eventID) {
    return NextResponse.json({ message: "eventId not found" });
  }
  const eventDel = await Event.findByIdAndDelete(eventID);
  if (!eventDel) {
    return NextResponse.json({ message: "event not found" });
  } else {
    return NextResponse.json({ message: "event deleted successfully" });
  }
}

// edit an event
export async function PUT(req: NextRequest) {
  await connectDB();
  const body = await req.json();

  const {
    eventID,
    title,
    longDescription,
    shortDescription,
    image,
    day,
    date,
    startTime,
    endTime,
    price,
    discountPrice,
    location,
  } = body;
  if (
    !title ||
    !longDescription ||
    !shortDescription ||
    !image ||
    !day ||
    !date ||
    !startTime ||
    !endTime ||
    !price ||
    !discountPrice ||
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
  if (!eventID) {
    return NextResponse.json(
      { message: "event id not found" },
      { status: 400 }
    );
  }
  const updatedEvent = await Event.findByIdAndUpdate(
    eventID,
    {
      title,
      longDescription,
      shortDescription,
      image,
      day,
      date,
      startTime,
      endTime,
      price,
      discountPrice,
      location,
    },
    { new: true }
  );
  if (!updatedEvent) {
    return NextResponse.json({ message: "event not updated error" });
  } else {
    return NextResponse.json({
      message: "event updated successfully",
      updatedEvent,
    });
  }
}
