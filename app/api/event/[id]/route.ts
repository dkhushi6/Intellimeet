import { connectDB } from "@/lib/mdb-connection";
import { NextRequest, NextResponse } from "next/server";
import Event from "@/lib/models/event";

//deleting an event
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDB();
  const eventDel = await Event.findByIdAndDelete({ _id: params.id });
  if (!eventDel) {
    return NextResponse.json({ message: "event not found" });
  } else {
    return NextResponse.json({ message: "event deleted successfully" });
  }
}

// edit an event
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDB();
  const body = await req.json();
  const {
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
  const updatedEvent = await Event.findByIdAndUpdate(
    params.id,
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

// view that specific event
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDB();
  const currentEvent: any = await Event.findOne({ _id: params.id });

  if (!currentEvent && currentEvent.lenght === 0) {
    return NextResponse.json({ message: "current event not found error" });
  } else {
    return NextResponse.json({
      message: "the current event details are",
      currentEvent,
    });
  }
}
