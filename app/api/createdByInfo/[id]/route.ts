import { connectDB } from "@/lib/mdb-connection";
import User from "@/lib/models/user";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const userId = params.id;

    if (!userId) {
      return NextResponse.json(
        { error: "No user id provided" },
        { status: 400 }
      );
    }

    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json(
        { error: "User not found from params id" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "user is", user }, { status: 200 });
  } catch (err) {
    console.error("error fetching user info", err);
  }
}
