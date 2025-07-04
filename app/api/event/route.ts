import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mdb-connection";
import Event from "@/lib/models/event";
import { auth } from "@/auth";
import User from "@/lib/models/user";
//creating an event
export async function POST(req: NextRequest) {
  await connectDB();
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({
      message: "login first",
    });
  }

  const body = await req.json();
  let user = await User.findOne({ email: session.user.email });
  if (!user) {
    user = await User.create({
      name: session.user.name,
      email: session.user.email,
      image: session.user.image,
    });
  }
  const {
    title,
    longDescription,
    shortDescription,
    image,
    date,
    startTime,
    endTime,
    price,
    discountPrice,
    createdById,
    isOffline,
    isPublic,
    category,
    occupancy,
    location,
  } = body;
  if (
    !title ||
    !longDescription ||
    !shortDescription ||
    !image ||
    !date ||
    !startTime ||
    !endTime ||
    !price ||
    !discountPrice ||
    !createdById ||
    !category ||
    !occupancy
  ) {
    return NextResponse.json(
      { message: "All fields are required" },
      { status: 400 }
    );
  }
  if (isOffline) {
    if (
      !location?.address ||
      !location?.placeId ||
      !location?.coordinates?.lat ||
      !location?.coordinates?.lng
    ) {
      return NextResponse.json(
        { message: "Location details are required for offline events." },
        { status: 400 }
      );
    }
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
    isOffline,
    isPublic,
    category,
    occupancy,
    date,
    startTime,
    endTime,
    price,
    discountPrice,
    createdById: user._id,
    location: isOffline ? location : undefined,
  });
  return NextResponse.json({ message: "event created successfully", event });
}

// see all events that are both public and private
export async function GET(req: NextRequest) {
  await connectDB();
  const allEvent = await Event.find();
  if (!allEvent) {
    return NextResponse.json({ message: "error fetching events" });
  } else {
    return NextResponse.json({ message: "all events are", events: allEvent });
  }
}
