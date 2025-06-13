"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Bell, Clock, Heart, LogOut, MessageCircle, Moon, PenSquare, Search, Settings, Share2, Sun } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { useTheme } from "next-themes"
import { useState, useEffect } from 'react'
import { getUserByAuthorId } from "@/lib/post"
import { useParams } from "next/navigation"; // ✅ add this

const comments = [
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
  const id = params?.id as string; // ✅ cast for safety
  const { data: session } = useSession()
  const { theme, setTheme } = useTheme();
  const [blogPost, setBlogPost] = useState()
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        const res = await fetch(`/api/posts/${id}`);
        if (!res.ok) throw new Error("Failed to fetch post");
        const data = await res.json();
        console.log(data)
        setBlogPost(data);
      } catch (error) {
        console.error(error);
  }
};
fetchBlogPost()}, [id]);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        {/* Header */}
        {session ?
          <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
            <div className="container mx-auto px-4 py-4">
              <div className="flex items-center justify-between">
                <Link
                  href="/"
                  className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                >
                  Ayblog
                </Link>
                {/* Search Bar */}
                <div className="hidden md:flex flex-1 max-w-md mx-8">
                  <div className="relative w-full">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input placeholder="Search articles, authors, topics..." className="pl-10 bg-muted/50" />
                  </div>
                </div>
                <nav className="hidden md:flex items-center space-x-6">
                  <Link href="/" className="text-foreground hover:text-primary transition-colors">
                    Home
                  </Link>
                  <Link href="/following" className="text-muted-foreground hover:text-foreground transition-colors">
                    Following
                  </Link>
                  <Link href="/bookmarks" className="text-muted-foreground hover:text-foreground transition-colors">
                    Bookmarks
                  </Link>
                </nav>
                <div className="flex items-center space-x-4">
                  {/* Theme Toggle */}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      if (theme) setTheme(theme === "dark" ? "light" : "dark")
                    }}
                    disabled={!theme}
                  >
                    <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                  </Button>
                  {/* Notifications */}
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-1 right-1 flex h-2 w-2 rounded-full bg-red-600"></span>
                    <span className="sr-only">Notifications</span>
                  </Button>
                  {/* Write Button */}
                  <Link href="/dashboard/create">
                    <Button size="sm" className="hidden md:flex">
                      <PenSquare className="h-4 w-4 mr-2" />
                      Write
                    </Button>
                  </Link>
                  {/* User Menu */}
                </div>
              </div>
            </div>
          </header>
          :
          <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
            <div className="container mx-auto px-4 py-4">
              <div className="flex items-center justify-between">
                <Link
                  href="/"
                  className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                >
                  Ayblog
                </Link>
                <nav className="hidden md:flex items-center space-x-8">
                  <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors">
                    Home
                  </Link>
                  <Link href="/categories" className="text-gray-600 hover:text-gray-900 transition-colors">
                    Categories
                  </Link>
                  <Link href="/about" className="text-gray-600 hover:text-gray-900 transition-colors">
                    About
                  </Link>
                  <Link href="/contact" className="text-gray-600 hover:text-gray-900 transition-colors">
                    Contact
                  </Link>
                </nav>
                <div className="flex items-center space-x-4">
                  <Link href="/login">
                    <Button variant="ghost">Login</Button>
                  </Link>
                  <Link href="/signup">
                    <Button>Sign Up</Button>
                  </Link>
                </div>
              </div>
            </div>
          </header>
        }
        {blogPost ?
        <article className="py-12 px-4">
          <div className="container mx-auto max-w-4xl">
            {/* Article Header */}
            <div className="mb-8">
              <Badge className="mb-4 bg-gradient-to-r from-blue-600 to-purple-600">cat</Badge>
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

            {/* Featured Image */}
            <div className="mb-8 rounded-xl overflow-hidden shadow-2xl">
              <Image
                src={blogPost.post.featuredImage || "/placeholder.svg"}
                alt={blogPost.post.title || "Blog post image"}
                width={800}
                height={400}
                className="w-full h-64 md:h-96 object-cover"
              />
            </div>

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
          </div>
        </article>
        : <div className=" text-center"> loading</div>
        }
        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12 px-4 mt-16">
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
                <h4 className="font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <Link href="/" className="hover:text-white transition-colors">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link href="/categories" className="hover:text-white transition-colors">
                      Categories
                    </Link>
                  </li>
                  <li>
                    <Link href="/about" className="hover:text-white transition-colors">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="hover:text-white transition-colors">
                      Contact
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
              <p>&copy; {new Date().getFullYear()} BlogSpace. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}

function setPost(data: any) {
  throw new Error("Function not implemented.")
}
