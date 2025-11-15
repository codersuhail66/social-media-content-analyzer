/*
  # Create analyses table

  1. New Tables
    - `analyses`
      - `id` (uuid, primary key) - Unique identifier for each analysis
      - `text` (text) - Original social media content that was analyzed
      - `sentiment` (text) - Sentiment result (Positive/Neutral/Negative)
      - `score` (integer) - Engagement score (0-100)
      - `hashtags` (text[]) - Array of suggested hashtags
      - `suggestions` (text[]) - Array of improvement suggestions
      - `improved_text` (text, nullable) - AI-improved version of the content
      - `timing` (text, nullable) - Best time to post suggestion
      - `created_at` (timestamptz) - Timestamp of when analysis was created
      - `user_id` (uuid, nullable) - User ID for future auth integration

  2. Security
    - Enable RLS on `analyses` table
    - Add policy for public read access (for demo purposes)
    - Add policy for public insert access (for demo purposes)

  3. Indexes
    - Index on created_at for efficient sorting
*/

CREATE TABLE IF NOT EXISTS analyses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  text text NOT NULL,
  sentiment text NOT NULL,
  score integer NOT NULL CHECK (score >= 0 AND score <= 100),
  hashtags text[] DEFAULT '{}',
  suggestions text[] DEFAULT '{}',
  improved_text text,
  timing text,
  created_at timestamptz DEFAULT now(),
  user_id uuid
);

ALTER TABLE analyses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read analyses"
  ON analyses
  FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert analyses"
  ON analyses
  FOR INSERT
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS analyses_created_at_idx ON analyses(created_at DESC);
