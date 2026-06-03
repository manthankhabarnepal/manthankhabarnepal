"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft, Save, Eye, Loader2, Upload, X } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { createClient } from "@/lib/supabase/client"
import { put } from "@vercel/blob"

const categories = [
  "general",
  "politics",
  "business",
  "sports",
  "crime",
  "technology",
  "health",
  "economy",
  "world",
]

export default function NewArticlePage() {
  const [title, setTitle] = useState("")
  const [excerpt, setExcerpt] = useState("")
  const [content, setContent] = useState("")
  const [category, setCategory] = useState("general")
  const [imageUrl, setImageUrl] = useState("")
  const [authorName, setAuthorName] = useState("")
  const [published, setPublished] = useState(false)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const router = useRouter()

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    setError(null)

    try {
      const filename = `articles/${Date.now()}-${file.name}`
      const blob = await put(filename, file, {
        access: "public",
      })
      setImageUrl(blob.url)
      setImagePreview(blob.url)
    } catch (err) {
      setError(`छवि अपलोड विफल: ${err instanceof Error ? err.message : "Unknown error"}`)
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError(null)

    const supabase = createClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      setError("तपाईं लेख सिर्जना गर्न लग इन हुनु पर्छ।")
      setSaving(false)
      return
    }

    const { error: insertError } = await supabase.from("news_articles").insert({
      title,
      excerpt: excerpt || title.substring(0, 150),
      content,
      category,
      image_url: imageUrl || null,
      author_name: authorName || null,
      author_id: user.id,
      published,
    })

    if (insertError) {
      setError(insertError.message)
      setSaving(false)
      return
    }

    router.push("/staff/dashboard/articles")
    router.refresh()
  }

  return (
    <div className="p-6 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Link href="/staff/dashboard/articles">
          <Button variant="ghost" size="sm" className="mb-6 -ml-2">
            <ArrowLeft className="h-4 w-4 mr-2" />
            लेखहरूमा फर्कनुहोस्
          </Button>
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">नयाँ लेख</h1>
          <p className="text-muted-foreground">नयाँ समाचार लेख सिर्जना गर्नुहोस्</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle>लेख सामग्री</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {error && (
                    <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm">
                      {error}
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="title">शीर्षक *</Label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="लेखको शीर्षक प्रविष्ट गर्नुहोस्..."
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="excerpt">सारांश</Label>
                    <Textarea
                      id="excerpt"
                      value={excerpt}
                      onChange={(e) => setExcerpt(e.target.value)}
                      placeholder="लेखको संक्षिप्त सारांश..."
                      rows={2}
                    />
                    <p className="text-xs text-muted-foreground">
                      वैकल्पिक। खाली भएमा शीर्षक प्रयोग गरिनेछ।
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="content">सामग्री *</Label>
                    <Textarea
                      id="content"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="यहाँ आफ्नो लेख सामग्री लेख्नुहोस्..."
                      rows={15}
                      required
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle>प्रकाशन</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="published">प्रकाशित</Label>
                      <p className="text-xs text-muted-foreground">
                        यो लेख सार्वजनिक गर्नुहोस्
                      </p>
                    </div>
                    <Switch
                      id="published"
                      checked={published}
                      onCheckedChange={setPublished}
                    />
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button
                      type="submit"
                      disabled={saving || uploading}
                      className="flex-1"
                    >
                      {saving ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          सुरक्षित गर्दै...
                        </>
                      ) : (
                        <>
                          <Save className="h-4 w-4 mr-2" />
                          {published ? "प्रकाशित गर्नुहोस्" : "ड्राफ्ट सुरक्षित गर्नुहोस्"}
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle>विवरण</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">विषय</Label>
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat} value={cat} className="capitalize">
                            {cat === 'general' ? 'सामान्य' :
                             cat === 'politics' ? 'राजनीति' :
                             cat === 'business' ? 'व्यापार' :
                             cat === 'sports' ? 'खेलकुद' :
                             cat === 'crime' ? 'अपराध' :
                             cat === 'technology' ? 'प्रविधि' :
                             cat === 'health' ? 'स्वास्थ्य' :
                             cat === 'economy' ? 'अर्थ' :
                             cat === 'world' ? 'विश्व' : cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="author">लेखकको नाम</Label>
                    <Input
                      id="author"
                      value={authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
                      placeholder="लेखकको नाम..."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>छवि</Label>
                    {imagePreview ? (
                      <div className="relative rounded-lg overflow-hidden border border-border">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-40 object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setImageUrl("")
                            setImagePreview(null)
                          }}
                          className="absolute top-2 right-2 p-1 bg-destructive text-white rounded hover:bg-destructive/90"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <label className="flex flex-col items-center justify-center border-2 border-dashed border-border rounded-lg p-6 cursor-pointer hover:border-primary transition-colors">
                        <Upload className="h-6 w-6 text-muted-foreground mb-2" />
                        <span className="text-sm text-muted-foreground text-center">
                          {uploading ? "अपलोड हुँदैछ..." : "छवि अपलोड गर्नुहोस्"}
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          disabled={uploading}
                          className="hidden"
                        />
                      </label>
                    )}
                    <p className="text-xs text-muted-foreground">
                      वा यहाँ प्रत्यक्ष URL पेस्ट गर्नुहोस्:
                    </p>
                    <Input
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      placeholder="https://example.com/image.jpg"
                      type="url"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  )
}
