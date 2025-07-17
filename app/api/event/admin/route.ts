import { connectDB } from "@/lib/mdb-connection";
import { NextResponse } from "next/server";
import Event from "@/lib/models/event";
import { auth } from "@/auth";

//see events from specific admins
export async function GET() {
  await connectDB();
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ message: "login first" });
  }
  const adminId = session.user.id;
  const adminEvents = await Event.find({ createdById: adminId });
  if (!adminEvents.length) {
    return NextResponse.json({
      message: "admin events not found error",
    });
  } else {
    return NextResponse.json({ message: "events by admin are", adminEvents });
  }
}
