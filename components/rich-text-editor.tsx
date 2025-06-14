"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Heading1,
  Heading2,
  LinkIcon,
  ImageIcon,
  Code,
  Quote,
} from "lucide-react"

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
}

export function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  const [isMounted, setIsMounted] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [hasSetInitial, setHasSetInitial] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Set initial value only once
  useEffect(() => {
    if (editorRef.current && !hasSetInitial) {
      editorRef.current.innerHTML = value
      setHasSetInitial(true)
    }
  }, [value, hasSetInitial])

  // Update value from outside only if not focused
  useEffect(() => {
    if (
      editorRef.current &&
      !isFocused &&
      editorRef.current.innerHTML !== value
    ) {
      editorRef.current.innerHTML = value
    }
  }, [value, isFocused])

  const handleContentChange = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML)
    }
  }

  const execCommand = (command: string, value = "") => {
    document.execCommand(command, false, value)
    handleContentChange()
    if (editorRef.current) {
      editorRef.current.focus()
    }
  }

  const handleLinkInsert = () => {
    const url = prompt("Enter URL:", "https://")
    if (url) {
      execCommand("createLink", url)
    }
  }

  const handleImageInsert = () => {
    const url = prompt("Enter image URL:", "https://")
    if (url) {
      execCommand("insertImage", url)
    }
  }

  if (!isMounted) {
    return <div className="h-[400px] border rounded-md p-4 bg-gray-50"></div>
  }

  return (
    <div className="space-y-2 ">
      <div className="flex flex-wrap gap-1 border rounded-md p-2 bg-background">
        <Button variant="ghost" size="icon" onClick={() => execCommand("bold")} title="Bold" type="button">
          <Bold className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => execCommand("italic")} title="Italic" type="button">
          <Italic className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => execCommand("underline")} title="Underline" type="button">
          <Underline className="h-4 w-4" />
        </Button>
        <div className="w-px h-6 bg-gray-300 mx-1" />
        <Button
          variant="ghost"
          size="icon"
          onClick={() => execCommand("formatBlock", "<h1>")}
          title="Heading 1"
          type="button"
        >
          <Heading1 className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => execCommand("formatBlock", "<h2>")}
          title="Heading 2"
          type="button"
        >
          <Heading2 className="h-4 w-4" />
        </Button>
        <div className="w-px h-6 bg-gray-300 mx-1" />
        <Button
          variant="ghost"
          size="icon"
          onClick={() => execCommand("insertUnorderedList")}
          title="Bullet List"
          type="button"
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => execCommand("insertOrderedList")}
          title="Numbered List"
          type="button"
        >
          <ListOrdered className="h-4 w-4" />
        </Button>
        <div className="w-px h-6 bg-gray-300 mx-1" />
        <Button variant="ghost" size="icon" onClick={() => execCommand("justifyLeft")} title="Align Left" type="button">
          <AlignLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => execCommand("justifyCenter")}
          title="Align Center"
          type="button"
        >
          <AlignCenter className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => execCommand("justifyRight")}
          title="Align Right"
          type="button"
        >
          <AlignRight className="h-4 w-4" />
        </Button>
        <div className="w-px h-6 bg-gray-300 mx-1" />
        <Button variant="ghost" size="icon" onClick={handleLinkInsert} title="Insert Link" type="button">
          <LinkIcon className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={handleImageInsert} title="Insert Image" type="button">
          <ImageIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => execCommand("formatBlock", "<pre>")}
          title="Code Block"
          type="button"
        >
          <Code className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => execCommand("formatBlock", "<blockquote>")}
          title="Quote"
          type="button"
        >
          <Quote className="h-4 w-4" />
        </Button>
      </div>
      <div
        ref={editorRef}
        className="min-h-[400px] border rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-left"
        contentEditable
        dir="ltr"
        onInput={handleContentChange}
        onBlur={() => {
          setIsFocused(false)
          handleContentChange()
        }}
        onFocus={() => setIsFocused(true)}
      />
    </div>
  )
}