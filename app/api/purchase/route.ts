import { connectDB } from "@/lib/mdb-connection";
import { NextRequest, NextResponse } from "next/server";
import Event from "@/lib/models/event";
import User from "@/lib/models/user";
import Purchase from "@/lib/models/purchase";

export async function POST(req: NextRequest) {
  await connectDB();

  const body = await req.json();
  const { userId, eventId, quantity } = body;
  if (!userId || !eventId || !quantity) {
    return NextResponse.json({ message: "enter all the details" });
  }
  const purUser = await User.findById(userId);
  const purEvent = await Event.findById(eventId);
  if (!purUser) {
    return NextResponse.json({ message: "user id not found in database" });
  }
  if (!purEvent) {
    return NextResponse.json({ message: "event id not found in database" });
  }
  const existingPurchase = await Purchase.findOne({
    userId,
    eventId,
  });
  if (existingPurchase) {
    return NextResponse.json({
      message: "event already purchased",
      oldTicket: existingPurchase,
    });
  } else {
    const newPur = await Purchase.create({
      userId,
      eventId,
      quantity,
    });

    return NextResponse.json({
      message: "ticket bought successfully",
      Ticket: newPur,
    });
  }
}
