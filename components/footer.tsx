import Link from 'next/link'
import React from 'react'

export default function footer() {
  return (
    <footer className="bg-muted/30 border-t py-12 px-4 mt-16">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Ayblog
              </h3>
              <p className="text-muted-foreground">
                A modern platform for sharing knowledge, stories, and insights with the world.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="/" className="hover:text-foreground transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/following" className="hover:text-foreground transition-colors">
                    Following
                  </Link>
                </li>
                <li>
                  <Link href="/bookmarks" className="hover:text-foreground transition-colors">
                    Bookmarks
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="hover:text-foreground transition-colors">
                    Dashboard
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Categories</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="/category/development" className="hover:text-foreground transition-colors">
                    Development
                  </Link>
                </li>
                <li>
                  <Link href="/category/design" className="hover:text-foreground transition-colors">
                    Design
                  </Link>
                </li>
                <li>
                  <Link href="/category/technology" className="hover:text-foreground transition-colors">
                    Technology
                  </Link>
                </li>
                <li>
                  <Link href="/category/business" className="hover:text-foreground transition-colors">
                    Business
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Twitter
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    LinkedIn
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    GitHub
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    RSS Feed
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Ayblog. All rights reserved.</p>
          </div>
        </div>
      </footer>
  )
}
