import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Film, Home, Search, Menu, X } from 'lucide-react';
import { languages, genres } from '../utils/constants';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        {/* Language Bar */}
        <div className="bg-indigo-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center space-x-8 py-2">
              {languages.map((lang) => (
                <Link
                  key={lang.id}
                  to={`/language/${lang.id}`}
                  className="text-white hover:text-indigo-100 text-sm font-medium"
                >
                  {lang.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link to="/" className="flex items-center">
                <Film className="h-8 w-8 text-indigo-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">MovieRush</span>
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-900 hover:text-indigo-600">
                <Home className="h-5 w-5" />
              </Link>
              <Link to="/search" className="text-gray-900 hover:text-indigo-600">
                <Search className="h-5 w-5" />
              </Link>
              
              {/* Genres Dropdown */}
              <div className="relative group">
                <button className="text-gray-900 group-hover:text-indigo-600">
                  Genres
                </button>
                <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="py-1">
                    {genres.map((genre) => (
                      <Link
                        key={genre.id}
                        to={`/genre/${genre.id}`}
                        className="block px-4 py-2 text-sm text-gray-900 hover:bg-gray-100"
                      >
                        {genre.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              
              <Link to="/contact" className="text-gray-900 hover:text-indigo-600">
                Contact
              </Link>
            </div>

            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-900"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="pt-2 pb-3 space-y-1">
              <Link
                to="/"
                className="block pl-3 pr-4 py-2 text-base font-medium text-gray-900 hover:bg-gray-50"
              >
                Home
              </Link>
              <Link
                to="/search"
                className="block pl-3 pr-4 py-2 text-base font-medium text-gray-900 hover:bg-gray-50"
              >
                Search
              </Link>
              <Link
                to="/contact"
                className="block pl-3 pr-4 py-2 text-base font-medium text-gray-900 hover:bg-gray-50"
              >
                Contact
              </Link>
              <div className="py-2">
                <div className="pl-3 pr-4 py-2 text-base font-medium text-gray-900">Languages</div>
                {languages.map((lang) => (
                  <Link
                    key={lang.id}
                    to={`/language/${lang.id}`}
                    className="block pl-6 pr-4 py-2 text-sm text-gray-900 hover:bg-gray-50"
                  >
                    {lang.name}
                  </Link>
                ))}
              </div>
              <div className="py-2">
                <div className="pl-3 pr-4 py-2 text-base font-medium text-gray-900">Genres</div>
                {genres.map((genre) => (
                  <Link
                    key={genre.id}
                    to={`/genre/${genre.id}`}
                    className="block pl-6 pr-4 py-2 text-sm text-gray-900 hover:bg-gray-50"
                  >
                    {genre.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Breadcrumbs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-indigo-600">Home</Link>
            {pathSegments.map((segment, index) => (
              <React.Fragment key={segment}>
                <span>/</span>
                <Link
                  to={`/${pathSegments.slice(0, index + 1).join('/')}`}
                  className="hover:text-indigo-600 capitalize"
                >
                  {segment.replace(/-/g, ' ')}
                </Link>
              </React.Fragment>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      <footer className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
                Legal
              </h3>
              <div className="mt-4 space-y-4">
                <Link
                  to="/privacy-policy"
                  className="text-base text-gray-600 hover:text-gray-900 block"
                >
                  Privacy Policy
                </Link>
                <Link
                  to="/terms-of-service"
                  className="text-base text-gray-600 hover:text-gray-900 block"
                >
                  Terms of Service
                </Link>
                <Link
                  to="/dmca"
                  className="text-base text-gray-600 hover:text-gray-900 block"
                >
                  DMCA
                </Link>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
                Company
              </h3>
              <div className="mt-4 space-y-4">
                <Link
                  to="/about"
                  className="text-base text-gray-600 hover:text-gray-900 block"
                >
                  About Us
                </Link>
                <Link
                  to="/contact"
                  className="text-base text-gray-600 hover:text-gray-900 block"
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-200 pt-8">
            <p className="text-base text-gray-400 text-center">
              &copy; {new Date().getFullYear()} MovieRush. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;