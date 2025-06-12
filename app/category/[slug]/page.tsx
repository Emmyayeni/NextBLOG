"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarDays, Clock, User, Search, BookmarkPlus, ArrowLeft, TrendingUp } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"

// Sample data - in a real app, this would come from an API
const categoryData = {
  development: {
    name: "Development",
    description: "Web development, programming languages, frameworks, and coding best practices",
    postCount: 234,
    followerCount: "12.5K",
    posts: [
      {
        id: 1,
        title: "Getting Started with Next.js 15",
        excerpt: "Learn how to build modern web applications with the latest features in Next.js 15.",
        author: "Sarah Johnson",
        date: "2024-01-15",
        readTime: "5 min read",
        image: "/placeholder.svg?height=200&width=400",
        likes: 234,
        comments: 45,
        featured: true,
      },
      {
        id: 4,
        title: "JavaScript Performance Tips",
        excerpt: "Optimize your JavaScript code for better performance with these proven techniques.",
        author: "Alex Rodriguez",
        date: "2024-01-08",
        readTime: "7 min read",
        image: "/placeholder.svg?height=200&width=400",
        likes: 143,
        comments: 21,
        featured: false,
      },
    ],
  },
  design: {
    name: "Design",
    description: "UI/UX design, visual design, design systems, and creative processes",
    postCount: 156,
    followerCount: "8.9K",
    posts: [
      {
        id: 3,
        title: "Building Responsive Designs",
        excerpt: "Master the art of creating beautiful, responsive designs that work seamlessly across all devices.",
        author: "Emily Davis",
        date: "2024-01-10",
        readTime: "6 min read",
        image: "/placeholder.svg?height=200&width=400",
        likes: 156,
        comments: 28,
        featured: true,
      },
      {
        id: 5,
        title: "UI/UX Design Principles",
        excerpt: "Essential design principles every developer should know to create intuitive interfaces.",
        author: "Lisa Wang",
        date: "2024-01-05",
        readTime: "4 min read",
        image: "/placeholder.svg?height=200&width=400",
        likes: 98,
        comments: 15,
        featured: false,
      },
    ],
  },
  technology: {
    name: "Technology",
    description: "Latest tech trends, emerging technologies, and industry insights",
    postCount: 189,
    followerCount: "15.2K",
    posts: [
      {
        id: 2,
        title: "The Future of Web Development",
        excerpt: "Exploring emerging trends and technologies that will shape the future of web development.",
        author: "Mike Chen",
        date: "2024-01-12",
        readTime: "8 min read",
        image: "/placeholder.svg?height=200&width=400",
        likes: 189,
        comments: 32,
        featured: true,
      },
    ],
  },
}

const relatedTopics = [
  { name: "React", posts: 45 },
  { name: "TypeScript", posts: 34 },
  { name: "Node.js", posts: 28 },
  { name: "CSS", posts: 56 },
  { name: "JavaScript", posts: 78 },
]

export default function CategoryPage() {
  const params = useParams()
  const slug = params.slug as string
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("recent")
  const [isFollowing, setIsFollowing] = useState(false)

  const category = categoryData[slug as keyof typeof categoryData]

  if (!category) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Category Not Found</h1>
          <p className="text-muted-foreground mb-4">The category you're looking for doesn't exist.</p>
          <Link href="/categories">
            <Button>Browse All Categories</Button>
          </Link>
        </Card>
      </div>
    )
  }

  const filteredPosts = category.posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Category Header */}
            <div className="space-y-6">
              <Link href="/categories">
                <Button variant="ghost" className="mb-4">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Categories
                </Button>
              </Link>

              <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-xl p-8 border">
                <div className="flex items-center justify-between mb-4">
                  <h1 className="text-4xl font-bold">{category.name}</h1>
                  <Button variant={isFollowing ? "outline" : "default"} onClick={() => setIsFollowing(!isFollowing)}>
                    {isFollowing ? "Following" : "Follow"}
                  </Button>
                </div>
                <p className="text-xl text-muted-foreground mb-6">{category.description}</p>
                <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <span className="font-medium">{category.postCount}</span>
                    <span>articles</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="font-medium">{category.followerCount}</span>
                    <span>followers</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Search and Filter */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder={`Search ${category.name.toLowerCase()} articles...`}
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-full md:w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recent">Most Recent</SelectItem>
                      <SelectItem value="popular">Most Popular</SelectItem>
                      <SelectItem value="trending">Trending</SelectItem>
                      <SelectItem value="oldest">Oldest First</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Featured Post */}
            {category.posts.find((post) => post.featured) && (
              <section>
                <h2 className="text-2xl font-bold mb-6">Featured Article</h2>
                {(() => {
                  const featuredPost = category.posts.find((post) => post.featured)!
                  return (
                    <Card className="overflow-hidden shadow-lg border-0 bg-card">
                      <div className="md:flex">
                        <div className="md:w-1/2">
                          <Image
                            src={featuredPost.image || "/placeholder.svg"}
                            alt={featuredPost.title}
                            width={600}
                            height={400}
                            className="w-full h-64 md:h-full object-cover"
                          />
                        </div>
                        <div className="md:w-1/2 p-6">
                          <Badge className="mb-3 bg-gradient-to-r from-blue-600 to-purple-600">Featured</Badge>
                          <CardHeader className="p-0 mb-4">
                            <CardTitle className="text-2xl mb-2">
                              <Link href={`/post/${featuredPost.id}`} className="hover:text-primary transition-colors">
                                {featuredPost.title}
                              </Link>
                            </CardTitle>
                            <CardDescription className="text-base">{featuredPost.excerpt}</CardDescription>
                          </CardHeader>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-4">
                            <div className="flex items-center space-x-1">
                              <User className="w-4 h-4" />
                              <span>{featuredPost.author}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <CalendarDays className="w-4 h-4" />
                              <span>{new Date(featuredPost.date).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span>{featuredPost.readTime}</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                              <span>{featuredPost.likes} likes</span>
                              <span>{featuredPost.comments} comments</span>
                            </div>
                            <Button variant="ghost" size="sm">
                              <BookmarkPlus className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  )
                })()}
              </section>
            )}

            {/* All Posts */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">All {category.name} Articles</h2>
                <Badge variant="outline">{filteredPosts.length} articles</Badge>
              </div>
              <div className="space-y-6">
                {filteredPosts.length > 0 ? (
                  filteredPosts.map((post) => (
                    <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-all duration-300">
                      <div className="md:flex">
                        <div className="md:w-1/3">
                          <Image
                            src={post.image || "/placeholder.svg"}
                            alt={post.title}
                            width={300}
                            height={200}
                            className="w-full h-48 md:h-full object-cover"
                          />
                        </div>
                        <div className="md:w-2/3 p-6">
                          <CardHeader className="p-0 mb-4">
                            <CardTitle className="text-xl mb-2">
                              <Link href={`/post/${post.id}`} className="hover:text-primary transition-colors">
                                {post.title}
                              </Link>
                            </CardTitle>
                            <CardDescription className="text-base">{post.excerpt}</CardDescription>
                          </CardHeader>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-4">
                            <div className="flex items-center space-x-2">
                              <Avatar className="w-6 h-6">
                                <AvatarImage src="/placeholder.svg" />
                                <AvatarFallback>
                                  {post.author
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <span>{post.author}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <CalendarDays className="w-4 h-4" />
                              <span>{new Date(post.date).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span>{post.readTime}</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                              <span>{post.likes} likes</span>
                              <span>{post.comments} comments</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button variant="ghost" size="sm">
                                <BookmarkPlus className="h-4 w-4" />
                              </Button>
                              <Link href={`/post/${post.id}`}>
                                <Button variant="outline" size="sm">
                                  Read More
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))
                ) : (
                  <Card className="p-12 text-center">
                    <h3 className="text-lg font-medium mb-2">No articles found</h3>
                    <p className="text-muted-foreground">Try adjusting your search terms.</p>
                  </Card>
                )}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Related Topics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {relatedTopics.map((topic, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <Link href={`/topic/${topic.name.toLowerCase()}`} className="hover:text-primary transition-colors">
                      #{topic.name}
                    </Link>
                    <span className="text-sm text-muted-foreground">{topic.posts} posts</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Category Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Total Articles</span>
                  <Badge variant="outline">{category.postCount}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Followers</span>
                  <Badge variant="outline">{category.followerCount}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">This Month</span>
                  <Badge variant="outline">12 new</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Avg. Read Time</span>
                  <Badge variant="outline">6 min</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Explore More</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link href="/categories">
                  <Button variant="outline" className="w-full justify-start">
                    All Categories
                  </Button>
                </Link>
                <Link href="/authors">
                  <Button variant="outline" className="w-full justify-start">
                    Browse Authors
                  </Button>
                </Link>
                <Link href="/trending">
                  <Button variant="outline" className="w-full justify-start">
                    Trending Now
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
