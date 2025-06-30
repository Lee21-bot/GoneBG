import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/layout/Header'
import ImageUpload from './components/upload/ImageUpload'
import FAQ from './components/help/FAQ'
import ErrorBoundary from './components/ErrorBoundary'

const Home = () => {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-5xl font-black text-gray-900 mb-4 tracking-tight">
          Free Background Removal Tool
        </h1>
        <p className="text-xl text-gray-700 mb-8 font-medium leading-relaxed max-w-2xl mx-auto">
          Remove backgrounds from images instantly with professional results. 
          No signup required, completely free.
        </p>
      </div>
      <ImageUpload />
    </main>
  );
};

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <ErrorBoundary>
          <Header />
          <div className="pt-12">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/faq" element={<FAQ />} />
            </Routes>
          </div>
        </ErrorBoundary>
      </div>
    </Router>
  )
}

export default App
