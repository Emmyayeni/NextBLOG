// Example: in your /api/categories/route.ts
import { db } from "@/lib/db"
import { categories } from "@/lib/schema"

const defaultCategories = [
  { name: "Development", description: "Posts about software development." },
  { name: "Design", description: "Posts about design and UI/UX." },
  { name: "Technology", description: "Posts about technology trends." },
  { name: "Business", description: "Posts about business and startups." },
  { name: "Lifestyle", description: "Posts about lifestyle and productivity." },
]

export async function GET() {
  const allCategories = await db.select().from(categories)
  if (allCategories.length === 0) {
    // Seed default categories if table is empty
    for (const cat of defaultCategories) {
      await db.insert(categories).values(cat).onConflictDoNothing()
    }
    // Fetch again after seeding
    return Response.json(await db.select().from(categories))
  }
  return Response.json(allCategories)
}