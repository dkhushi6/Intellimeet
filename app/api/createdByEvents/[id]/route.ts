import { connectDB } from "@/lib/mdb-connection";
import { NextRequest, NextResponse } from "next/server";
import Event from "@/lib/models/event";

//see events from specific admins

//see events from specific admins

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDB();
  const createdById = params.id;

  if (!createdById) {
    return NextResponse.json({
      message: "can not find created by id from params",
    });
  }
  const adminEvents = await Event.find({ createdById });
  if (!adminEvents.length) {
    return NextResponse.json({
      message: "admin events not found error",
    });
  } else {
    return NextResponse.json({ message: "events by admin are", adminEvents });
  }
}
