import { db } from "@/lib/db"
import { posts, postCategories, tags as tagsTable, postTags } from "@/lib/schema"
import { eq } from "drizzle-orm"

// GET: Fetch all posts
export async function GET() {
  try {
    const allPosts = await db.select().from(posts)
    return new Response(JSON.stringify(allPosts), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error("Error fetching posts:", error)
    return new Response("Failed to fetch posts", { status: 500 })
  }
}

// POST: Create a new post with tags and categories
export async function POST(req: Request) {
  try {
    const {
      title,
      excerpt,
      content,
      author,
      featuredImage,
      featured,
      published,
      tags,
      categories, // array of category IDs
    } = await req.json()

    if (
      !title ||
      !content ||
      !author ||
      !excerpt ||
      !featuredImage ||
      !Array.isArray(categories) ||
      categories.length === 0
    ) {
      return new Response("Missing required fields", { status: 400 })
    }

    // Insert the post
    const [newPost] = await db
      .insert(posts)
      .values({
        title,
        slug: title.toLowerCase().replace(/\s+/g, "-").slice(0, 50),
        excerpt: content.slice(0, 150),
        content,
        author,
        featuredImage,
        featured: featured || false,
        status: published ? "published" : "draft",
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning()

    // Link categories
    for (const categoryId of categories) {
      await db.insert(postCategories).values({
        postId: newPost.id,
        categoryId,
      })
    }

    // --- Tag logic: create if not exist, then link ---
    if (tags) {
      const tagNames = (Array.isArray(tags) ? tags : tags.split(","))
        .map((t: string) => t.trim())
        .filter(Boolean)

      for (const tagName of [...new Set(tagNames)]) {
        // Check if tag exists
        let [tag] = await db.select().from(tagsTable).where(eq(tagsTable.name, tagName as string))
        if (!tag) {
          // Create tag if not exists
          [tag] = await db.insert(tagsTable).values({ name: tagName as string }).returning()
        }
        // Link tag to post
        await db.insert(postTags).values({
          postId: newPost.id,
          tagId: tag.id,
        })
      }
    }

    return new Response(JSON.stringify(newPost), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error("Error creating post:", error)
    return new Response("Failed to create post", { status: 500 })
  }
}
