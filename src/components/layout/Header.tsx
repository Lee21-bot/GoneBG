import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 shadow-sm border-b backdrop-blur-md border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-12">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300 ease-in-out">
              Background Removal Tool
            </Link>
          </div>
          <nav className="hidden md:flex space-x-6 text-base">
            <Link to="/faq" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
              FAQ
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header 