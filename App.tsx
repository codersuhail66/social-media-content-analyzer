import { NavigationProvider, useNavigation } from './contexts/NavigationContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Analyzer from './pages/Analyzer';
import About from './pages/About';

function AppContent() {
  const { currentPage } = useNavigation();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {currentPage === 'home' && <Home />}
        {currentPage === 'analyzer' && <Analyzer />}
        {currentPage === 'about' && <About />}
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <NavigationProvider>
      <AppContent />
    </NavigationProvider>
  );
}

export default App;
