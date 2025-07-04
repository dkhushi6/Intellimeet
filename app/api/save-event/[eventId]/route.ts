import { connectDB } from "@/lib/mdb-connection";
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

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { savedEvents: new mongoose.Types.ObjectId(eventId) } },
      { new: true }
    );
    if (!updatedUser) {
      return NextResponse.json({ message: "user not found" });
    } else {
      return NextResponse.json({
        message: "event saved succefully",
        savedEvent: updatedUser,
      });
    }
  } catch (err) {
    console.error("Error saving event:", err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
