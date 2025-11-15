export interface AnalysisResult {
  sentiment: 'Positive' | 'Neutral' | 'Negative';
  score: number;
  hashtags: string[];
  suggestions: string[];
  improvedText?: string;
  timing?: string;
}

export interface Analysis {
  id: string;
  text: string;
  result: AnalysisResult;
  created_at: string;
}
