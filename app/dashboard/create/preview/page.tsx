"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Edit, Eye, Heart, MessageCircle, Share2, Clock } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function PreviewPage() {
  // This would typically come from the form data or URL params
  const previewData = {
    title: "Getting Started with Next.js 15",
    excerpt:
      "Learn how to build modern web applications with the latest features in Next.js 15, including improved performance and developer experience.",
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
    `,
    category: "Development",
    tags: ["Next.js", "React", "Web Development", "JavaScript"],
    author: "John Doe",
    date: new Date().toISOString(),
    readTime: "5 min read",
    image: "/placeholder.svg?height=400&width=800",
    featured: true,
    published: false,
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Preview Header */}
      <div className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/dashboard/create">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Editor
                </Button>
              </Link>
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium">Preview Mode</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-yellow-50">
                Draft
              </Badge>
              <Link href="/dashboard/create">
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              </Link>
              <Button size="sm">Publish</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Preview Content */}
      <article className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Article Header */}
          <div className="mb-8">
            <Badge className="mb-4 bg-gradient-to-r from-blue-600 to-purple-600">{previewData.category}</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              {previewData.title}
            </h1>
            <p className="text-xl text-gray-600 mb-8">{previewData.excerpt}</p>
            <div className="flex items-center space-x-6 text-gray-600 mb-8">
              <div className="flex items-center space-x-2">
                <Avatar className="w-10 h-10">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>
                    {previewData.author
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-gray-900">{previewData.author}</p>
                  <p className="text-sm">{new Date(previewData.date).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{previewData.readTime}</span>
              </div>
            </div>
            {previewData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {previewData.tags.map((tag, index) => (
                  <Badge key={index} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Featured Image */}
          {previewData.image && (
            <div className="mb-8 rounded-xl overflow-hidden shadow-2xl">
              <Image
                src={previewData.image || "/placeholder.svg"}
                alt={previewData.title}
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
                dangerouslySetInnerHTML={{ __html: previewData.content }}
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
                    <span>0</span>
                  </Button>
                  <Button variant="outline" className="flex items-center space-x-2">
                    <MessageCircle className="w-4 h-4" />
                    <span>0</span>
                  </Button>
                  <Button variant="outline" className="flex items-center space-x-2">
                    <Share2 className="w-4 h-4" />
                    <span>Share</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Preview Notice */}
          <Card className="border-2 border-dashed border-yellow-300 bg-yellow-50">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Eye className="h-5 w-5 text-yellow-600" />
                <h3 className="text-lg font-semibold text-yellow-800">Preview Mode</h3>
              </div>
              <p className="text-yellow-700 mb-4">
                This is how your post will appear to readers. You can make changes by going back to the editor.
              </p>
              <div className="flex items-center justify-center gap-4">
                <Link href="/dashboard/create">
                  <Button variant="outline">
                    <Edit className="h-4 w-4 mr-2" />
                    Continue Editing
                  </Button>
                </Link>
                <Button>Publish Post</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </article>
    </div>
  )
}
