"use client"

import { type ChangeEvent, useRef } from "react"
import { Label } from "@/components/ui/label"
import { FileText, Upload } from "lucide-react"

interface FileUploaderProps {
  onFileChange: (e: ChangeEvent<HTMLInputElement>) => void
  file: File | null
}

export function FileUploader({ onFileChange, file }: FileUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  return (
    <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-6 text-center">
      <FileText className="mx-auto h-12 w-12 text-gray-400" />
      <div className="mt-4">
        <input
          type="file"
          id="file-upload"
          ref={fileInputRef}
          onChange={onFileChange}
          className="sr-only"
          accept=".pdf,.txt,application/pdf,text/plain"
        />
        <Label
          htmlFor="file-upload"
          className="cursor-pointer inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          <Upload className="mr-2 h-4 w-4" />
          Select File
        </Label>
      </div>
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">PDF or TXT files only</p>
      {file && (
        <div className="mt-4 text-sm text-gray-900 dark:text-gray-100">
          Selected file: <span className="font-medium">{file.name}</span> ({(file.size / 1024).toFixed(2)} KB)
        </div>
      )}
    </div>
  )
}

