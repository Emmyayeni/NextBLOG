import { db } from "@/lib/db"
import { tags } from "@/lib/schema"

// GET: Fetch all tags
export default async function GET() {
  try {
    const allTags = await db.select().from(tags)
    return new Response(JSON.stringify(allTags), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error("Error fetching tags:", error)
    return new Response("Failed to fetch tags", { status: 500 })
  }
}

// creat tag 
export async function POST(req: Request) {
  try {
    const { name, description } = await req.json()

    if (!name || !description) {
      return new Response("Missing required fields", { status: 400 })
    }

    // Insert the tag
    const [newTag] = await db
      .insert(tags)
      .values({
        name,
      })
      .returning()

    return new Response(JSON.stringify(newTag), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error("Error creating tag:", error)
    return new Response("Failed to create tag", { status: 500 })
  }
}