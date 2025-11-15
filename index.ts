import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { createClient } from 'npm:@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

interface AnalysisRequest {
  text: string;
}

interface AnalysisResult {
  sentiment: 'Positive' | 'Neutral' | 'Negative';
  score: number;
  hashtags: string[];
  suggestions: string[];
  improvedText?: string;
  timing?: string;
}

function analyzeSentiment(text: string): 'Positive' | 'Neutral' | 'Negative' {
  const positiveWords = ['excited', 'amazing', 'great', 'love', 'awesome', 'fantastic', 'wonderful', 'happy', 'thrilled', 'excellent', 'perfect', 'best', 'incredible', 'outstanding', '❤️', '😊', '🎉', '🚀', '✨', '💪', '🔥'];
  const negativeWords = ['bad', 'terrible', 'awful', 'hate', 'horrible', 'worst', 'sad', 'disappointed', 'angry', 'frustrated', 'poor', 'fail', '😢', '😞', '😠'];
  
  const lowerText = text.toLowerCase();
  let positiveCount = 0;
  let negativeCount = 0;
  
  positiveWords.forEach(word => {
    if (lowerText.includes(word.toLowerCase())) positiveCount++;
  });
  
  negativeWords.forEach(word => {
    if (lowerText.includes(word.toLowerCase())) negativeCount++;
  });
  
  if (positiveCount > negativeCount) return 'Positive';
  if (negativeCount > positiveCount) return 'Negative';
  return 'Neutral';
}

function calculateEngagementScore(text: string): number {
  let score = 50;
  
  const hasEmoji = /[\p{Emoji}]/u.test(text);
  if (hasEmoji) score += 10;
  
  const hasQuestion = text.includes('?');
  if (hasQuestion) score += 8;
  
  const hasCallToAction = /\b(check|click|visit|share|comment|like|follow|subscribe|learn more|discover|explore|join|try|get)\b/i.test(text);
  if (hasCallToAction) score += 12;
  
  const wordCount = text.split(/\s+/).length;
  if (wordCount >= 10 && wordCount <= 50) {
    score += 10;
  } else if (wordCount < 10) {
    score -= 5;
  } else if (wordCount > 100) {
    score -= 10;
  }
  
  const hasHashtags = text.includes('#');
  if (hasHashtags) score += 5;
  
  const hasExclamation = text.includes('!');
  if (hasExclamation) score += 5;
  
  const sentiment = analyzeSentiment(text);
  if (sentiment === 'Positive') score += 8;
  if (sentiment === 'Negative') score -= 10;
  
  return Math.max(0, Math.min(100, score));
}

function extractTopics(text: string): string[] {
  const topics: string[] = [];
  const lowerText = text.toLowerCase();
  
  const topicMap: { [key: string]: string[] } = {
    motivation: ['motivation', 'inspire', 'goal', 'success', 'achieve', 'dream', 'ambition'],
    business: ['business', 'entrepreneur', 'startup', 'company', 'work', 'career', 'professional'],
    lifestyle: ['lifestyle', 'life', 'living', 'routine', 'daily', 'wellness'],
    technology: ['tech', 'technology', 'digital', 'app', 'software', 'code', 'programming'],
    fitness: ['fitness', 'workout', 'exercise', 'gym', 'health', 'training'],
    food: ['food', 'recipe', 'cooking', 'meal', 'eat', 'delicious'],
    travel: ['travel', 'journey', 'trip', 'adventure', 'explore', 'destination'],
    creative: ['creative', 'art', 'design', 'photography', 'content', 'create'],
  };
  
  for (const [category, keywords] of Object.entries(topicMap)) {
    for (const keyword of keywords) {
      if (lowerText.includes(keyword)) {
        topics.push(category);
        break;
      }
    }
  }
  
  return topics.length > 0 ? topics : ['general', 'content'];
}

function generateHashtags(text: string): string[] {
  const topics = extractTopics(text);
  const hashtags: string[] = [];
  
  const hashtagMap: { [key: string]: string[] } = {
    motivation: ['#motivation', '#goals', '#success', '#inspire', '#mindset'],
    business: ['#business', '#entrepreneur', '#startup', '#leadership', '#hustle'],
    lifestyle: ['#lifestyle', '#lifestyleblogger', '#dailylife', '#wellness', '#selfcare'],
    technology: ['#tech', '#technology', '#innovation', '#digital', '#techlife'],
    fitness: ['#fitness', '#workout', '#fitfam', '#healthylifestyle', '#gymlife'],
    food: ['#foodie', '#foodporn', '#instafood', '#yummy', '#foodlover'],
    travel: ['#travel', '#wanderlust', '#adventure', '#travelgram', '#explore'],
    creative: ['#creative', '#art', '#design', '#photography', '#contentcreator'],
    general: ['#instagood', '#photooftheday', '#love', '#instadaily', '#trending'],
  };
  
  topics.forEach(topic => {
    const topicHashtags = hashtagMap[topic] || hashtagMap.general;
    hashtags.push(...topicHashtags.slice(0, 2));
  });
  
  const sentiment = analyzeSentiment(text);
  if (sentiment === 'Positive') {
    hashtags.push('#positivevibes');
  }
  
  return [...new Set(hashtags)].slice(0, 6);
}

function generateSuggestions(text: string, score: number): string[] {
  const suggestions: string[] = [];
  
  const hasEmoji = /[\p{Emoji}]/u.test(text);
  if (!hasEmoji) {
    suggestions.push('Add 1-2 relevant emojis to make your post more visually appealing and engaging.');
  }
  
  const hasQuestion = text.includes('?');
  if (!hasQuestion && score < 80) {
    suggestions.push('Include a question to encourage comments and start conversations with your audience.');
  }
  
  const hasCallToAction = /\b(check|click|visit|share|comment|like|follow|subscribe|learn more|discover|explore|join|try|get)\b/i.test(text);
  if (!hasCallToAction) {
    suggestions.push('Add a clear call-to-action (e.g., "Share your thoughts" or "Check the link in bio").');
  }
  
  const wordCount = text.split(/\s+/).length;
  if (wordCount < 10) {
    suggestions.push('Expand your content to 15-50 words for optimal engagement. Provide more context or value.');
  } else if (wordCount > 80) {
    suggestions.push('Consider shortening your message. Posts between 15-50 words typically get higher engagement.');
  }
  
  const hasHashtags = text.includes('#');
  if (!hasHashtags) {
    suggestions.push('Include 3-5 relevant hashtags to increase discoverability.');
  }
  
  if (suggestions.length < 3) {
    suggestions.push('Consider posting during peak hours (typically 9-11 AM or 7-9 PM) for maximum visibility.');
  }
  
  return suggestions.slice(0, 4);
}

function generateImprovedText(text: string): string {
  let improved = text.trim();
  
  const hasEmoji = /[\p{Emoji}]/u.test(improved);
  if (!hasEmoji) {
    improved = improved + ' ✨';
  }
  
  const hasQuestion = improved.includes('?');
  if (!hasQuestion) {
    improved = improved + '\n\nWhat do you think?';
  }
  
  return improved;
}

function getBestPostingTime(): string {
  const times = [
    'Weekdays 9-11 AM for professional audiences',
    'Weekdays 7-9 PM for general engagement',
    'Weekends 10 AM-12 PM for lifestyle content',
    'Tuesday and Thursday evenings for highest engagement',
  ];
  return times[Math.floor(Math.random() * times.length)];
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { text }: AnalysisRequest = await req.json();

    if (!text || text.trim().length < 10) {
      return new Response(
        JSON.stringify({ error: 'Text must be at least 10 characters long' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const sentiment = analyzeSentiment(text);
    const score = calculateEngagementScore(text);
    const hashtags = generateHashtags(text);
    const suggestions = generateSuggestions(text, score);
    const improvedText = generateImprovedText(text);
    const timing = getBestPostingTime();

    const result: AnalysisResult = {
      sentiment,
      score,
      hashtags,
      suggestions,
      improvedText,
      timing,
    };

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    await supabaseClient.from('analyses').insert({
      text,
      sentiment: result.sentiment,
      score: result.score,
      hashtags: result.hashtags,
      suggestions: result.suggestions,
      improved_text: result.improvedText,
      timing: result.timing,
    });

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'An error occurred' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});