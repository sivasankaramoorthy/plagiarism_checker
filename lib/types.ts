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

