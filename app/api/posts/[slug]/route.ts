import { db } from "@/lib/db";
import { posts, users } from "@/lib/schema";
import { eq } from "drizzle-orm";

// GET /api/posts/[slug] or /api/posts/[id]
export async function GET(req: Request, context: { params: { slug: string } }) {
  const { slug } = context.params;
  console.log("Fetching post with slug or id:", slug);

  let result;
  // Try to fetch by numeric ID if slug is a number, otherwise by slug
  if (!isNaN(Number(slug))) {
    result = await db
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
      .where(eq(posts.id, Number(slug)));
  } else {
    result = await db
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
      .where(eq(posts.slug, slug));
  }

  console.log("Query result:", result);

  const postWithAuthor = result[0];

  if (!postWithAuthor) {
    return new Response("Post not found", { status: 404 });
  }

  return new Response(JSON.stringify(postWithAuthor), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

// PUT /api/posts/[slug]
export async function PUT(req: Request, { params }: { params: { slug: string } }) {
  const { slug } = params;

  try {
    const { title, content, author, featuredImage, featured, published } = await req.json();

    if (!title || !content || !author) {
      return new Response("Missing required fields", { status: 400 });
    }

    const newSlug = title.toLowerCase().replace(/\s+/g, "-").slice(0, 50);

    // Update by id if slug is a number, otherwise by slug
    let updatedPost;
    if (!isNaN(Number(slug))) {
      [updatedPost] = await db
        .update(posts)
        .set({
          title,
          slug: newSlug,
          content,
          author,
          featuredImage,
          featured: !!featured,
          status: published ? "published" : "draft",
          updatedAt: new Date(),
        })
        .where(eq(posts.id, Number(slug)))
        .returning();
    } else {
      [updatedPost] = await db
        .update(posts)
        .set({
          title,
          slug: newSlug,
          content,
          author,
          featuredImage,
          featured: !!featured,
          status: published ? "published" : "draft",
          updatedAt: new Date(),
        })
        .where(eq(posts.slug, slug))
        .returning();
    }

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

// DELETE /api/posts/[slug]
export async function DELETE(req: Request, { params }: { params: { slug: string } }) {
  const { slug } = params;

  try {
    let deletedPost;
    if (!isNaN(Number(slug))) {
      deletedPost = await db
        .delete(posts)
        .where(eq(posts.id, Number(slug)))
        .returning();
    } else {
      deletedPost = await db
        .delete(posts)
        .where(eq(posts.slug, slug))
        .returning();
    }

    if (!deletedPost || deletedPost.length === 0) {
      return new Response("Post not found", { status: 404 });
    }

    return new Response("Post deleted successfully", { status: 200 });
  } catch (error) {
    console.error("Error deleting post:", error);
    return new Response("Failed to delete post", { status: 500 });
  }
}