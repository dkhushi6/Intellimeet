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
    start,
    end,
    prize,
    discountPrize,
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
  const updatedEvent = await Event.findByIdAndUpdate(
    params.id,
    {
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
