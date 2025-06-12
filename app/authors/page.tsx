"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MapPin, Calendar, Users, BookOpen, Star, UserPlus, UserCheck } from "lucide-react"
import Link from "next/link"

const authors = [
  {
    id: 1,
    name: "Sarah Johnson",
    username: "@sarahjdev",
    bio: "Frontend developer passionate about React, TypeScript, and modern web technologies. Building the future of web development.",
    avatar: "/placeholder.svg",
    location: "San Francisco, CA",
    joinDate: "2022-03-15",
    followers: 12500,
    following: 89,
    posts: 45,
    likes: 8900,
    specialty: "Frontend Development",
    verified: true,
    isFollowing: false,
    topTags: ["React", "TypeScript", "Next.js", "CSS"],
    featured: true,
  },
  {
    id: 2,
    name: "Mike Chen",
    username: "@mikechen",
    bio: "Full-stack engineer and tech lead. Sharing insights about scalable architecture, DevOps, and team leadership.",
    avatar: "/placeholder.svg",
    location: "Seattle, WA",
    joinDate: "2021-08-22",
    followers: 8900,
    following: 156,
    posts: 52,
    likes: 6700,
    specialty: "Full Stack Development",
    verified: true,
    isFollowing: true,
    topTags: ["Node.js", "AWS", "Docker", "MongoDB"],
    featured: false,
  },
  {
    id: 3,
    name: "Emily Davis",
    username: "@emilydesigns",
    bio: "UX/UI designer focused on creating intuitive and accessible digital experiences. Design systems enthusiast.",
    avatar: "/placeholder.svg",
    location: "New York, NY",
    joinDate: "2022-01-10",
    followers: 15200,
    following: 234,
    posts: 38,
    likes: 12300,
    specialty: "UI/UX Design",
    verified: true,
    isFollowing: false,
    topTags: ["Design Systems", "Figma", "UX Research", "Accessibility"],
    featured: true,
  },
  {
    id: 4,
    name: "Alex Rodriguez",
    username: "@alexperf",
    bio: "Performance engineer obsessed with making the web faster. Sharing tips on optimization and web vitals.",
    avatar: "/placeholder.svg",
    location: "Austin, TX",
    joinDate: "2021-11-05",
    followers: 7300,
    following: 67,
    posts: 29,
    likes: 4500,
    specialty: "Performance Engineering",
    verified: false,
    isFollowing: false,
    topTags: ["Performance", "Web Vitals", "JavaScript", "Optimization"],
    featured: false,
  },
  {
    id: 5,
    name: "Dr. Lisa Wang",
    username: "@lisawang_ai",
    bio: "AI researcher and machine learning engineer. Making AI accessible through practical tutorials and insights.",
    avatar: "/placeholder.svg",
    location: "Boston, MA",
    joinDate: "2020-06-18",
    followers: 18700,
    following: 123,
    posts: 67,
    likes: 23400,
    specialty: "AI/Machine Learning",
    verified: true,
    isFollowing: false,
    topTags: ["Machine Learning", "Python", "TensorFlow", "AI Ethics"],
    featured: true,
  },
  {
    id: 6,
    name: "David Kim",
    username: "@davidcss",
    bio: "CSS wizard and frontend architect. Exploring the latest in CSS, animations, and modern layout techniques.",
    avatar: "/placeholder.svg",
    location: "Los Angeles, CA",
    joinDate: "2022-09-12",
    followers: 5600,
    following: 89,
    posts: 34,
    likes: 3200,
    specialty: "CSS & Animations",
    verified: false,
    isFollowing: false,
    topTags: ["CSS", "Animations", "SASS", "Web Design"],
    featured: false,
  },
]

const specialties = [
  "All Specialties",
  "Frontend Development",
  "Full Stack Development",
  "UI/UX Design",
  "Performance Engineering",
  "AI/Machine Learning",
  "CSS & Animations",
]

export default function AuthorsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSpecialty, setSelectedSpecialty] = useState("All Specialties")
  const [sortBy, setSortBy] = useState("followers")
  const [following, setFollowing] = useState(new Set([2])) // Mike Chen is followed

  const filteredAuthors = authors.filter((author) => {
    const matchesSearch =
      author.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      author.bio.toLowerCase().includes(searchTerm.toLowerCase()) ||
      author.topTags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesSpecialty = selectedSpecialty === "All Specialties" || author.specialty === selectedSpecialty
    return matchesSearch && matchesSpecialty
  })

  const sortedAuthors = [...filteredAuthors].sort((a, b) => {
    switch (sortBy) {
      case "followers":
        return b.followers - a.followers
      case "posts":
        return b.posts - a.posts
      case "likes":
        return b.likes - a.likes
      case "recent":
        return new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime()
      default:
        return 0
    }
  })

  const featuredAuthors = authors.filter((author) => author.featured)

  const toggleFollow = (authorId: number) => {
    setFollowing((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(authorId)) {
        newSet.delete(authorId)
      } else {
        newSet.add(authorId)
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
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">Discover Amazing Authors</h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Connect with talented writers, developers, and creators sharing their knowledge and expertise.
              </p>
            </div>

            {/* Featured Authors */}
            <section>
              <h2 className="text-2xl font-bold mb-6">Featured Authors</h2>
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {featuredAuthors.map((author) => (
                  <Card key={author.id} className="text-center hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="relative mb-4">
                        <Avatar className="w-20 h-20 mx-auto">
                          <AvatarImage src={author.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="text-2xl">
                            {author.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        {author.verified && (
                          <div className="absolute -top-1 -right-1 bg-blue-500 text-white rounded-full p-1">
                            <Star className="h-3 w-3" />
                          </div>
                        )}
                      </div>
                      <h3 className="font-semibold text-lg mb-1">{author.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{author.specialty}</p>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{author.bio}</p>
                      <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground mb-4">
                        <span>{author.followers.toLocaleString()} followers</span>
                        <span>{author.posts} posts</span>
                      </div>
                      <Button
                        size="sm"
                        variant={following.has(author.id) ? "outline" : "default"}
                        onClick={() => toggleFollow(author.id)}
                        className="w-full"
                      >
                        {following.has(author.id) ? (
                          <>
                            <UserCheck className="h-4 w-4 mr-2" />
                            Following
                          </>
                        ) : (
                          <>
                            <UserPlus className="h-4 w-4 mr-2" />
                            Follow
                          </>
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Search and Filter */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Search authors by name, bio, or expertise..."
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                    <SelectTrigger className="w-full md:w-[200px]">
                      <SelectValue placeholder="Filter by specialty" />
                    </SelectTrigger>
                    <SelectContent>
                      {specialties.map((specialty) => (
                        <SelectItem key={specialty} value={specialty}>
                          {specialty}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-full md:w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="followers">Most Followers</SelectItem>
                      <SelectItem value="posts">Most Posts</SelectItem>
                      <SelectItem value="likes">Most Liked</SelectItem>
                      <SelectItem value="recent">Recently Joined</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* All Authors */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">All Authors</h2>
                <Badge variant="outline">{sortedAuthors.length} authors</Badge>
              </div>
              <div className="space-y-6">
                {sortedAuthors.length > 0 ? (
                  sortedAuthors.map((author) => (
                    <Card key={author.id} className="hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="relative">
                            <Avatar className="w-16 h-16">
                              <AvatarImage src={author.avatar || "/placeholder.svg"} />
                              <AvatarFallback className="text-lg">
                                {author.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            {author.verified && (
                              <div className="absolute -top-1 -right-1 bg-blue-500 text-white rounded-full p-1">
                                <Star className="h-3 w-3" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <div>
                                <h3 className="text-xl font-semibold">{author.name}</h3>
                                <p className="text-sm text-muted-foreground">{author.username}</p>
                              </div>
                              <Button
                                variant={following.has(author.id) ? "outline" : "default"}
                                onClick={() => toggleFollow(author.id)}
                              >
                                {following.has(author.id) ? (
                                  <>
                                    <UserCheck className="h-4 w-4 mr-2" />
                                    Following
                                  </>
                                ) : (
                                  <>
                                    <UserPlus className="h-4 w-4 mr-2" />
                                    Follow
                                  </>
                                )}
                              </Button>
                            </div>
                            <p className="text-muted-foreground mb-3">{author.bio}</p>
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                              <div className="flex items-center space-x-1">
                                <MapPin className="w-4 h-4" />
                                <span>{author.location}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Calendar className="w-4 h-4" />
                                <span>Joined {new Date(author.joinDate).toLocaleDateString()}</span>
                              </div>
                            </div>
                            <div className="flex items-center space-x-6 text-sm text-muted-foreground mb-4">
                              <div className="flex items-center space-x-1">
                                <Users className="w-4 h-4" />
                                <span>{author.followers.toLocaleString()} followers</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <BookOpen className="w-4 h-4" />
                                <span>{author.posts} posts</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Star className="w-4 h-4" />
                                <span>{author.likes.toLocaleString()} likes</span>
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {author.topTags.map((tag, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <Card className="p-12 text-center">
                    <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">No authors found</h3>
                    <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
                  </Card>
                )}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Specialties</CardTitle>
                <CardDescription>Most popular author specialties</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {specialties.slice(1).map((specialty, index) => {
                  const count = authors.filter((author) => author.specialty === specialty).length
                  return (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm">{specialty}</span>
                      <Badge variant="outline">{count}</Badge>
                    </div>
                  )
                })}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Community Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Total Authors</span>
                  <Badge variant="outline">{authors.length}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Verified Authors</span>
                  <Badge variant="outline">{authors.filter((a) => a.verified).length}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Total Posts</span>
                  <Badge variant="outline">{authors.reduce((sum, a) => sum + a.posts, 0)}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Total Followers</span>
                  <Badge variant="outline">
                    {(authors.reduce((sum, a) => sum + a.followers, 0) / 1000).toFixed(1)}K
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Discover More</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link href="/categories">
                  <Button variant="outline" className="w-full justify-start">
                    Browse Categories
                  </Button>
                </Link>
                <Link href="/trending">
                  <Button variant="outline" className="w-full justify-start">
                    Trending Topics
                  </Button>
                </Link>
                <Link href="/following">
                  <Button variant="outline" className="w-full justify-start">
                    Your Following
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
