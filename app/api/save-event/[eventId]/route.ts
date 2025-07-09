import { connectDB } from "@/lib/mdb-connection";
import event from "@/lib/models/event";
import User from "@/lib/models/user";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

// saved item route
export async function POST(
  req: NextRequest,
  { params }: { params: { eventId: string } }
) {
  await connectDB();
  const body = await req.json();
  const { userId } = body;
  const eventId = params.eventId;
  if (!userId) {
    return NextResponse.json({ message: "userId not found login first" });
  }
  const existingUser = await User.findOne({ _id: userId });
  if (!existingUser) {
    return NextResponse.json({ message: "user not found" });
  }

  const alreadySavedEvent = await existingUser.savedEvents.some(
    (savedId: any) => savedId.toString() === eventId
  );
  if (alreadySavedEvent) {
    return NextResponse.json({
      message: "event already saved",
      alreadySavedEvent,
    });
  }
  try {
    existingUser.savedEvents.push(eventId);
    await existingUser.save();
    return NextResponse.json({ message: "user saved ", existingUser });
  } catch (err) {
    console.error("Error saving event:", err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
