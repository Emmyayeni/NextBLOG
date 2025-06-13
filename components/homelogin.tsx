"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  CalendarDays,
  Clock,
  User,
  Bell,
  Search,
  BookmarkPlus,
  TrendingUp,
  Users,
  PenSquare,
  Sun,
  Moon,
  Settings,
  LogOut,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from "next/image"
import Link from "next/link"
import { useTheme } from "next-themes"
import { useSession } from "next-auth/react"

const blogPosts = [
  {
    id: 1,
    title: "Getting Started with Next.js 15",
    excerpt:
      "Learn how to build modern web applications with the latest features in Next.js 15, including improved performance and developer experience.",
    author: "Sarah Johnson",
    date: "2024-01-15",
    readTime: "5 min read",
    category: "Development",
    image: "/placeholder.svg?height=200&width=400",
    featured: true,
    isBookmarked: false,
    likes: 234,
    comments: 45,
  },
  {
    id: 2,
    title: "The Future of Web Development",
    excerpt:
      "Exploring emerging trends and technologies that will shape the future of web development in 2024 and beyond.",
    author: "Mike Chen",
    date: "2024-01-12",
    readTime: "8 min read",
    category: "Technology",
    image: "/placeholder.svg?height=200&width=400",
    isBookmarked: true,
    likes: 189,
    comments: 32,
  },
  {
    id: 3,
    title: "Building Responsive Designs",
    excerpt:
      "Master the art of creating beautiful, responsive designs that work seamlessly across all devices and screen sizes.",
    author: "Emily Davis",
    date: "2024-01-10",
    readTime: "6 min read",
    category: "Design",
    image: "/placeholder.svg?height=200&width=400",
    isBookmarked: false,
    likes: 156,
    comments: 28,
  },
  {
    id: 4,
    title: "JavaScript Performance Tips",
    excerpt: "Optimize your JavaScript code for better performance with these proven techniques and best practices.",
    author: "Alex Rodriguez",
    date: "2024-01-08",
    readTime: "7 min read",
    category: "Development",
    image: "/placeholder.svg?height=200&width=400",
    isBookmarked: true,
    likes: 143,
    comments: 21,
  },
  {
    id: 5,
    title: "UI/UX Design Principles",
    excerpt:
      "Essential design principles every developer should know to create intuitive and user-friendly interfaces.",
    author: "Lisa Wang",
    date: "2024-01-05",
    readTime: "4 min read",
    category: "Design",
    image: "/placeholder.svg?height=200&width=400",
    isBookmarked: false,
    likes: 98,
    comments: 15,
  },
  {
    id: 6,
    title: "Modern CSS Techniques",
    excerpt: "Discover the latest CSS features and techniques to create stunning visual effects and layouts.",
    author: "David Kim",
    date: "2024-01-03",
    readTime: "5 min read",
    category: "Development",
    image: "/placeholder.svg?height=200&width=400",
    isBookmarked: false,
    likes: 87,
    comments: 12,
  },
]

const trendingTopics = [
  { name: "Next.js 15", posts: 23 },
  { name: "React", posts: 45 },
  { name: "TypeScript", posts: 34 },
  { name: "Web Performance", posts: 18 },
  { name: "CSS Grid", posts: 12 },
]

const suggestedAuthors = [
  { name: "Sarah Johnson", followers: "12.5K", avatar: "/placeholder.svg", isFollowing: false },
  { name: "Mike Chen", followers: "8.9K", avatar: "/placeholder.svg", isFollowing: true },
  { name: "Emily Davis", followers: "15.2K", avatar: "/placeholder.svg", isFollowing: false },
]

export default function HomePage() {
  const { data: session } = useSession()

  const { theme, setTheme } = useTheme()
  const [bookmarkedPosts, setBookmarkedPosts] = useState(new Set([2, 4]))
  const [followingAuthors, setFollowingAuthors] = useState(new Set(["Mike Chen"]))

  const featuredPost = blogPosts.find((post) => post.featured)
  const regularPosts = blogPosts.filter((post) => !post.featured)

  const toggleBookmark = (postId: number) => {
    setBookmarkedPosts((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(postId)) {
        newSet.delete(postId)
      } else {
        newSet.add(postId)
      }
      return newSet
    })
  }

  const toggleFollow = (authorName: string) => {
    setFollowingAuthors((prev) => {
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
    <div className="min-h-screen bg-background transition-colors">
      {/* Header */}
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
              <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
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
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg" alt="@johndoe" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">John Doe</p>
                      <p className="text-xs leading-none text-muted-foreground">john@example.com</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/settings">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-xl p-6 border">
              <h1 className="text-3xl font-bold mb-2">Welcome back to Ayblog,
                 {session?.user?.name?.split(" ")[0] || "User"}👋</h1>
              <p className="text-muted-foreground mb-4">
                Here's what's happening in your network today. You have 3 new articles from people you follow.
              </p>
              <div className="flex items-center gap-4">
                <Link href="/dashboard/create">
                  <Button>
                    <PenSquare className="h-4 w-4 mr-2" />
                    Write New Article
                  </Button>
                </Link>
                <Link href="/following">
                  <Button variant="outline">View Following</Button>
                </Link>
              </div>
            </div>

            {/* Featured Post */}
            {featuredPost && (
              <section>
                <h2 className="text-2xl font-bold mb-6">Featured Today</h2>
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
                      <Badge className="mb-3 bg-gradient-to-r from-blue-600 to-purple-600">
                        {featuredPost.category}
                      </Badge>
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
                        <Button variant="ghost" size="sm" onClick={() => toggleBookmark(featuredPost.id)}>
                          <BookmarkPlus
                            className={`h-4 w-4 ${bookmarkedPosts.has(featuredPost.id) ? "fill-current" : ""}`}
                          />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </section>
            )}

            {/* Recent Posts */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Latest Articles</h2>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    All
                  </Button>
                  <Button variant="ghost" size="sm">
                    Following
                  </Button>
                  <Button variant="ghost" size="sm">
                    Trending
                  </Button>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {regularPosts.map((post) => (
                  <Card
                    key={post.id}
                    className="overflow-hidden hover:shadow-lg transition-all duration-300 border bg-card group"
                  >
                    <div className="relative overflow-hidden">
                      <Image
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        width={400}
                        height={200}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <Badge className="absolute top-4 left-4 bg-background/80 text-foreground">{post.category}</Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-4 right-4 bg-background/80 hover:bg-background"
                        onClick={() => toggleBookmark(post.id)}
                      >
                        <BookmarkPlus className={`h-4 w-4 ${bookmarkedPosts.has(post.id) ? "fill-current" : ""}`} />
                      </Button>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-lg mb-2">
                        <Link href={`/post/${post.id}`} className="hover:text-primary transition-colors">
                          {post.title}
                        </Link>
                      </CardTitle>
                      <CardDescription>{post.excerpt}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
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
                        <span>{post.readTime}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span>{post.likes} likes</span>
                          <span>{post.comments} comments</span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {new Date(post.date).toLocaleDateString()}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Trending Topics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Trending Topics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {trendingTopics.map((topic, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <Link href={`/topic/${topic.name.toLowerCase()}`} className="hover:text-primary transition-colors">
                      #{topic.name}
                    </Link>
                    <span className="text-sm text-muted-foreground">{topic.posts} posts</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Suggested Authors */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Who to Follow
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {suggestedAuthors.map((author, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={author.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {author.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{author.name}</p>
                        <p className="text-xs text-muted-foreground">{author.followers} followers</p>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant={followingAuthors.has(author.name) ? "outline" : "default"}
                      onClick={() => toggleFollow(author.name)}
                    >
                      {followingAuthors.has(author.name) ? "Following" : "Follow"}
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Your Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Articles Published</span>
                  <Badge variant="outline">12</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Total Views</span>
                  <Badge variant="outline">25.4K</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Followers</span>
                  <Badge variant="outline">1.2K</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Articles Bookmarked</span>
                  <Badge variant="outline">{bookmarkedPosts.size}</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-muted/30 border-t py-12 px-4 mt-16">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Ayblog
              </h3>
              <p className="text-muted-foreground">
                A modern platform for sharing knowledge, stories, and insights with the world.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="/" className="hover:text-foreground transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/following" className="hover:text-foreground transition-colors">
                    Following
                  </Link>
                </li>
                <li>
                  <Link href="/bookmarks" className="hover:text-foreground transition-colors">
                    Bookmarks
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="hover:text-foreground transition-colors">
                    Dashboard
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Categories</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="/category/development" className="hover:text-foreground transition-colors">
                    Development
                  </Link>
                </li>
                <li>
                  <Link href="/category/design" className="hover:text-foreground transition-colors">
                    Design
                  </Link>
                </li>
                <li>
                  <Link href="/category/technology" className="hover:text-foreground transition-colors">
                    Technology
                  </Link>
                </li>
                <li>
                  <Link href="/category/business" className="hover:text-foreground transition-colors">
                    Business
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Twitter
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    LinkedIn
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    GitHub
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    RSS Feed
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Ayblog. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
