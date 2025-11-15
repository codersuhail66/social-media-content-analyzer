import { BarChart3 } from 'lucide-react';
import { useNavigation } from '../contexts/NavigationContext';

export default function Header() {
  const { currentPage, navigateTo } = useNavigation();

  return (
    <header className="bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => navigateTo('home')}
          >
            <BarChart3 className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">ContentAI</span>
          </div>

          <div className="flex space-x-8">
            <button
              onClick={() => navigateTo('home')}
              className={`text-sm font-medium transition-colors ${
                currentPage === 'home'
                  ? 'text-blue-600'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => navigateTo('analyzer')}
              className={`text-sm font-medium transition-colors ${
                currentPage === 'analyzer'
                  ? 'text-blue-600'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Analyzer
            </button>
            <button
              onClick={() => navigateTo('about')}
              className={`text-sm font-medium transition-colors ${
                currentPage === 'about'
                  ? 'text-blue-600'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              About
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
