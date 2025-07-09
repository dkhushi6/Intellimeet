import { auth } from "@/auth";
import { connectDB } from "@/lib/mdb-connection";
import Purchase from "@/lib/models/purchase";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  await connectDB();
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ message: "login first" });
  }
  const userId = session.user.id;
  const userPur = await Purchase.find({ userId: userId }).populate("eventId");
  if (!userPur) {
    return NextResponse.json({ message: "user purchases not found" });
  } else {
    return NextResponse.json({ message: "user purchases are", userPur });
  }
}
