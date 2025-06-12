import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Clock, Heart, MessageCircle, Share2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const blogPost = {
  id: 1,
  title: "Getting Started with Next.js 15",
  content: `
    <p>Next.js 15 brings exciting new features and improvements that make building modern web applications even more enjoyable. In this comprehensive guide, we'll explore the key features and show you how to get started.</p>
    
    <h2>What's New in Next.js 15</h2>
    <p>The latest version of Next.js introduces several groundbreaking features:</p>
    <ul>
      <li>Improved performance with better caching strategies</li>
      <li>Enhanced developer experience with better error messages</li>
      <li>New experimental features for advanced use cases</li>
      <li>Better TypeScript support and type safety</li>
    </ul>
    
    <h2>Getting Started</h2>
    <p>To create a new Next.js 15 project, you can use the following command:</p>
    <pre><code>npx create-next-app@latest my-app</code></pre>
    
    <p>This will set up a new project with all the latest features and best practices configured out of the box.</p>
    
    <h2>Key Features to Explore</h2>
    <p>Once you have your project set up, here are some key features you should explore:</p>
    
    <h3>App Router</h3>
    <p>The App Router provides a more intuitive way to structure your application with file-based routing and improved performance.</p>
    
    <h3>Server Components</h3>
    <p>Server Components allow you to render components on the server, reducing the JavaScript bundle size and improving performance.</p>
    
    <h3>Streaming</h3>
    <p>Streaming enables you to progressively render your UI, providing a better user experience with faster perceived loading times.</p>
    
    <h2>Conclusion</h2>
    <p>Next.js 15 represents a significant step forward in web development. With its improved performance, better developer experience, and powerful new features, it's an excellent choice for building modern web applications.</p>
  `,
  author: "Sarah Johnson",
  date: "2024-01-15",
  readTime: "5 min read",
  category: "Development",
  image: "/placeholder.svg?height=400&width=800",
  likes: 42,
  comments: 8,
}

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

export default function BlogPost({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
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

      <article className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Article Header */}
          <div className="mb-8">
            <Badge className="mb-4 bg-gradient-to-r from-blue-600 to-purple-600">{blogPost.category}</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              {blogPost.title}
            </h1>
            <div className="flex items-center space-x-6 text-gray-600 mb-8">
              <div className="flex items-center space-x-2">
                <Avatar className="w-10 h-10">
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback>
                    {blogPost.author
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-gray-900">{blogPost.author}</p>
                  <p className="text-sm">{new Date(blogPost.date).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{blogPost.readTime}</span>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="mb-8 rounded-xl overflow-hidden shadow-2xl">
            <Image
              src={blogPost.image || "/placeholder.svg"}
              alt={blogPost.title}
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
                dangerouslySetInnerHTML={{ __html: blogPost.content }}
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
  )
}
