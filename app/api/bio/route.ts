import { auth } from "@/auth";
import { connectDB } from "@/lib/mdb-connection";
import User from "@/lib/models/user";
import { NextRequest, NextResponse } from "next/server";
//save user bio
export async function GET() {
  await connectDB();

  const session = await auth();

  const userId = session?.user?.id;
  const user = await User.findById(userId);
  if (!user) {
    return NextResponse.json({ message: "login first" });
  }

  if (!user.bio) {
    return NextResponse.json({
      message: "bio dont  exist already",
    });
  }
  return NextResponse.json({
    message: "bio exist already",
    userBio: user.bio,
  });
}
export async function POST(req: NextRequest) {
  await connectDB();
  const body = await req.json();
  const session = await auth();
  const { userBio } = body;

  const userId = session?.user?.id;
  const user = await User.findById(userId);
  if (!user) {
    return NextResponse.json({ message: "login first" });
  }
  if (user.bio) {
    return NextResponse.json({
      message: "bio exist already",
      userBio: user.bio,
    });
  }
  const trimmedBio = userBio?.trim();
  if (!trimmedBio || trimmedBio.lenght === 0) {
    return NextResponse.json({
      message: "Bio must contain at least one non-space character",
    });
  }
  user.bio = trimmedBio;
  await user.save();
  return NextResponse.json({ message: "Bio saved", userBio: user.bio });
}

// delete bio
export async function PATCH() {
  await connectDB();
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    return NextResponse.json({ message: "login first" });
  }
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { $unset: { bio: "" } },
    { new: true }
  );
  return NextResponse.json({ message: "bio delete succefully", updatedUser });
}
