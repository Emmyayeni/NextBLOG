import { db } from "@/lib/db";
import { bookmarks } from "@/lib/schema";
import { and, eq } from "drizzle-orm";

// GET: Fetch all bookmarks for a user (userId from query string)
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  if (!userId) {
    return new Response("Missing userId", { status: 400 });
  }
  const bookmarksList = await db
    .select()
    .from(bookmarks)
    .where(eq(bookmarks.userId, Number(userId)));
  return new Response(JSON.stringify(bookmarksList), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

// POST: Create a new bookmark  
export async function POST(req: Request) {
    try {
        const { userId, postId } = await req.json();

        if (!userId || !postId) {
            return new Response("Missing required fields", { status: 400 });
        }

        const [newBookmark] = await db
            .insert(bookmarks)
            .values({
                userId: Number(userId),
                postId: Number(postId),
                createdAt: new Date(),
            })
            .returning();

        return new Response(JSON.stringify(newBookmark), {
            status: 201,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error creating bookmark:", error);
        return new Response("Failed to create bookmark", { status: 500 });
    }
}

// DELETE: Remove from bookmark (userId and postId from body)
export async function DELETE(req: Request) {
    try {
        const { userId, postId } = await req.json();
        if (!userId || !postId) {
            return new Response("Missing required fields", { status: 400 });
        }
        const result = await db
            .delete(bookmarks)
            .where(
                and(
                    eq(bookmarks.userId, Number(userId)),
                    eq(bookmarks.postId, Number(postId))
                )
            );

        // Drizzle returns { rowCount } for Postgres, but may differ for other DBs
        if (result.rowCount === 0) {
            return new Response("Bookmark not found", { status: 404 });
        }

        return new Response("Bookmark deleted successfully", { status: 200 });
    } catch (error) {
        console.error("Error deleting bookmark:", error);
        return new Response("Failed to delete bookmark", { status: 500 });
    }
}