import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookOpen, Code, Palette, Briefcase, Cpu, Smartphone, Globe, TrendingUp } from "lucide-react"
import Link from "next/link"

const categories = [
  {
    name: "Development",
    slug: "development",
    description: "Web development, programming languages, frameworks, and coding best practices",
    icon: Code,
    postCount: 234,
    color: "bg-blue-500",
    trending: true,
    subcategories: ["Frontend", "Backend", "Full Stack", "DevOps", "Mobile"],
  },
  {
    name: "Design",
    slug: "design",
    description: "UI/UX design, visual design, design systems, and creative processes",
    icon: Palette,
    postCount: 156,
    color: "bg-purple-500",
    trending: false,
    subcategories: ["UI Design", "UX Research", "Graphic Design", "Branding", "Typography"],
  },
  {
    name: "Technology",
    slug: "technology",
    description: "Latest tech trends, emerging technologies, and industry insights",
    icon: Cpu,
    postCount: 189,
    color: "bg-green-500",
    trending: true,
    subcategories: ["AI/ML", "Blockchain", "IoT", "Cloud Computing", "Cybersecurity"],
  },
  {
    name: "Business",
    slug: "business",
    description: "Entrepreneurship, startup advice, business strategy, and leadership",
    icon: Briefcase,
    postCount: 98,
    color: "bg-orange-500",
    trending: false,
    subcategories: ["Startups", "Marketing", "Finance", "Leadership", "Strategy"],
  },
  {
    name: "Mobile",
    slug: "mobile",
    description: "Mobile app development, iOS, Android, and mobile design patterns",
    icon: Smartphone,
    postCount: 87,
    color: "bg-pink-500",
    trending: false,
    subcategories: ["iOS", "Android", "React Native", "Flutter", "Mobile UX"],
  },
  {
    name: "Web",
    slug: "web",
    description: "Web technologies, browser APIs, performance, and web standards",
    icon: Globe,
    postCount: 145,
    color: "bg-cyan-500",
    trending: true,
    subcategories: ["HTML/CSS", "JavaScript", "Web APIs", "Performance", "Accessibility"],
  },
]

const trendingTopics = [
  { name: "Next.js 15", posts: 23, growth: "+15%" },
  { name: "AI Integration", posts: 45, growth: "+32%" },
  { name: "Design Systems", posts: 34, growth: "+8%" },
  { name: "Web Performance", posts: 18, growth: "+22%" },
  { name: "TypeScript", posts: 56, growth: "+12%" },
]

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">Explore Categories</h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Discover articles organized by topics that interest you most. From development to design, find expert
                insights and practical knowledge.
              </p>
            </div>

            {/* Categories Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {categories.map((category) => (
                <Card key={category.slug} className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${category.color} text-white`}>
                          <category.icon className="h-6 w-6" />
                        </div>
                        <div>
                          <CardTitle className="text-xl group-hover:text-primary transition-colors">
                            {category.name}
                          </CardTitle>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge variant="outline">{category.postCount} articles</Badge>
                            {category.trending && (
                              <Badge className="bg-green-500 hover:bg-green-600">
                                <TrendingUp className="h-3 w-3 mr-1" />
                                Trending
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <CardDescription className="text-base">{category.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium mb-2">Popular Topics:</h4>
                        <div className="flex flex-wrap gap-2">
                          {category.subcategories.slice(0, 4).map((sub, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {sub}
                            </Badge>
                          ))}
                          {category.subcategories.length > 4 && (
                            <Badge variant="outline" className="text-xs">
                              +{category.subcategories.length - 4} more
                            </Badge>
                          )}
                        </div>
                      </div>
                      <Link href={`/category/${category.slug}`}>
                        <Button className="w-full">
                          <BookOpen className="h-4 w-4 mr-2" />
                          Explore {category.name}
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Featured Categories */}
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border-0">
              <CardHeader>
                <CardTitle className="text-2xl">Most Popular This Month</CardTitle>
                <CardDescription>Categories with the highest engagement</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  {categories
                    .filter((cat) => cat.trending)
                    .map((category) => (
                      <Link key={category.slug} href={`/category/${category.slug}`}>
                        <Card className="hover:shadow-md transition-all duration-300 cursor-pointer">
                          <CardContent className="p-4 text-center">
                            <div className={`inline-flex p-3 rounded-full ${category.color} text-white mb-3`}>
                              <category.icon className="h-6 w-6" />
                            </div>
                            <h3 className="font-semibold mb-1">{category.name}</h3>
                            <p className="text-sm text-muted-foreground">{category.postCount} articles</p>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Trending Topics
                </CardTitle>
                <CardDescription>Hot topics this week</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {trendingTopics.map((topic, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <Link
                        href={`/topic/${topic.name.toLowerCase()}`}
                        className="font-medium hover:text-primary transition-colors"
                      >
                        #{topic.name}
                      </Link>
                      <p className="text-sm text-muted-foreground">{topic.posts} posts</p>
                    </div>
                    <Badge variant="outline" className="text-green-600">
                      {topic.growth}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Browse by Interest</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  🔥 Most Popular
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  ⭐ Editor's Choice
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  📈 Trending Now
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  🆕 Recently Added
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Total Categories</span>
                  <Badge variant="outline">{categories.length}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Total Articles</span>
                  <Badge variant="outline">{categories.reduce((sum, cat) => sum + cat.postCount, 0)}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Trending Categories</span>
                  <Badge variant="outline">{categories.filter((cat) => cat.trending).length}</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
