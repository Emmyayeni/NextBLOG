import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart3, TrendingUp, Users, Eye, MessageSquare, ThumbsUp, Download } from "lucide-react"

export default function AnalyticsPage() {
  const analyticsData = {
    overview: {
      totalViews: 12543,
      totalVisitors: 8921,
      totalComments: 234,
      totalLikes: 1876,
      viewsChange: "+23%",
      visitorsChange: "+18%",
      commentsChange: "+12%",
      likesChange: "+31%",
    },
    topPosts: [
      {
        title: "Getting Started with Next.js 15",
        views: 2543,
        comments: 45,
        likes: 123,
        date: "2024-01-15",
      },
      {
        title: "The Future of Web Development",
        views: 1987,
        comments: 32,
        likes: 98,
        date: "2024-01-12",
      },
      {
        title: "Building Responsive Designs",
        views: 1654,
        comments: 28,
        likes: 87,
        date: "2024-01-10",
      },
      {
        title: "JavaScript Performance Tips",
        views: 1432,
        comments: 21,
        likes: 76,
        date: "2024-01-08",
      },
    ],
    recentActivity: [
      {
        type: "comment",
        user: "John Doe",
        post: "Getting Started with Next.js 15",
        time: "2 hours ago",
      },
      {
        type: "like",
        user: "Jane Smith",
        post: "The Future of Web Development",
        time: "4 hours ago",
      },
      {
        type: "view",
        user: "Anonymous",
        post: "Building Responsive Designs",
        time: "6 hours ago",
      },
      {
        type: "comment",
        user: "Mike Johnson",
        post: "JavaScript Performance Tips",
        time: "8 hours ago",
      },
    ],
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Analytics</h1>
        <div className="flex items-center gap-4 m-2">
          <Select defaultValue="30days">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
              <SelectItem value="1year">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.overview.totalViews.toLocaleString()}</div>
            <p className="text-xs text-green-600 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              {analyticsData.overview.viewsChange} from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Unique Visitors</CardTitle>
            <Users className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.overview.totalVisitors.toLocaleString()}</div>
            <p className="text-xs text-green-600 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              {analyticsData.overview.visitorsChange} from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Comments</CardTitle>
            <MessageSquare className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.overview.totalComments}</div>
            <p className="text-xs text-green-600 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              {analyticsData.overview.commentsChange} from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Likes</CardTitle>
            <ThumbsUp className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.overview.totalLikes}</div>
            <p className="text-xs text-green-600 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              {analyticsData.overview.likesChange} from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Traffic Chart */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Traffic Overview</CardTitle>
            <CardDescription>Daily views for the past 30 days</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center">
            <div className="flex flex-col items-center gap-4 text-muted-foreground">
              <BarChart3 className="h-16 w-16" />
              <div className="text-center">
                <p className="font-medium">Traffic Chart</p>
                <p className="text-sm">Chart visualization would go here</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Top Posts */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Top Performing Posts</CardTitle>
            <CardDescription>Your most popular content</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData.topPosts.map((post, index) => (
                <div key={index} className="flex items-center justify-between border-b pb-4 last:border-0">
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{post.title}</h4>
                    <p className="text-xs text-muted-foreground">{new Date(post.date).toLocaleDateString()}</p>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      {post.views}
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageSquare className="h-3 w-3" />
                      {post.comments}
                    </div>
                    <div className="flex items-center gap-1">
                      <ThumbsUp className="h-3 w-3" />
                      {post.likes}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest interactions with your content</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analyticsData.recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center gap-4 border-b pb-4 last:border-0">
                <div className="flex-shrink-0">
                  {activity.type === "comment" && <MessageSquare className="h-4 w-4 text-blue-600" />}
                  {activity.type === "like" && <ThumbsUp className="h-4 w-4 text-red-600" />}
                  {activity.type === "view" && <Eye className="h-4 w-4 text-green-600" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm">
                    <span className="font-medium">{activity.user}</span> {activity.type === "comment" && "commented on"}
                    {activity.type === "like" && "liked"}
                    {activity.type === "view" && "viewed"} <span className="font-medium">"{activity.post}"</span>
                  </p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
                <Badge variant="outline" className="text-xs">
                  {activity.type}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
