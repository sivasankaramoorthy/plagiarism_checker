"use client"

import { useState, useRef, type ChangeEvent, type FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { ResultsTable } from "./results-table"
import { AlertCircle, FileText, Upload } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Define the type for a paper result
export interface PaperResult {
  id: string
  rank: number
  title: string
  filename: string
  author: string
  year: number
  similarityScore: number
  driveLink: string
  explanation?: string
}

export default function PlagiarismChecker() {
  const [file, setFile] = useState<File | null>(null)
  const [topK, setTopK] = useState<number>(5)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [results, setResults] = useState<PaperResult[]>([])
  const [showExplanations, setShowExplanations] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setError(null)
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      const fileType = selectedFile.type

      // Check if file is PDF or TXT
      if (
        fileType === "application/pdf" ||
        fileType === "text/plain" ||
        selectedFile.name.endsWith(".pdf") ||
        selectedFile.name.endsWith(".txt")
      ) {
        setFile(selectedFile)
      } else {
        setError("Please upload only PDF or TXT files.")
        if (fileInputRef.current) {
          fileInputRef.current.value = ""
        }
      }
    }
  }

  const handleTopKChange = (value: number[]) => {
    setTopK(value[0])
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!file) {
      setError("Please upload a file first.")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      // In a real application, you would send the file to your backend
      // For demo purposes, we'll simulate a response after a delay
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Mock results
      const mockResults: PaperResult[] = Array.from({ length: topK }, (_, i) => ({
        id: `paper-${i + 1}`,
        rank: i + 1,
        title: `Sample Paper ${i + 1}`,
        filename: `paper_${i + 1}.pdf`,
        author: `Author ${i + 1}`,
        year: 2020 + Math.floor(Math.random() * 4),
        similarityScore: Math.round((0.95 - i * 0.08) * 100) / 100,
        driveLink: `https://drive.google.com/file/d/sample${i + 1}`,
        explanation: `This paper shows similarity in the methodology section, particularly in the description of ${
          ["data collection", "analysis techniques", "experimental setup", "literature review", "conclusions"][i % 5]
        }. Several paragraphs on page ${i + 2} match your document with high semantic similarity.`,
      }))

      setResults(mockResults)
    } catch (err) {
      setError("An error occurred while checking for plagiarism. Please try again.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const resetForm = () => {
    setFile(null)
    setResults([])
    setError(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Left side - Interactive illustration */}
            <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg">
              <div className="relative w-full h-48 mb-4">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-primary/20 rounded-full animate-pulse"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <svg
                    className="w-32 h-32 text-primary/70"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M7 18H17V16H7V18Z" fill="currentColor" />
                    <path d="M17 14H7V12H17V14Z" fill="currentColor" />
                    <path d="M7 10H11V8H7V10Z" fill="currentColor" />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M6 2C4.34315 2 3 3.34315 3 5V19C3 20.6569 4.34315 22 6 22H18C19.6569 22 21 20.6569 21 19V9C21 5.13401 17.866 2 14 2H6ZM6 4H13V9H19V19C19 19.5523 18.5523 20 18 20H6C5.44772 20 5 19.5523 5 19V5C5 4.44772 5.44772 4 6 4ZM15 4.10002C16.6113 4.4271 17.9413 5.52906 18.584 7H15V4.10002Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <div
                  className="absolute top-0 right-0 w-16 h-16 bg-primary/10 rounded-full animate-bounce"
                  style={{ animationDuration: "3s", animationDelay: "0.2s" }}
                ></div>
                <div
                  className="absolute bottom-0 left-0 w-12 h-12 bg-primary/15 rounded-full animate-bounce"
                  style={{ animationDuration: "2.5s", animationDelay: "0.5s" }}
                ></div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Advanced Semantic Analysis</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
                Our AI-powered system detects semantic similarities beyond simple text matching, identifying conceptual
                plagiarism.
              </p>
            </div>

            {/* Right side - Enhanced drop box */}
            <div className="relative border-2 border-dashed border-primary/30 dark:border-primary/20 rounded-lg p-6 text-center bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 shadow-sm hover:shadow-md transition-all duration-300 group">
              <div className="absolute inset-0 bg-grid-primary/5 rounded-lg"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <FileText className="h-8 w-8 text-primary group-hover:text-primary/80" />
                </div>
                <div className="mt-4">
                  <input
                    type="file"
                    id="file-upload"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="sr-only"
                    accept=".pdf,.txt,application/pdf,text/plain"
                  />
                  <Label
                    htmlFor="file-upload"
                    className="cursor-pointer inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-200 hover:scale-105"
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Select File
                  </Label>
                </div>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Drag and drop or click to upload PDF or TXT files
                </p>
                {file && (
                  <div className="mt-4 p-3 bg-primary/5 rounded-md border border-primary/10 text-sm text-gray-900 dark:text-gray-100">
                    <div className="font-medium">Selected file:</div>
                    <div className="flex items-center justify-center mt-1">
                      <FileText className="h-4 w-4 mr-2 text-primary" />
                      <span>{file.name}</span>
                      <span className="ml-2 text-xs text-gray-500">({(file.size / 1024).toFixed(2)} KB)</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="top-k" className="text-sm font-medium">
                Number of similar papers to retrieve (Top-K): {topK}
              </Label>
            </div>
            <Slider
              id="top-k"
              min={1}
              max={10}
              step={1}
              value={[topK]}
              onValueChange={handleTopKChange}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>1</span>
              <span>10</span>
            </div>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={resetForm}
              disabled={isLoading || (!file && results.length === 0)}
            >
              Reset
            </Button>
            <Button type="submit" disabled={!file || isLoading}>
              {isLoading ? "Checking..." : "Check Plagiarism"}
            </Button>
          </div>
        </div>
      </form>

      {results.length > 0 && (
        <div className="mt-8 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Results</h2>
            <div className="flex items-center space-x-2">
              <Switch id="show-explanations" checked={showExplanations} onCheckedChange={setShowExplanations} />
              <Label htmlFor="show-explanations">Show Explanations</Label>
            </div>
          </div>

          <ResultsTable results={results} showExplanations={showExplanations} />
        </div>
      )}
    </div>
  )
}

