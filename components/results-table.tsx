"use client"

import { useState } from "react"
import type { PaperResult } from "./plagiarism-checker"
import { ExternalLink } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ExplanationPanel } from "./explanation-panel"

interface ResultsTableProps {
  results: PaperResult[]
  showExplanations: boolean
}

export function ResultsTable({ results, showExplanations }: ResultsTableProps) {
  const [expandedRow, setExpandedRow] = useState<string | null>(null)

  const toggleRow = (id: string) => {
    if (expandedRow === id) {
      setExpandedRow(null)
    } else {
      setExpandedRow(id)
    }
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">Rank</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Filename</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Year</TableHead>
            <TableHead className="text-right">Similarity</TableHead>
            <TableHead className="w-20">Link</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {results.map((paper) => (
            <>
              <TableRow
                key={paper.id}
                className={paper.similarityScore > 0.7 ? "bg-red-50 dark:bg-red-900/20" : ""}
                onClick={() => showExplanations && toggleRow(paper.id)}
                style={{ cursor: showExplanations ? "pointer" : "default" }}
              >
                <TableCell className="font-medium">{paper.rank}</TableCell>
                <TableCell>{paper.title}</TableCell>
                <TableCell>{paper.filename}</TableCell>
                <TableCell>{paper.author}</TableCell>
                <TableCell>{paper.year}</TableCell>
                <TableCell className="text-right">
                  <span
                    className={`font-medium ${
                      paper.similarityScore > 0.7
                        ? "text-red-600 dark:text-red-400"
                        : paper.similarityScore > 0.5
                          ? "text-yellow-600 dark:text-yellow-400"
                          : "text-green-600 dark:text-green-400"
                    }`}
                  >
                    {(paper.similarityScore * 100).toFixed(1)}%
                  </span>
                </TableCell>
                <TableCell>
                  <a
                    href={paper.driveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-primary hover:text-primary/80"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span className="sr-only">View paper</span>
                  </a>
                </TableCell>
              </TableRow>
              {showExplanations && expandedRow === paper.id && paper.explanation && (
                <TableRow>
                  <TableCell colSpan={7} className="bg-gray-50 dark:bg-gray-800/50 p-4">
                    <ExplanationPanel explanation={paper.explanation} />
                  </TableCell>
                </TableRow>
              )}
            </>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

