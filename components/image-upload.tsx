import React from "react"

export function ImageUpload({ onUpload }: { onUpload: (url: string) => void }) {
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const formData = new FormData()
    formData.append("file", file)

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    })

    const data = await res.json()
    if (data.url) {
      onUpload(data.url)
    } else {
      alert("Image upload failed")
    }
  }

  return (
    <input
      type="file"
      accept="image/*"
      onChange={handleFileChange}
    />
  )
}