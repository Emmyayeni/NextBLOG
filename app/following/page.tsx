"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarDays, Clock, Search, UserMinus, Bell, BellOff } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const followingPosts = [
  {
    id: 1,
    title: "Advanced React Patterns You Should Know",
    excerpt: "Explore advanced React patterns that will make your code more maintainable and scalable.",
    author: "Sarah Johnson",
    date: "2024-01-16",
    readTime: "8 min read",
    category: "Development",
    image: "/placeholder.svg?height=200&width=400",
    likes: 156,
    comments: 23,
    isNew: true,
  },
  {
    id: 2,
    title: "The Art of Minimalist Design",
    excerpt: "How to create beautiful, functional designs with less clutter and more impact.",
    author: "Emily Davis",
    date: "2024-01-15",
    readTime: "6 min read",
    category: "Design",
    image: "/placeholder.svg?height=200&width=400",
    likes: 234,
    comments: 45,
    isNew: true,
  },
  {
    id: 3,
    title: "Building Scalable APIs with Node.js",
    excerpt: "Best practices for creating robust and scalable backend services.",
    author: "Mike Chen",
    date: "2024-01-14",
    readTime: "10 min read",
    category: "Backend",
    image: "/placeholder.svg?height=200&width=400",
    likes: 189,
    comments: 32,
    isNew: false,
  },
]

const followingAuthors = [
  {
    name: "Sarah Johnson",
    username: "@sarahjdev",
    followers: "12.5K",
    avatar: "/placeholder.svg",
    specialty: "Frontend Development",
    postsCount: 45,
    isFollowing: true,
    notifications: true,
  },
  {
    name: "Emily Davis",
    username: "@emilydesigns",
    followers: "15.2K",
    avatar: "/placeholder.svg",
    specialty: "UI/UX Design",
    postsCount: 38,
    isFollowing: true,
    notifications: false,
  },
  {
    name: "Mike Chen",
    username: "@mikechen",
    followers: "8.9K",
    avatar: "/placeholder.svg",
    specialty: "Full Stack Development",
    postsCount: 52,
    isFollowing: true,
    notifications: true,
  },
]

export default function FollowingPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("recent")
  const [following, setFollowing] = useState(new Set(followingAuthors.map((author) => author.name)))
  const [notifications, setNotifications] = useState(
    new Set(followingAuthors.filter((author) => author.notifications).map((author) => author.name)),
  )

  const filteredPosts = followingPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const toggleFollow = (authorName: string) => {
    setFollowing((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(authorName)) {
        newSet.delete(authorName)
      } else {
        newSet.add(authorName)
      }
      return newSet
    })
  }

  const toggleNotifications = (authorName: string) => {
    setNotifications((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(authorName)) {
        newSet.delete(authorName)
      } else {
        newSet.add(authorName)
      }
      return newSet
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold">Following</h1>
                <p className="text-muted-foreground">Latest posts from authors you follow</p>
              </div>
              <Badge variant="outline" className="bg-blue-50">
                {followingPosts.filter((post) => post.isNew).length} new posts
              </Badge>
            </div>

            {/* Search and Filter */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Search posts from people you follow..."
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
                      <SelectItem value="author">By Author</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Posts */}
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
                        <div className="flex items-center gap-2 mb-3">
                          <Badge variant="outline">{post.category}</Badge>
                          {post.isNew && <Badge className="bg-green-500 hover:bg-green-600">New</Badge>}
                        </div>
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
                          <Link href={`/post/${post.id}`}>
                            <Button variant="outline" size="sm">
                              Read More
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                <Card className="p-12 text-center">
                  <h3 className="text-lg font-medium mb-2">No posts found</h3>
                  <p className="text-muted-foreground">Try adjusting your search or follow more authors.</p>
                </Card>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Following ({followingAuthors.length})</CardTitle>
                <CardDescription>Manage the authors you follow</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {followingAuthors.map((author, index) => (
                  <div key={index} className="flex items-center justify-between space-x-3">
                    <div className="flex items-center space-x-3 flex-1">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={author.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {author.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{author.name}</p>
                        <p className="text-xs text-muted-foreground">{author.specialty}</p>
                        <p className="text-xs text-muted-foreground">{author.postsCount} posts</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleNotifications(author.name)}
                        className="h-8 w-8"
                      >
                        {notifications.has(author.name) ? (
                          <Bell className="h-4 w-4" />
                        ) : (
                          <BellOff className="h-4 w-4" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleFollow(author.name)}
                        className="h-8 w-8 text-red-600 hover:text-red-700"
                      >
                        <UserMinus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Discover More</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">Find new authors and topics to follow</p>
                <Link href="/authors">
                  <Button variant="outline" className="w-full">
                    Browse Authors
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
