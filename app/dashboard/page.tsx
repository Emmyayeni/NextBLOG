import React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart3, Eye, MessageSquare, ThumbsUp } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  // Dashboard statistics
  const stats = [
    {
      title: "Total Posts",
      value: "12",
      change: "+2 from last month",
      icon: <FileIcon className="h-4 w-4 text-blue-600" />,
    },
    {
      title: "Total Views",
      value: "2,345",
      change: "+20% from last month",
      icon: <Eye className="h-4 w-4 text-green-600" />,
    },
    {
      title: "Comments",
      value: "45",
      change: "+12 from last month",
      icon: <MessageSquare className="h-4 w-4 text-orange-600" />,
    },
    {
      title: "Likes",
      value: "132",
      change: "+30% from last month",
      icon: <ThumbsUp className="h-4 w-4 text-purple-600" />,
    },
  ]

  // Recent posts data
  const recentPosts = [
    {
      id: 1,
      title: "Getting Started with Next.js 15",
      date: "2024-01-15",
      views: 245,
      comments: 12,
    },
    {
      id: 2,
      title: "The Future of Web Development",
      date: "2024-01-12",
      views: 189,
      comments: 8,
    },
    {
      id: 3,
      title: "Building Responsive Designs",
      date: "2024-01-10",
      views: 156,
      comments: 5,
    },
  ]

  return (
    <div className="w-full space-y-8 px-0">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button asChild className="m-2">
          <Link href="/dashboard/create">Create New Post</Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full">
        {stats.map((stat, i) => (
          <Card key={i} className="w-full">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Posts & Traffic Overview */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 w-full">
        {/* Recent Posts */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Recent Posts</CardTitle>
            <CardDescription>Your most recent blog posts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPosts.map((post) => (
                <div key={post.id} className="flex items-center justify-between border-b pb-4 last:border-0">
                  <div>
                    <Link href={`/dashboard/posts/${post.id}`} className="font-medium hover:underline">
                      {post.title}
                    </Link>
                    <div className="text-sm text-muted-foreground">{new Date(post.date).toLocaleDateString()}</div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      {post.views}
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageSquare className="h-4 w-4" />
                      {post.comments}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <Button variant="outline" asChild>
                <Link href="/dashboard/posts">View All Posts</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Traffic Overview */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Traffic Overview</CardTitle>
            <CardDescription>Your blog traffic for the past 30 days</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center">
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <BarChart3 className="h-16 w-16" />
              <p>Traffic data visualization</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function FileIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  )
}