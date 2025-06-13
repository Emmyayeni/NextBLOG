import { db } from "@/lib/db";
import { posts, users } from "@/lib/schema";
import { eq } from "drizzle-orm";

export async function getUserByAuthorId(authorId: string) {
  try {
    const numericId = Number(authorId);
    if (isNaN(numericId)) {
      throw new Error("Invalid author ID");
    }

    const result = await db
      .select({
        name: users.name,
        email: users.email,
        image: users.profilePicture,
      })
      .from(users)
      .where(eq(users.id, numericId));

    return result[0] ?? null;
  } catch (error) {
    console.error("Error fetching user by author ID:", error);
    return null;
  }
}


// Get post by id (returns post object or null)
export async function getPostById(id: string) {
  const postsResult = await db
    .select()
    .from(posts)
    .where(eq(posts.id, Number(id)));
  return postsResult[0] ?? null;
}

// Get all posts (returns array)
export async function getAllPosts() {
  return await db.select().from(posts);
}

// Edit post by id (returns updated post or null)
export async function editPostById(
  id: string,
  data: {
    title: string;
    content: string;
    author: number;
    featuredImage: string;
    featured?: boolean;
    published?: boolean;
  }
) {
  const { title, content, author, featuredImage, featured, published } = data;

  if (!title || !content || !author || !featuredImage) {
    throw new Error("Missing required fields");
  }

  const [updatedPost] = await db
    .update(posts)
    .set({
      title,
      slug: title.toLowerCase().replace(/\s+/g, "-").slice(0, 50),
      content,
      author: author, // ✅ Fix: correct column name per schema
      featuredImage,
      featured: featured ?? false,
      status: published ? "published" : "draft",
      updatedAt: new Date(),
    })
    .where(eq(posts.id, Number(id)))
    .returning();

  return updatedPost ?? null;
}

// Delete post by id (returns true if deleted)
export async function deletePostById(id: string) {
  await db.delete(posts).where(eq(posts.id, Number(id)));
  return true;
}
