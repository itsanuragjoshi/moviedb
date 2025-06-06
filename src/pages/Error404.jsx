import { Link } from 'react-router-dom'
import MetaTags from '../components/MetaTags'

function Error404() {
  return (
    <>
      <MetaTags 
        title="404 - Page Not Found | Movie Browser"
        description="The page you're looking for doesn't exist. Return to the home page to continue browsing movies."
      />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">Page Not Found</h2>
          <p className="text-gray-600 mb-8 max-w-md">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
          <Link
            to="/"
            className="px-6 py-3 rounded-full transition-colors border-2 border-black hover:shadow-[0px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1"
          >
            Go to Homepage
          </Link>
        </div>
      </main>
    </>
  )
}

export default Error404 