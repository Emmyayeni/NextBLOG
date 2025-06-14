"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Clock, Heart, MessageCircle, Share2, ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from 'react'
import { useParams } from "next/navigation"

const comments = [
  // ...existing comments...
  {
    id: 1,
    author: "Mike Chen",
    avatar: "/placeholder-user.jpg",
    date: "2024-01-16",
    content: "Great article! I've been waiting for Next.js 15 and this guide is exactly what I needed to get started.",
  },
  {
    id: 2,
    author: "Emily Davis",
    avatar: "/placeholder-user.jpg",
    date: "2024-01-16",
    content: "The App Router changes are game-changing. Thanks for the detailed explanation of the new features.",
  },
  {
    id: 3,
    author: "Alex Rodriguez",
    avatar: "/placeholder-user.jpg",
    date: "2024-01-17",
    content: "I love how Next.js keeps evolving. The performance improvements in version 15 are impressive.",
  },
]

export default function BlogPost() {
  const params = useParams();
  const slug = params?.slug as string;
  type BlogPostType = {
    post: {
      title?: string;
      content?: string;
      createdAt?: string;
      featuredImage?: string;
    };
    author: {
      name?: string;
      profilePicture?: string;
    };
    likes?: number;
    comments?: number;
  };

  const [blogPost, setBlogPost] = useState<BlogPostType | null>(null)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/posts/${slug}`);
        if (!res.ok) throw new Error("Failed to fetch post");
        const data = await res.json();
        setBlogPost(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogPost();
  }, [slug]);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 bg-background">
        <article className="py-12 px-4 bg-background">
          <div className="container mx-auto max-w-4xl">
            <Link href="/" className="inline-flex items-center gap-2 text-blue-600 hover:underline mb-6">
              <ArrowLeft className="w-5 h-5" />
              Back Home
            </Link>
            {loading ? (
              <div className="flex flex-col items-center justify-center py-24">
                <svg className="animate-spin h-10 w-10 text-blue-600 mb-4" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
                <span className="text-lg font-medium text-blue-600">Loading post...</span>
              </div>
            ) : blogPost ? (
              <>
                {/* Article Header */}
                <div className="mb-8">
                  <Badge className="mb-4 bg-gradient-to-r from-blue-600 to-purple-600">tech</Badge>
                  <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                    {blogPost.post?.title}
                  </h1>
                  <div className="flex items-center space-x-6 text-gray-600 mb-8">
                    <div className="flex items-center space-x-2">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={blogPost.author.profilePicture || "/placeholder-user.jpg"} />
                        <AvatarFallback>
                          {blogPost.author?.name
                            ? blogPost.author.name.split(" ").map((n: string) => n[0]).join("")
                            : "?"}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-gray-900">{blogPost.author.name || "Unknown Author"}</p>
                        <p className="text-sm">{blogPost.post.createdAt ? new Date(blogPost.post.createdAt).toLocaleDateString() : ""}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>5</span>
                    </div>
                  </div>
                </div>

                {/* Featured Image (only if exists) */}
                {blogPost.post?.featuredImage && (
                  <div className="mb-8 rounded-xl overflow-hidden shadow-2xl">
                    <Image
                      src={blogPost.post.featuredImage}
                      alt={blogPost.post.title || "Blog post image"}
                      width={800}
                      height={400}
                      className="w-full h-64 md:h-96 object-cover"
                    />
                  </div>
                )}

                {/* Article Content */}
                <Card className="mb-8 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-8">
                    <div
                      className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-strong:text-gray-900 prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-pre:bg-gray-900 prose-pre:text-gray-100"
                      dangerouslySetInnerHTML={{ __html: blogPost.post.content || "" }}
                    />
                  </CardContent>
                </Card>

                {/* Article Actions */}
                <Card className="mb-8 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Button variant="outline" className="flex items-center space-x-2">
                          <Heart className="w-4 h-4" />
                          <span>{blogPost.likes}</span>
                        </Button>
                        <Button variant="outline" className="flex items-center space-x-2">
                          <MessageCircle className="w-4 h-4" />
                          <span>{blogPost.comments}</span>
                        </Button>
                        <Button variant="outline" className="flex items-center space-x-2">
                          <Share2 className="w-4 h-4" />
                          <span>Share</span>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Comments Section */}
                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <h2 className="text-2xl font-bold">Comments ({comments.length})</h2>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Add Comment Form */}
                    <div className="border-b pb-6">
                      <h3 className="text-lg font-semibold mb-4">Leave a Comment</h3>
                      <div className="space-y-4">
                        <Textarea placeholder="Share your thoughts..." className="min-h-[100px]" />
                        <div className="flex justify-end">
                          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                            Post Comment
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Comments List */}
                    <div className="space-y-6">
                      {comments.map((comment) => (
                        <div key={comment.id} className="flex space-x-4">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={comment.avatar || "/placeholder.svg"} />
                            <AvatarFallback>
                              {comment.author
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h4 className="font-semibold">{comment.author}</h4>
                              <span className="text-sm text-gray-500">{new Date(comment.date).toLocaleDateString()}</span>
                            </div>
                            <p className="text-gray-700">{comment.content}</p>
                            <div className="flex items-center space-x-4 mt-2">
                              <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
                                <Heart className="w-3 h-3 mr-1" />
                                Like
                              </Button>
                              <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
                                Reply
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <div className="text-center text-gray-500 py-24">Post not found.</div>
            )}
          </div>
        </article>
        {/* ...footer remains unchanged... */}
      <footer className="bg-gray-900 dark:bg-slate-950 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Ayblog
              </h3>
              <p className="text-gray-400">
                A modern platform for sharing knowledge, stories, and insights with the world.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/home" className="hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/categories" className="hover:text-white transition-colors">
                    Categories
                  </Link>
                </li>
                <li>
                  <Link href="/authors" className="hover:text-white transition-colors">
                    Authors
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-white transition-colors">
                    About
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Categories</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/category/development" className="hover:text-white transition-colors">
                    Development
                  </Link>
                </li>
                <li>
                  <Link href="/category/design" className="hover:text-white transition-colors">
                    Design
                  </Link>
                </li>
                <li>
                  <Link href="/category/technology" className="hover:text-white transition-colors">
                    Technology
                  </Link>
                </li>
                <li>
                  <Link href="/category/business" className="hover:text-white transition-colors">
                    Business
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Twitter
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    LinkedIn
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    GitHub
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    RSS Feed
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Ayblog. All rights reserved.</p>
          </div>
        </div>
      </footer>
      </div>
    </>
    );
  }