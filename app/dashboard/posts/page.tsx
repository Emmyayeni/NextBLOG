"use client"

import { useState,useEffect} from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Eye, MoreHorizontal, PenSquare, Search, Trash2 } from "lucide-react"

// Sample data for posts

type Post = {
  id: string | number
  title: string
  slug: string
  excerpt: string
  content: string
  featuredImage: string
  published: boolean
  status: "published" | "draft"
  category: string | number 
  like:number
  views: number
  featured: boolean
  createdAt: string

}

export default function PostsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    async function fetchPosts() {
      setLoading(true)
      const response = await fetch("/api/posts")
      const data = await response.json()
      setPosts(data)
      setLoading(false)
    }
    fetchPosts()
  }, [])

  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || post.status === statusFilter
    const matchesCategory =
      categoryFilter === "all" ||
      (typeof post.category === "string"
        ? post.category.toLowerCase() === categoryFilter
        : String(post.category) === categoryFilter)
    return matchesSearch && matchesStatus && matchesCategory
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">My Posts</h1>
        <Button asChild className="m-2">
          <Link href="/dashboard/create">Create New Post</Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Posts</CardTitle>
          <CardDescription>Manage your blog posts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="flex-1 relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search posts..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="development">Development</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="rounded-md border">
              {loading ? (
                <div className="flex justify-center items-center h-40">
                  <svg className="animate-spin h-8 w-8 text-blue-600 mr-3" viewBox="0 0 24 24">
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
                  <span className="text-lg font-medium text-blue-600">Loading posts...</span>
                </div>):
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Views</TableHead>
                    <TableHead className="text-right">Comments</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPosts.length > 0 ? (
                    filteredPosts.map((post) => (
                      <TableRow key={post.id}>
                        <TableCell className="font-medium">
                          <Link href={`/dashboard/posts/${post.slug}`} className="hover:underline">
                            {post.title}
                          </Link>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={post.status === "published" ? "default" : "secondary"}
                            className={
                              post.status === "published"
                                ? "bg-green-500 hover:bg-green-600"
                                : "bg-gray-500 hover:bg-gray-600"
                            }
                          >
                            {post.status === "published" ? "Published" : "Draft"}
                          </Badge>
                        </TableCell>
                        <TableCell>{post.category}</TableCell>
                        <TableCell>{new Date(post.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell className="text-right">{post.views}</TableCell>
                        {/* <TableCell className="text-right">{post.comments}</TableCell> */}
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Actions</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem asChild>
                                <Link href={`/post/${post.slug}`} className="flex items-center">
                                  <Eye className="mr-2 h-4 w-4" />
                                  View
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem asChild>
                                <Link href={`/dashboard/posts/${post.slug}/edit`} className="flex items-center">
                                  <PenSquare className="mr-2 h-4 w-4" />
                                  Edit
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem className="flex items-center text-red-600 focus:text-red-600">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="h-24 text-center">
                        No posts found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
