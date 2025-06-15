import { db } from "@/lib/db";
import { follows } from "@/lib/schema";
import { eq, and } from "drizzle-orm";

export async function POST(req: Request) {
  const { followerId, followingId } = await req.json();

  // Use and() to combine conditions
  const existing = await db
    .select()
    .from(follows)
    .where(
      and(
        eq(follows.followerId, followerId),
        eq(follows.followingId, followingId)
      )
    );

  if (existing.length > 0) {
    // Unfollow
    await db
      .delete(follows)
      .where(
        and(
          eq(follows.followerId, followerId),
          eq(follows.followingId, followingId)
        )
      );
    return Response.json({ followed: false });
  } else {
    // Follow
    await db.insert(follows).values({ followerId, followingId });
    return Response.json({ followed: true });
  }
}