"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, Clock, User, ArrowRight, Star, TrendingUp, Users, BookOpen } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import footer from "@/components/footer"
// import logo from "public/logo.svg" // Removed, use string path instead
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
    likes: 87,
    comments: 12,
  },
]

const featuredAuthors = [
  { name: "Sarah Johnson", followers: "12.5K", avatar: "/placeholder.svg", specialty: "Frontend Development" },
  { name: "Mike Chen", followers: "8.9K", avatar: "/placeholder.svg", specialty: "Full Stack" },
  { name: "Emily Davis", followers: "15.2K", avatar: "/placeholder.svg", specialty: "UI/UX Design" },
  { name: "Alex Rodriguez", followers: "7.3K", avatar: "/placeholder.svg", specialty: "Performance" },
]

const stats = [
  { label: "Active Writers", value: "10K+", icon: Users },
  { label: "Articles Published", value: "50K+", icon: BookOpen },
  { label: "Monthly Readers", value: "1M+", icon: TrendingUp },
  { label: "Community Rating", value: "4.9", icon: Star },
]

export default function LoggedOutHomePage() {
  const featuredPost = blogPosts.find((post) => post.featured)
  const regularPosts = blogPosts.filter((post) => !post.featured).slice(0, 4)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Header */}
      <header className="border-b bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
             <Link
                href="/"
                className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
              >
              <img src="/logo.png" alt="Ayblog Logo" className=" inline-block p-0 m-0" width="50px" height="50px" />
              Ayblog
            </Link> 
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                href="/home"
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                Home
              </Link>
              <Link
                href="/categories"
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                Categories
              </Link>
              <Link
                href="/authors"
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                Authors
              </Link>
              <Link
                href="/about"
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                About
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Link href="/login">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link href="/signup">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 dark:from-white dark:via-blue-100 dark:to-purple-100 bg-clip-text text-transparent">
            Welcome to Ayblog
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Discover amazing stories, insights, and knowledge from our community of passionate writers and creators.
            Join thousands of readers exploring the future of technology, design, and innovation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/signup">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                Start Reading Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="#featured">
              <Button size="lg" variant="outline">
                Explore Articles
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-2">
                  <stat.icon className="h-8 w-8 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section id="featured" className="py-16 px-4">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">Featured Article</h2>
            <Card className="overflow-hidden shadow-2xl border-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
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
                <div className="md:w-1/2 p-8">
                  <Badge className="mb-4 bg-gradient-to-r from-blue-600 to-purple-600">{featuredPost.category}</Badge>
                  <CardHeader className="p-0 mb-4">
                    <CardTitle className="text-3xl mb-2 text-gray-900 dark:text-white">
                      <Link
                        href={`/post/${featuredPost.id}`}
                        className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      >
                        {featuredPost.title}
                      </Link>
                    </CardTitle>
                    <CardDescription className="text-lg text-gray-600 dark:text-gray-300">
                      {featuredPost.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-6">
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
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                      <span>{featuredPost.likes} likes</span>
                      <span>{featuredPost.comments} comments</span>
                    </div>
                  </div>
                  <Link href={`/post/${featuredPost.id}`}>
                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                      Read Article
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          </div>
        </section>
      )}

      {/* Recent Posts */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Latest Articles</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Explore our latest collection of articles covering technology, design, development, and more.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
            {regularPosts.map((post) => (
              <Card
                key={post.id}
                className="overflow-hidden hover:shadow-xl transition-all duration-300 border-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm group"
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    width={400}
                    height={200}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-4 left-4 bg-gradient-to-r from-blue-600 to-purple-600">
                    {post.category}
                  </Badge>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl mb-2 text-gray-900 dark:text-white">
                    <Link
                      href={`/post/${post.id}`}
                      className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      {post.title}
                    </Link>
                  </CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-300">{post.excerpt}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
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
                    <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                      <span>{post.likes} likes</span>
                      <span>{post.comments} comments</span>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(post.date).toLocaleDateString()}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center">
            <Link href="/signup">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                Join to Read More
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Authors */}
      <section className="py-16 px-4 bg-white/50 dark:bg-slate-900/50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Featured Authors</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Meet some of our most talented writers and thought leaders in the tech community.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredAuthors.map((author, index) => (
              <Card
                key={index}
                className="text-center p-6 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-0 hover:shadow-lg transition-all duration-300"
              >
                <Avatar className="w-16 h-16 mx-auto mb-4">
                  <AvatarImage src={author.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="text-lg">
                    {author.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{author.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{author.specialty}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{author.followers} followers</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Start Your Journey?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of readers and writers who are already part of the Ayblog community. Start reading, writing,
            and connecting today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                Create Free Account
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/login">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600"
              >
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
    <footer />
    </div>
  )
}
