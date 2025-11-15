import { Brain, Shield, Zap, Users } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            About ContentAI
          </h1>
          <p className="text-xl text-gray-600">
            Empowering content creators with AI-driven insights
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            What is ContentAI?
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            ContentAI is an advanced social media content analysis platform that uses artificial intelligence to help you create more engaging posts. Whether you're a marketer, influencer, or business owner, our tool provides instant feedback on your content's potential to drive engagement.
          </p>
          <p className="text-gray-700 leading-relaxed">
            By analyzing sentiment, tone, and structure, ContentAI gives you actionable insights to optimize your social media presence and connect better with your audience.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Brain className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Advanced AI Analysis
            </h3>
            <p className="text-gray-600">
              Our AI models are trained on millions of successful social media posts to understand what drives engagement and resonates with audiences.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Instant Results
            </h3>
            <p className="text-gray-600">
              Get comprehensive analysis in seconds, not hours. Our real-time processing ensures you can iterate and improve your content quickly.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Privacy First
            </h3>
            <p className="text-gray-600">
              Your content is analyzed securely and never stored without permission. We respect your privacy and protect your creative work.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Built for Creators
            </h3>
            <p className="text-gray-600">
              Designed with input from social media professionals who understand the challenges of creating engaging content consistently.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            How AI Analysis Works
          </h2>
          <div className="space-y-4 text-gray-700">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Sentiment Analysis</h3>
              <p className="leading-relaxed">
                Our AI evaluates the emotional tone of your content, identifying whether it's positive, neutral, or negative. This helps you understand how your audience might react emotionally to your message.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Engagement Scoring</h3>
              <p className="leading-relaxed">
                We analyze factors like word choice, sentence structure, call-to-actions, and emotional triggers to predict how well your content will perform. The 0-100 score gives you a quick benchmark.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Smart Hashtag Suggestions</h3>
              <p className="leading-relaxed">
                Based on your content's topic and context, we recommend relevant hashtags that can increase your post's discoverability and reach the right audience.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Improvement Recommendations</h3>
              <p className="leading-relaxed">
                Get specific, actionable suggestions on how to enhance your content. From adding emojis to restructuring sentences, our AI provides practical tips to boost engagement.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
