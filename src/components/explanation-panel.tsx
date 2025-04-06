interface ExplanationPanelProps {
  explanation: string
}

export function ExplanationPanel({ explanation }: ExplanationPanelProps) {
  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700">
      <h4 className="text-sm font-medium mb-2">Similarity Explanation</h4>
      <p className="text-sm text-gray-600 dark:text-gray-300">{explanation}</p>
    </div>
  )
}

