import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, Users, BookOpen, Globe, Target, Lightbulb, Shield, Zap } from "lucide-react"
import Link from "next/link"

const teamMembers = [
  {
    name: "Alex Chen",
    role: "Founder & CEO",
    bio: "Former tech lead at major companies, passionate about democratizing knowledge sharing.",
    avatar: "/placeholder.svg",
  },
  {
    name: "Sarah Kim",
    role: "Head of Product",
    bio: "UX expert focused on creating intuitive experiences for writers and readers.",
    avatar: "/placeholder.svg",
  },
  {
    name: "Mike Rodriguez",
    role: "Lead Engineer",
    bio: "Full-stack developer building scalable platforms for the modern web.",
    avatar: "/placeholder.svg",
  },
  {
    name: "Emily Watson",
    role: "Community Manager",
    bio: "Building and nurturing our amazing community of writers and creators.",
    avatar: "/placeholder.svg",
  },
]

const values = [
  {
    icon: Heart,
    title: "Community First",
    description: "We believe in the power of community and putting our users at the center of everything we do.",
  },
  {
    icon: Lightbulb,
    title: "Knowledge Sharing",
    description: "Making it easy for anyone to share their expertise and learn from others.",
  },
  {
    icon: Shield,
    title: "Quality Content",
    description: "Maintaining high standards for content while fostering creativity and diverse perspectives.",
  },
  {
    icon: Zap,
    title: "Innovation",
    description: "Continuously improving our platform with cutting-edge technology and user feedback.",
  },
]

const stats = [
  { label: "Active Writers", value: "10,000+", icon: Users },
  { label: "Articles Published", value: "50,000+", icon: BookOpen },
  { label: "Monthly Readers", value: "1M+", icon: Globe },
  { label: "Countries Reached", value: "150+", icon: Target },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center py-16">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            About Ayblog
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            We're building the future of knowledge sharing. Ayblog is a platform where passionate writers, developers,
            designers, and creators come together to share insights, learn from each other, and build a better web.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                Join Our Community
              </Button>
            </Link>
            <Link href="/categories">
              <Button size="lg" variant="outline">
                Explore Content
              </Button>
            </Link>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card
                key={index}
                className="text-center border-0 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20"
              >
                <CardContent className="p-6">
                  <div className="flex justify-center mb-3">
                    <stat.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-muted-foreground mb-6">
                At Ayblog, we believe that knowledge should be accessible to everyone. Our mission is to create a
                platform where experts can share their insights, beginners can learn from the best, and everyone can
                contribute to the collective knowledge of our community.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                We're not just building a blogging platform – we're creating a movement that empowers people to share
                their stories, teach others, and build meaningful connections through the power of writing.
              </p>
              <Link href="/authors">
                <Button variant="outline">Meet Our Authors</Button>
              </Link>
            </div>
            <Card className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border-0">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">Why Ayblog?</h3>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                    <span>Clean, distraction-free reading experience</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                    <span>Powerful writing tools for creators</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                    <span>Engaged community of learners and experts</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                    <span>Advanced discovery and recommendation system</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                    <span>Mobile-first design for reading anywhere</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              These core values guide everything we do and shape the culture of our platform.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-full">
                      <value.icon className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We're a passionate team of builders, writers, and dreamers working to make knowledge sharing better for
              everyone.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <Avatar className="w-20 h-20 mx-auto mb-4">
                    <AvatarImage src={member.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="text-lg">
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="text-lg font-semibold mb-1">{member.name}</h3>
                  <Badge variant="secondary" className="mb-3">
                    {member.role}
                  </Badge>
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 border-0 text-white">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Join Our Community?</h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Whether you're here to read, write, or both, we'd love to have you as part of the Ayblog family.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/signup">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                    Start Writing Today
                  </Button>
                </Link>
                <Link href="/home">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-blue-600"
                  >
                    Explore Articles
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Contact Section */}
        <section className="py-16">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Have questions, feedback, or just want to say hello? We'd love to hear from you.
              </p>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">General Inquiries</h4>
                  <p className="text-muted-foreground">hello@ayblog.com</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Support</h4>
                  <p className="text-muted-foreground">support@ayblog.com</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Partnerships</h4>
                  <p className="text-muted-foreground">partnerships@ayblog.com</p>
                </div>
              </div>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Stay Updated</CardTitle>
                <CardDescription>Get the latest news and updates from Ayblog</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email Address</label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <Button className="w-full">Subscribe to Newsletter</Button>
                <p className="text-xs text-muted-foreground">We respect your privacy. Unsubscribe at any time.</p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  )
}
