import { connectDB } from "@/lib/mdb-connection";
import { NextRequest, NextResponse } from "next/server";
import Event from "@/lib/models/event";

// view that specific event
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDB();
  const currentEvent = await Event.findOne({ _id: params.id });
  if (!currentEvent) {
    return NextResponse.json({ message: "event not found error" });
  }
  currentEvent.visitCount++;
  await currentEvent.save();
  await currentEvent.populate("createdById");
  const createdByInfo = currentEvent.createdById;
  if (!createdByInfo) {
    return NextResponse.json({ message: "createdByInfo not found" });
  }
  return NextResponse.json({
    message: "the current event details are",
    currentEvent,
    createdByInfo,
  });
}
