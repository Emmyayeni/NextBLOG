import { db } from "@/lib/db";
import { follows } from "@/lib/schema";
import { eq } from "drizzle-orm";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  if (!userId) return new Response("Missing userId", { status:400 });

  const following = await db
    .select({ followingId: follows.followingId })
    .from(follows)
    .where(eq(follows.followerId, userId));

  return Response.json(following);
}