"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Search, MessageSquare, Check, X, Reply, Flag, Trash2 } from "lucide-react"

const comments = [
  {
    id: 1,
    author: "John Doe",
    email: "john@example.com",
    avatar: "/placeholder.svg",
    content: "Great article! I've been waiting for Next.js 15 and this guide is exactly what I needed to get started.",
    post: "Getting Started with Next.js 15",
    date: "2024-01-16T10:30:00Z",
    status: "approved",
    replies: 2,
  },
  {
    id: 2,
    author: "Jane Smith",
    email: "jane@example.com",
    avatar: "/placeholder.svg",
    content: "The App Router changes are game-changing. Thanks for the detailed explanation of the new features.",
    post: "Getting Started with Next.js 15",
    date: "2024-01-16T09:15:00Z",
    status: "pending",
    replies: 0,
  },
  {
    id: 3,
    author: "Mike Johnson",
    email: "mike@example.com",
    avatar: "/placeholder.svg",
    content: "I love how Next.js keeps evolving. The performance improvements in version 15 are impressive.",
    post: "The Future of Web Development",
    date: "2024-01-15T14:20:00Z",
    status: "approved",
    replies: 1,
  },
  {
    id: 4,
    author: "Sarah Wilson",
    email: "sarah@example.com",
    avatar: "/placeholder.svg",
    content: "This is spam content that should be moderated.",
    post: "Building Responsive Designs",
    date: "2024-01-15T11:45:00Z",
    status: "flagged",
    replies: 0,
  },
]

export default function CommentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedComment, setSelectedComment] = useState<number | null>(null)
  const [replyText, setReplyText] = useState("")

  const filteredComments = comments.filter((comment) => {
    const matchesSearch =
      comment.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comment.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comment.post.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || comment.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-500 hover:bg-green-600"
      case "pending":
        return "bg-yellow-500 hover:bg-yellow-600"
      case "flagged":
        return "bg-red-500 hover:bg-red-600"
      default:
        return "bg-gray-500 hover:bg-gray-600"
    }
  }

  const handleApprove = (commentId: number) => {
    console.log("Approving comment:", commentId)
  }

  const handleReject = (commentId: number) => {
    console.log("Rejecting comment:", commentId)
  }

  const handleReply = (commentId: number) => {
    if (replyText.trim()) {
      console.log("Replying to comment:", commentId, "with:", replyText)
      setReplyText("")
      setSelectedComment(null)
    }
  }

  const handleFlag = (commentId: number) => {
    console.log("Flagging comment:", commentId)
  }

  const handleDelete = (commentId: number) => {
    console.log("Deleting comment:", commentId)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Comments</h1>
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="bg-yellow-50">
            {comments.filter((c) => c.status === "pending").length} Pending
          </Badge>
          <Badge variant="outline" className="bg-red-50">
            {comments.filter((c) => c.status === "flagged").length} Flagged
          </Badge>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Comment Management</CardTitle>
          <CardDescription>Moderate and respond to comments on your blog posts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="flex-1 relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search comments..."
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
                  <SelectItem value="all">All Comments</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="flagged">Flagged</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              {filteredComments.length > 0 ? (
                filteredComments.map((comment) => (
                  <Card key={comment.id} className="border-l-4 border-l-blue-500">
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-4">
                            <Avatar>
                              <AvatarImage src={comment.avatar || "/placeholder.svg"} />
                              <AvatarFallback>
                                {comment.author
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-medium">{comment.author}</h4>
                                <Badge className={getStatusColor(comment.status)}>{comment.status}</Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">{comment.email}</p>
                              <p className="text-sm mb-2">
                                On: <span className="font-medium">"{comment.post}"</span>
                              </p>
                              <p className="text-sm text-muted-foreground">{new Date(comment.date).toLocaleString()}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {comment.replies > 0 && (
                              <Badge variant="outline" className="text-xs">
                                {comment.replies} {comment.replies === 1 ? "reply" : "replies"}
                              </Badge>
                            )}
                          </div>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-4">
                          <p className="text-sm">{comment.content}</p>
                        </div>

                        <div className="flex items-center gap-2 flex-wrap">
                          {comment.status === "pending" && (
                            <>
                              <Button size="sm" onClick={() => handleApprove(comment.id)}>
                                <Check className="h-3 w-3 mr-1" />
                                Approve
                              </Button>
                              <Button size="sm" variant="outline" onClick={() => handleReject(comment.id)}>
                                <X className="h-3 w-3 mr-1" />
                                Reject
                              </Button>
                            </>
                          )}
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setSelectedComment(selectedComment === comment.id ? null : comment.id)}
                          >
                            <Reply className="h-3 w-3 mr-1" />
                            Reply
                          </Button>
                          {comment.status !== "flagged" && (
                            <Button size="sm" variant="outline" onClick={() => handleFlag(comment.id)}>
                              <Flag className="h-3 w-3 mr-1" />
                              Flag
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-red-600 hover:text-red-700"
                            onClick={() => handleDelete(comment.id)}
                          >
                            <Trash2 className="h-3 w-3 mr-1" />
                            Delete
                          </Button>
                        </div>

                        {selectedComment === comment.id && (
                          <div className="space-y-3 border-t pt-4">
                            <Textarea
                              placeholder="Write your reply..."
                              value={replyText}
                              onChange={(e) => setReplyText(e.target.value)}
                              className="min-h-[80px]"
                            />
                            <div className="flex items-center gap-2">
                              <Button size="sm" onClick={() => handleReply(comment.id)}>
                                Send Reply
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  setSelectedComment(null)
                                  setReplyText("")
                                }}
                              >
                                Cancel
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center py-8">
                  <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No comments found</h3>
                  <p className="text-muted-foreground">No comments match your current filters.</p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
