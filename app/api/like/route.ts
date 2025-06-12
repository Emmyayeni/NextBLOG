import { db } from "@/lib/db"
import { likes } from "@/lib/schema"
import { and, eq, } from "drizzle-orm"

// POST /api/like
export async function POST(req: Request) {
  try {
    const { userId, postId } = await req.json()

    if (!userId || !postId) {
      return new Response("Missing userId or postId", { status: 400 })
    }
    // Prevent duplicate likes
    const existing = await db
      .select()
      .from(likes)
      .where(
        and(
          eq(likes.userId, userId),
          eq(likes.postId, postId)
        )
      )
      .limit(1)

    if (existing.length > 0) {
      return new Response("Already liked", { status: 409 })
    }

    await db.insert(likes).values({ userId, postId })

    return new Response(JSON.stringify({ message: "Post liked" }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    return new Response("Failed to like post", { status: 500 })
  }
}