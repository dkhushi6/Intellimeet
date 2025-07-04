import { connectDB } from "@/lib/mdb-connection";
import User from "@/lib/models/user";
import { NextRequest, NextResponse } from "next/server";

//see all events saved by user
export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  await connectDB();
  const userEventSaved = await User.findById(params.userId).populate(
    "savedEvents"
  );
  if (!userEventSaved) {
    return NextResponse.json({ message: "user saved event  not found" });
  } else {
    return NextResponse.json({
      message: "user saved event are",
      userEventSaved,
    });
  }
}
