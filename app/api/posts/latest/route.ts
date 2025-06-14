import { db } from "@/lib/db";
import { posts } from "@/lib/schema";
import { desc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";


export async function GET() {
    try {
        const latestPosts = await db
        .select()
        .from(posts)
        .where(eq(posts.status, "published"))
        .orderBy(desc(posts.createdAt))
        .limit(5);
    
        return NextResponse.json(latestPosts);
    } catch (error) {
        console.error("Error fetching latest posts:", error);
        return NextResponse.json({ error: "Failed to fetch latest posts" }, { status: 500 });
    }
}