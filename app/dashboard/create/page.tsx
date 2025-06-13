"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RichTextEditor } from "@/components/rich-text-editor"
import { ImageUpload } from "@/components/image-upload"
import { useSession } from "next-auth/react"

interface Category {
  id: string;
  name: string;
}

export default function CreatePostPage() {
  const [postContent, setPostContent] = useState("")
  const [previewMode, setPreviewMode] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])
  const [error,seterror] = useState<string | null>(null)
  const [success,setsuccess] = useState<string | null>(null)
  const {data:session} = useSession()

  useEffect(() => {
    fetch("/api/categories")
      .then(res => res.json())
      .then(setCategories)
  }, [])
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    category: "",
    tags: "",
    featured: false,
    published: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [imageUrl, setImageUrl] = useState<string | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleImageUpload = (url: string) => {
    setImageUrl(url)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      // Find the selected category object to get its ID
      const selectedCategory = categories.find(cat => cat.name === formData.category)
      const categoryIds = selectedCategory ? [selectedCategory.id] : []

      await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formData.title,
          excerpt: formData.excerpt,
          content: postContent,
          author: session?.user?.id, // Replace with actual user ID
          featuredImage: imageUrl,
          featured: formData.featured,
          published: formData.published,
          tags: formData.tags,
          categories: categoryIds,
        }),
      })
      setFormData({
        title: "",
        excerpt: "",
        category: "",
        tags: "",
        featured: false,
        published: false,
      })
      setPostContent("")
      setImageUrl(null)
    } catch (error) {
      // Handle error
      console.error("Failed to create post:", error)
      seterror("Failed to create post. Please try again.")
    } finally {
      setIsSubmitting(false)
      // Optionally, you can show a success message
      setsuccess("Post created successfully!")
    }
  }

  const handleSaveDraft = async () => {
  setIsSubmitting(true)
  try {
    // Find the selected category object to get its ID
    const selectedCategory = categories.find(cat => cat.name === formData.category)
    const categoryIds = selectedCategory ? [selectedCategory.id] : []

    await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: formData.title,
        excerpt: formData.excerpt,
        content: postContent,
        author: 1, // Replace with actual user ID
        featuredImage: imageUrl,
        featured: formData.featured,
        published: false, // Always save as draft
        tags: formData.tags,
        categories: categoryIds,
      }),
    })
    setFormData({
      title: "",
      excerpt: "",
      category: "",
      tags: "",
      featured: false,
      published: false,
    })
    setPostContent("")
    setImageUrl(null)
    setsuccess("Draft saved successfully!")
  } catch (error) {
    seterror("Failed to save draft. Please try again.")
  } finally {
    setIsSubmitting(false)
  }
}

  return (
    <div className="space-y-6 w-full px-0">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Create New Post</h1>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            type="button"
            onClick={() => setPreviewMode(!previewMode)}
          >
            {previewMode ? "Edit" : "Preview"}
          </Button>
          <Button
            type="submit"
            form="create-post-form"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Publishing..." : "Publish"}
          </Button>
        </div>
      </div>
      {error && <div className="text-red-500">{error}</div>}
      {success && <div className="text-green-500">{success}</div>}
      <form id="create-post-form" onSubmit={handleSubmit}>
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Post Details</CardTitle>
              <CardDescription>Enter the basic information about your blog post.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Enter post title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea
                  id="excerpt"
                  name="excerpt"
                  placeholder="Brief summary of your post"
                  value={formData.excerpt}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(val) => handleSelectChange("category", val)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(cat => (
                        <SelectItem key={cat.id} value={cat.name}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tags">Tags</Label>
                  <Input
                    id="tags"
                    name="tags"
                    placeholder="Enter tags separated by commas"
                    value={formData.tags}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Featured Image</CardTitle>
              <CardDescription>Upload a high-quality image for your blog post.</CardDescription>
            </CardHeader>
            <CardContent>
              <ImageUpload onUpload={handleImageUpload} />
              {imageUrl && (
                <div className="mt-2">
                  <img src={imageUrl} alt="Featured" className="max-h-48 rounded" />
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Content</CardTitle>
              <CardDescription>Write your blog post content.</CardDescription>
            </CardHeader>
            <CardContent className="!p-0 bg-background">
              <div className="w-full">
                {previewMode ? (
                  <div className="prose max-w-none border rounded-md p-4 min-h-[400px]">
                    {postContent ? (
                      <div dangerouslySetInnerHTML={{ __html: postContent }} />
                    ) : (
                      <p className="text-muted-foreground">No content to preview</p>
                    )}
                  </div>
                ) : (
                  <Tabs defaultValue="write" className="w-full bg-background">
                    <TabsList className="mb-4 w-full">
                      <TabsTrigger value="write" className="flex-1 w-1/2">Write</TabsTrigger>
                      <TabsTrigger value="preview" className="flex-1 w-1/2">Preview</TabsTrigger>
                    </TabsList>
                    <TabsContent value="write" className="min-h-[400px] w-full bg-backround">
                      <RichTextEditor value={postContent} onChange={setPostContent} />
                    </TabsContent>
                    <TabsContent value="preview" className="min-h-[400px] w-full">
                      <div className="prose max-w-none border rounded-md p-4 min-h-[400px]">
                        {postContent ? (
                          <div dangerouslySetInnerHTML={{ __html: postContent }} />
                        ) : (
                          <p className="text-muted-foreground">No content to preview</p>
                        )}
                      </div>
                    </TabsContent>
                  </Tabs>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Publishing Options</CardTitle>
              <CardDescription>Configure how your post will be published.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="featured">Featured Post</Label>
                  <p className="text-sm text-muted-foreground">
                    Featured posts appear on the homepage in a prominent position.
                  </p>
                </div>
                <Switch
                  id="featured"
                  checked={formData.featured}
                  onCheckedChange={(checked) => handleSwitchChange("featured", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="published">Publish Immediately</Label>
                  <p className="text-sm text-muted-foreground">If turned off, the post will be saved as a draft.</p>
                </div>
                <Switch
                  id="published"
                  checked={formData.published}
                  onCheckedChange={(checked) => handleSwitchChange("published", checked)}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                type="button"
                onClick={handleSaveDraft}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving..." : "Save as Draft"}
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Publishing..." : "Publish Post"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </form>
    </div>
  )
}