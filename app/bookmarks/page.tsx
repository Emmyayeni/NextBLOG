"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarDays, Clock, Search, Bookmark, BookmarkX, FolderPlus, Folder, Loader2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const folders = [
  { name: "Web Development", count: 1, color: "bg-blue-500" },
  { name: "JavaScript", count: 1, color: "bg-yellow-500" },
  { name: "Design", count: 1, color: "bg-purple-500" },
  { name: "Learning", count: 1, color: "bg-green-500" },
]

export default function BookmarksPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const userId = session?.user?.id
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFolder, setSelectedFolder] = useState("all")
  const [sortBy, setSortBy] = useState("recent")
  const [bookmarks, setBookmarks] = useState<any[]>([])
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!userId) return
    setLoading(true)
    fetch(`/api/bookmark?userId=${userId}`)
      .then((response) => response.json())
      .then(async (data: any[]) => {
        setBookmarks(data)
        // Fetch post details for each bookmark
        const postDetails = await Promise.all(
          data.map(async (bookmark) => {
            const res = await fetch(`/api/posts/${bookmark.postId}`)
            if (!res.ok) return null
            const post = await res.json()
            // If post is nested under 'post', flatten it
            const postData = post.post ? { ...bookmark, ...post.post, author: post.author } : { ...bookmark, ...post }
            return postData
          })
        )
        setPosts(postDetails.filter(Boolean))
      })
      .catch((error) => {
        console.error("Error fetching bookmarks:", error)
      })
      .finally(() => setLoading(false))
  }, [userId])

  // Helper for initials
  const getInitials = (name: string | undefined) => {
    if (!name || typeof name !== "string") return "?"
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
  }

  const filteredPosts = posts
    .filter((post) => {
      const matchesSearch =
        post.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.author?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.category?.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesFolder = selectedFolder === "all" || post.folder === selectedFolder
      return matchesSearch && matchesFolder
    })
    .sort((a, b) => {
      if (sortBy === "recent") return new Date(b.bookmarkedDate || b.createdAt).getTime() - new Date(a.bookmarkedDate || a.createdAt).getTime()
      if (sortBy === "oldest") return new Date(a.bookmarkedDate || a.createdAt).getTime() - new Date(b.bookmarkedDate || b.createdAt).getTime()
      if (sortBy === "title") return (a.title || "").localeCompare(b.title || "")
      if (sortBy === "author") return (a.author?.name || "").localeCompare(b.author?.name || "")
      return 0
    })

  const removeBookmark = async (postId: number) => {
    if (!userId) return
    try {
      const res = await fetch("/api/bookmark", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, postId }),
      })
      if (res.ok) {
        setBookmarks((prev) => prev.filter((post) => post.postId !== postId && post.id !== postId))
        setPosts((prev) => prev.filter((post) => post.postId !== postId && post.id !== postId))
      } else {
        console.error("Failed to remove bookmark")
      }
    } catch (error) {
      console.error("Error removing bookmark:", error)
    }
  }

  if (status === "loading" || loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="animate-spin h-8 w-8 text-blue-600 mr-2" />
        <span>Loading bookmarks...</span>
      </div>
    )
  }

  if (!userId) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span>Please sign in to view your bookmarks.</span>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button
          variant="outline"
          className="mb-6"
          onClick={() => router.push("/")}
        >
          ← Back to Home
        </Button>
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold">Bookmarks</h1>
                <p className="text-muted-foreground">Your saved articles for later reading</p>
              </div>
              <Badge variant="outline" className="bg-blue-50">
                {posts.length} saved articles
              </Badge>
            </div>

            {/* Search and Filter */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Search your bookmarks..."
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Select value={selectedFolder} onValueChange={setSelectedFolder}>
                    <SelectTrigger className="w-full md:w-[180px]">
                      <SelectValue placeholder="All folders" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Folders</SelectItem>
                      {folders.map((folder) => (
                        <SelectItem key={folder.name} value={folder.name}>
                          {folder.name} ({folder.count})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-full md:w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recent">Recently Saved</SelectItem>
                      <SelectItem value="oldest">Oldest First</SelectItem>
                      <SelectItem value="title">Title A-Z</SelectItem>
                      <SelectItem value="author">By Author</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Bookmarked Posts */}
            <div className="space-y-6">
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post) => (
                  <Card key={post.id || post.postId} className="overflow-hidden hover:shadow-lg transition-all duration-300">
                    <div className="md:flex">
                      <div className="md:w-1/3">
                        <Image
                          src={post.featuredImage || "/placeholder.svg"}
                          alt={post.title || "Bookmarked post"}
                          width={300}
                          height={200}
                          className="w-full h-48 md:h-full object-cover"
                        />
                      </div>
                      <div className="md:w-2/3 p-6">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{post.category}</Badge>
                            <Badge variant="secondary" className="text-xs">
                              <Folder className="w-3 h-3 mr-1" />
                              {post.folder}
                            </Badge>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeBookmark(post.id || post.postId)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <BookmarkX className="h-4 w-4" />
                          </Button>
                        </div>
                        <CardHeader className="p-0 mb-4">
                          <CardTitle className="text-xl mb-2">
                            <Link href={`/post/${post.id || post.postId}`} className="hover:text-primary transition-colors">
                              {post.title || "Untitled"}
                            </Link>
                          </CardTitle>
                          <CardDescription className="text-base">{post.excerpt}</CardDescription>
                        </CardHeader>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-4">
                          <div className="flex items-center space-x-2">
                            <Avatar className="w-6 h-6">
                              <AvatarImage src={post.author?.profilePicture || "/placeholder.svg"} />
                              <AvatarFallback>
                                {getInitials(post.author?.name)}
                              </AvatarFallback>
                            </Avatar>
                            <span>{post.author?.name}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <CalendarDays className="w-4 h-4" />
                            <span>{post.date ? new Date(post.date).toLocaleDateString() : ""}</span>
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
                            <span>
                              Saved{" "}
                              {post.bookmarkedDate || post.createdAt
                                ? new Date(post.bookmarkedDate || post.createdAt).toLocaleDateString()
                                : ""}
                            </span>
                          </div>
                          <Link href={`/post/${post.id || post.postId}`}>
                            <Button variant="outline" size="sm">
                              Read Now
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                <Card className="p-12 text-center">
                  <Bookmark className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No bookmarks found</h3>
                  <p className="text-muted-foreground mb-4">
                    {searchTerm || selectedFolder !== "all"
                      ? "Try adjusting your search or filter."
                      : "Start bookmarking articles you want to read later."}
                  </p>
                  <Link href="/">
                    <Button>Discover Articles</Button>
                  </Link>
                </Card>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Folder className="h-5 w-5" />
                  Folders
                </CardTitle>
                <CardDescription>Organize your bookmarks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <FolderPlus className="h-4 w-4 mr-2" />
                  Create Folder
                </Button>
                {folders.map((folder, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 cursor-pointer"
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${folder.color}`}></div>
                      <span className="text-sm font-medium">{folder.name}</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {folder.count}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Reading Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Total Bookmarks</span>
                  <Badge variant="outline">{posts.length}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">This Month</span>
                  <Badge variant="outline">3</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Reading Time</span>
                  <Badge variant="outline">42 min</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Folders</span>
                  <Badge variant="outline">{folders.length}</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  Export Bookmarks
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Import from Browser
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Share Reading List
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}