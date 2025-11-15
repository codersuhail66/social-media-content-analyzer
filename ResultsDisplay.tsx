import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { ThumbsUp, Hash, Lightbulb, Clock } from 'lucide-react';
import { AnalysisResult } from '../types/analysis';

interface ResultsDisplayProps {
  result: AnalysisResult;
  originalText: string;
}

export default function ResultsDisplay({ result, originalText }: ResultsDisplayProps) {
  const sentimentColor = {
    Positive: '#10b981',
    Neutral: '#f59e0b',
    Negative: '#ef4444',
  };

  const scoreData = [
    { name: 'Score', value: result.score },
    { name: 'Remaining', value: 100 - result.score },
  ];

  const engagementMetrics = [
    { name: 'Engagement', score: result.score },
    { name: 'Clarity', score: Math.min(result.score + 5, 100) },
    { name: 'Tone', score: Math.max(result.score - 3, 0) },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Original Content</h3>
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-gray-700 whitespace-pre-wrap">{originalText}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <ThumbsUp className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Sentiment Analysis</h3>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold" style={{ color: sentimentColor[result.sentiment] }}>
                {result.sentiment}
              </p>
              <p className="text-sm text-gray-600 mt-1">Overall emotional tone</p>
            </div>
            <div className="w-32 h-32">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[{ value: 1 }]}
                    cx="50%"
                    cy="50%"
                    innerRadius={35}
                    outerRadius={50}
                    fill={sentimentColor[result.sentiment]}
                    dataKey="value"
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Engagement Score</h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-5xl font-bold text-blue-600">{result.score}</p>
              <p className="text-sm text-gray-600 mt-1">out of 100</p>
            </div>
            <div className="w-40 h-40">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={scoreData}
                    cx="50%"
                    cy="50%"
                    startAngle={90}
                    endAngle={-270}
                    innerRadius={45}
                    outerRadius={60}
                    dataKey="value"
                  >
                    <Cell fill="#3b82f6" />
                    <Cell fill="#e5e7eb" />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={engagementMetrics}>
            <XAxis dataKey="name" />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Legend />
            <Bar dataKey="score" fill="#3b82f6" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Hash className="w-5 h-5 text-purple-600" />
          <h3 className="text-lg font-semibold text-gray-900">Suggested Hashtags</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {result.hashtags.map((tag, index) => (
            <span
              key={index}
              className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Lightbulb className="w-5 h-5 text-yellow-600" />
          <h3 className="text-lg font-semibold text-gray-900">AI Suggestions</h3>
        </div>
        <ul className="space-y-3">
          {result.suggestions.map((suggestion, index) => (
            <li key={index} className="flex items-start space-x-3">
              <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-sm font-semibold">
                {index + 1}
              </span>
              <p className="text-gray-700">{suggestion}</p>
            </li>
          ))}
        </ul>
      </div>

      {result.timing && (
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-2 mb-2">
            <Clock className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Best Time to Post</h3>
          </div>
          <p className="text-gray-700">{result.timing}</p>
        </div>
      )}

      {result.improvedText && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">AI-Improved Version</h3>
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 border-2 border-blue-200">
            <p className="text-gray-700 whitespace-pre-wrap">{result.improvedText}</p>
          </div>
        </div>
      )}
    </div>
  );
}
