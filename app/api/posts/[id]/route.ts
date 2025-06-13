import { db } from "@/lib/db";
import { posts, users } from "@/lib/schema";
import { eq } from "drizzle-orm";

// GET /api/posts/[id]
export async function GET(req: Request, context: { params: { id: string } }) {
  const id = parseInt(context.params.id);
  console.log("Fetching post with ID:", id);

  if (isNaN(id)) {
    return new Response("Invalid ID", { status: 400 });
  }

  try {
    const result = await db
      .select({
        post: posts,
        author: {
          id: users.id,
          name: users.name,
          email: users.email,
          profilePicture: users.profilePicture,
          bio: users.bio,
          github: users.github,
          twitter: users.twitter,
          linkedin: users.linkedin,
          website: users.website,
          createdAt: users.createdAt,
        },
      })
      .from(posts)
      .leftJoin(users, eq(posts.author, users.id))
      .where(eq(posts.id, id));

    console.log("Query result:", result);

    const postWithAuthor = result[0];

    if (!postWithAuthor) {
      return new Response("Post not found", { status: 404 });
    }

    return new Response(JSON.stringify(postWithAuthor), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching post:", error);
    return new Response("Failed to fetch post", { status: 500 });
  }
}



// PUT /api/posts/[id]
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const { title, content, author, featuredImage, featured, published } = await req.json();

    if (!title || !content || !author || !featuredImage) {
      return new Response("Missing required fields", { status: 400 });
    }

    const slug = title.toLowerCase().replace(/\s+/g, "-").slice(0, 50);

    const [updatedPost] = await db
      .update(posts)
      .set({
        title,
        slug,
        content,
        author,
        featuredImage,
        featured: !!featured,
        status: published ? "published" : "draft",
        updatedAt: new Date(),
      })
      .where(eq(posts.id, id))
      .returning();

    if (!updatedPost) {
      return new Response("Post not found", { status: 404 });
    }

    return new Response(JSON.stringify(updatedPost), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error updating post:", error);
    return new Response("Failed to update post", { status: 500 });
  }
}

// DELETE /api/posts/[id]
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const deletedPost = await db
      .delete(posts)
      .where(eq(posts.id, id))
      .returning();

    if (deletedPost.length === 0) {
      return new Response("Post not found", { status: 404 });
    }

    return new Response("Post deleted successfully", { status: 200 });
  } catch (error) {
    console.error("Error deleting post:", error);
    return new Response("Failed to delete post", { status: 500 });
  }
}
