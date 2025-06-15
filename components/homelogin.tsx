"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import logo from "@/public/logo.png"
import {
  CalendarDays,
  Clock,
  User,
  Bell,
  Search,
  BookmarkPlus,
  Bookmark,
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
import Footer from "@/components/footer"

const trendingTopics = [
  { name: "Next.js 15", posts: 23 },
  { name: "React", posts: 45 },
  { name: "TypeScript", posts: 34 },
  { name: "Web Performance", posts: 18 },
  { name: "CSS Grid", posts: 12 },
]

type Author = {
  id: string;
  name: string;
  avatar: string;
  postCount: number;
  followers?: number;
}

export default function HomePage() {
  const { data: session } = useSession()
  const { theme, setTheme } = useTheme()
  const userId = session?.user?.id
  const [bookmarkedPosts, setBookmarkedPosts] = useState<Set<number>>(new Set())
  const [followingAuthors, setFollowingAuthors] = useState<Set<string>>(new Set())
  const [featuredPost, setFeaturedPost] = useState<any>(null)
  const [latestPosts, setLatestPosts] = useState<any[]>([])
  const [featuredLoading, setFeaturedLoading] = useState(true)
  const [latestLoading, setLatestLoading] = useState(true)
  const [authors, setAuthors] = useState<Author[]>([])
  const [loading, setLoading] = useState(true)
  const [isFollowing, setIsFollowing] = useState(false);
  // Fetch suggested authors
  useEffect(() => {
    fetch("/api/suggested-authors")
      .then((res) => res.json())
      .then((data) => setAuthors(data))
      .finally(() => setLoading(false))
  }, [])

  // Fetch bookmarks for the user
  useEffect(() => {
    if (!userId) return
    fetch(`/api/bookmark?userId=${userId}`)
      .then(res => res.json())
      .then((data) => {
        setBookmarkedPosts(new Set(data.map((b: any) => b.postId)))
      })
      .catch((error) => {
        console.error("Error fetching bookmarks:", error)
      })
  }, [userId])

  // Fetch following authors for the user
  useEffect(() => {
    if (!userId) {
      setFollowingAuthors(new Set())
      return
    }
    fetch(`/api/following?userId=${userId}`)
      .then(res => res.json())
      .then((data) => {
        setFollowingAuthors(new Set(data.map((item: any) => String(item.followingId))))
      })
      .catch(() => setFollowingAuthors(new Set()))
  }, [userId])

  useEffect(() => {
    setFeaturedLoading(true)
    fetch('/api/posts/featured')
      .then((res) => res.json())
      .then((data) => {
        if (data) setFeaturedPost(Array.isArray(data) ? data[0] : data)
      })
      .catch((error) => {
        console.error("Error fetching featured post:", error)
      })
      .finally(() => setFeaturedLoading(false))
  }, [])

  useEffect(() => {
    setLatestLoading(true)
    fetch('/api/posts/latest')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setLatestPosts(data)
        else if (data) setLatestPosts([data])
      })
      .catch((error) => {
        console.error("Error fetching latest posts:", error)
      })
      .finally(() => setLatestLoading(false))
  }, [])

  const toggleBookmark = async (postId: number) => {
    if (!userId) {
      alert("You must be logged in to bookmark posts.")
      return
    }
    try {
      const res = await fetch("/api/bookmark", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, postId }),
      });
      if (!res.ok) throw new Error("Failed to toggle bookmark");
      setBookmarkedPosts((prev) => {
        const newSet = new Set(prev);
        if (newSet.has(postId)) {
          newSet.delete(postId);
        } else {
          newSet.add(postId);
        }
        return newSet;
      });
    } catch (error) {
      console.error("Error toggling bookmark:", error);
    }
  };

  const toggleFollow = async (authorId: string) => {
    if (!userId) return;
    const authorKey = String(authorId);
    const res = await fetch("/api/follow", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ followerId: userId, followingId: authorId }),
    });
    const data = await res.json();
    setFollowingAuthors(prev => {
      const newSet = new Set(prev);
      if (data.followed) newSet.add(authorKey);
      else newSet.delete(authorKey);
      return newSet;
    });
  };

  const getInitials = (name: string | undefined) => {
    if (!name || typeof name !== "string") return "?"
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
  }

  return (
    <div className="min-h-screen bg-background transition-colors flex flex-col">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <Link
              href="/"
              className="flex items-center text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            >
              <Image
                src={logo}
                alt="Ayblog Logo"
                width={60}
                height={60}
                className="inline-block p-0 m-0"
                priority
              />
              <span className="ml-3">Ayblog</span>
            </Link>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-md mx-8 min-w-0">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input placeholder="Search articles, authors, topics..." className="pl-10 bg-muted/50 w-full" />
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

            <div className="flex items-center space-x-2">
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
                      <p className="text-sm font-medium leading-none">{session?.user?.name || "username"}</p>
                      <p className="text-xs leading-none text-muted-foreground">{session?.user?.email || "user email"}</p>
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

      <main className="container mx-auto px-2 sm:px-4 py-8 flex-1 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-xl p-6 border">
              <h1 className="text-2xl sm:text-3xl font-bold mb-2">
                Welcome back to Ayblog, {session?.user?.name?.split(" ")[0] || "User"}👋
              </h1>
              <p className="text-muted-foreground mb-4">
                Here's what's happening in your network today. You have 3 new articles from people you follow.
              </p>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
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
            <section>
              <h2 className="text-xl sm:text-2xl font-bold mb-6">Featured Today</h2>
              {featuredLoading ? (
                <div className="flex justify-center items-center py-12">
                  <svg className="animate-spin h-8 w-8 text-blue-600" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                  </svg>
                  <span className="ml-2 text-blue-600">Loading featured post...</span>
                </div>
              ) : featuredPost ? (
                <Card className="overflow-hidden shadow-lg border-0 bg-card">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/2 flex items-center justify-center bg-gray-100 min-w-0">
                      <Image
                        src={featuredPost.featuredImage || "/placeholder.svg"}
                        alt={featuredPost.title}
                        width={500}
                        height={300}
                        className="object-cover w-full h-[200px] md:h-[300px] rounded-lg"
                        style={{ minWidth: 0, maxWidth: 500, maxHeight: 300 }}
                      />
                    </div>
                    <div className="md:w-1/2 p-6 min-w-0">
                      <CardHeader className="p-0 mb-4">
                        <CardTitle className="text-lg sm:text-2xl mb-2 truncate">
                          <Link href={`/post/${featuredPost.slug}`} className="hover:text-primary transition-colors">
                            {featuredPost.title}
                          </Link>
                        </CardTitle>
                      </CardHeader>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center space-x-1">
                          <User className="w-4 h-4" />
                          <span className="truncate">{featuredPost.author}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <CalendarDays className="w-4 h-4" />
                          <span>{featuredPost.createdAt ? new Date(featuredPost.createdAt).toLocaleDateString() : ""}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>5</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between flex-wrap">
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span>{featuredPost.likes} likes</span>
                          <span>4 comments</span>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => toggleBookmark(featuredPost.id)}>
                          {bookmarkedPosts.has(featuredPost.id) ? (
                            <Bookmark className="h-4 w-4 text-blue-600 fill-blue-600" />
                          ) : (
                            <BookmarkPlus className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ) : (
                <div className="text-center text-muted-foreground">No featured post found.</div>
              )}
            </section>

            {/* Recent Posts */}
            <section>
              <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-2">
                <h2 className="text-xl sm:text-2xl font-bold">Latest Articles</h2>
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
              {latestLoading ? (
                <div className="flex justify-center items-center py-12">
                  <svg className="animate-spin h-8 w-8 text-blue-600" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                  </svg>
                  <span className="ml-2 text-blue-600">Loading latest posts...</span>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {latestPosts.map((post) => (
                    <Card
                      key={post.id}
                      className="overflow-hidden hover:shadow-lg transition-all duration-300 border bg-card group"
                    >
                      <div className="relative overflow-hidden">
                        <Image
                          src={
                            post.featuredImage ||
                            post.image ||
                            "/placeholder.svg"
                          }
                          alt={post.title}
                          width={400}
                          height={200}
                          className="w-full h-[200px] object-cover group-hover:scale-105 transition-transform duration-300"
                          style={{ minWidth: 0, maxWidth: 400, maxHeight: 200 }}
                        />
                        <Badge className="absolute top-4 left-4 bg-background/80 text-foreground">{post.category}</Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute top-4 right-4 bg-background/80 hover:bg-background"
                          onClick={() => toggleBookmark(post.id)}
                        >
                          {bookmarkedPosts.has(post.id) ? (
                            <Bookmark className="h-4 w-4 text-blue-600 fill-blue-600" />
                          ) : (
                            <BookmarkPlus className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                      <CardHeader>
                        <CardTitle className="text-base sm:text-lg mb-2 truncate">
                          <Link href={`/post/${post.slug}`} className="hover:text-primary transition-colors">
                            {post.title}
                          </Link>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap items-center justify-between text-sm text-muted-foreground mb-3 gap-2">
                          <div className="flex items-center space-x-2">
                            <Avatar className="w-6 h-6">
                              <AvatarImage src="/placeholder.svg" />
                              <AvatarFallback>
                                {getInitials(post.author)}
                              </AvatarFallback>
                            </Avatar>
                            <span className="truncate">{post.author}</span>
                          </div>
                          <span>{post.readTime}</span>
                        </div>
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <span>{post.likes} likes</span>
                            <span>{post.comments} comments</span>
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {post.date ? new Date(post.date).toLocaleDateString() : ""}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
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
                {loading ? (
                  <div className="flex justify-center items-center py-6">
                    <svg className="animate-spin h-6 w-6 text-blue-600" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                    </svg>
                    <span className="ml-2 text-blue-600">Loading authors...</span>
                  </div>
                ) : (
                  authors.map((author: Author) => {
                    const authorFollowers = author.followers ?? 0;
                    return (
                      <div key={author.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={author.avatar || "/placeholder.svg"} />
                            <AvatarFallback>
                              {getInitials(author.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">{author.name}</p>
                            <p className="text-xs text-muted-foreground">{authorFollowers} followers</p>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant={followingAuthors.has(String(author.id)) ? "outline" : "default"}
                          onClick={() => toggleFollow(author.id)}
                          disabled={!userId}
                        >
                          {followingAuthors.has(String(author.id)) ? "Following" : "Follow"}
                        </Button>
                      </div>
                    );
                  })
                )}
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
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}