import { db } from "@/lib/db";
import { users, posts } from "@/lib/schema";
import { eq, desc, count } from "drizzle-orm";

export async function GET(req: Request) {
  const topAuthors = await db
    .select({
      id: users.id,
      name: users.name,
      avatar: users.profilePicture, // or users.avatar if that's your field
      postCount: count(posts.id).as("postCount"),
    })
    .from(users)
    .leftJoin(posts, eq(posts.author, users.id)) // <-- Use eq() from drizzle-orm
    .groupBy(users.id, users.name, users.profilePicture)
    .orderBy(desc(count(posts.id)))
    .limit(5);

  return Response.json(topAuthors);
}