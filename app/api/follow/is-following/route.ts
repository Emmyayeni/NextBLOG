import { db } from "@/lib/db";
import { follows } from "@/lib/schema";
import { eq, and } from "drizzle-orm";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const followerId = searchParams.get("followerId");
  const followingId = searchParams.get("followingId");
  if (!followerId || !followingId) {
    return new Response("Missing parameters", { status: 400 });
  }

  const result = await db
    .select()
    .from(follows)
    .where(
      and(
        eq(follows.followerId, followerId),
        eq(follows.followingId, followingId)
      )
    );

  return Response.json({ isFollowing: result.length > 0 });
}