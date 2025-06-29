import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mdb-connection";

const Event = require("@/lib/models/event");

export async function Post(req: NextRequest, res: NextResponse) {
  await connectDB();
}
