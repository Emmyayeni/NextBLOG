import { NextResponse } from "next/server";
import { getLatestFeaturedPost } from "@/lib/post";

export async function GET() {
  const post = await getLatestFeaturedPost();
  return NextResponse.json(post);
}