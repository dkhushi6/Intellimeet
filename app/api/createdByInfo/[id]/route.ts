import { connectDB } from "@/lib/mdb-connection";
import User from "@/lib/models/user";
import { NextResponse } from "next/server";

export async function GET({ params }: { params: { id: string } }) {
  await connectDB();
  const user = await User.findById(params.id);
  if (!user) {
    return NextResponse.json({ message: "user not found from params id" });
  }
  return NextResponse.json({ message: "user is", user });
}
