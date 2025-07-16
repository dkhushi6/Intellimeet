import { auth } from "@/auth";
import { connectDB } from "@/lib/mdb-connection";
import { NextRequest, NextResponse } from "next/server";
import User from "@/lib/models/user";
//unsave an item
export async function PATCH(req: NextRequest) {
  await connectDB();
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json(
      { message: "User not authenticated" },
      { status: 401 }
    );
  }

  const userId = session.user.id;
  const body = await req.json();
  const { eventId } = body;

  if (!eventId) {
    return NextResponse.json({ message: "Missing eventId" }, { status: 400 });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $pull: { savedEvents: eventId } },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Event unsaved successfully",
      savedEvents: updatedUser.savedEvents,
    });
  } catch (error) {
    console.error("Unsave error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
