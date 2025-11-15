import { useNavigation } from '../contexts/NavigationContext';

export default function Footer() {
  const { navigateTo } = useNavigation();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">ContentAI</h3>
            <p className="text-sm">
              AI-powered social media content analysis to boost your engagement.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => navigateTo('about')}
                  className="hover:text-blue-400 transition-colors"
                >
                  About
                </button>
              </li>
              <li>
                <button className="hover:text-blue-400 transition-colors">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button className="hover:text-blue-400 transition-colors">
                  Contact
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Connect</h3>
            <p className="text-sm">
              Get insights to improve your social media presence with AI-driven recommendations.
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm">
          <p>All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
