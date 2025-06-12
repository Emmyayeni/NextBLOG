import { db } from "@/lib/db"
import { follows } from "@/lib/schema"

// POST /api/follow
export async function POST(req: Request) {
  try {
    const { followerId, followingId } = await req.json()

    if (!followerId || !followingId) {
      return new Response("Missing followerId or followingId", { status: 400 })
    }

    // Prevent self-follow
    if (followerId === followingId) {
      return new Response("Cannot follow yourself", { status: 400 })
    }

    // Insert follow relationship
    await db.insert(follows).values({
      followerId,
      followingId,
    })

    return new Response(JSON.stringify({ message: "Followed successfully" }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    return new Response("Failed to follow user", { status: 500 })
  }
}