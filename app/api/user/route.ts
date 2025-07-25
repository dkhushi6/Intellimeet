import { auth } from "@/auth";
import { connectDB } from "@/lib/mdb-connection";
import User from "@/lib/models/user";
import { NextResponse } from "next/server";

//see all events saved by user
export async function GET() {
  await connectDB();
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({
      message: "login first",
    });
  }
  //d
  const userId = session?.user?.id;
  const userEventSaved = await User.findById(userId).populate("savedEvents");
  if (!userEventSaved) {
    return NextResponse.json({ message: "user saved event  not found" });
  } else {
    return NextResponse.json({
      message: "user saved event are",
      userEventSaved,
    });
  }
}
