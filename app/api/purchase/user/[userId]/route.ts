import { connectDB } from "@/lib/mdb-connection";
import Purchase from "@/lib/models/purchase";
import { connect } from "http2";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: String } }
) {
  await connectDB();
  const userPur = await Purchase.find({ userId: params.id }).populate(
    "eventId"
  );
  if (!userPur) {
    return NextResponse.json({ message: "user purchases not found" });
  } else {
    return NextResponse.json({ message: "user purchases are", userPur });
  }
}
