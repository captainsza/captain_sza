import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600">
          404
        </h1>
        <h2 className="mt-4 text-2xl font-semibold text-white">Page Not Found</h2>
        <p className="mt-2 text-gray-400">The page you are looking for doesn&apos;t exist or has been moved</p>
        
        <div className="mt-8">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg 
                       bg-gradient-to-r from-blue-600/80 to-purple-600/80 
                       text-white font-medium relative overflow-hidden group"
          >
            <span className="relative z-10">Back to Home</span>
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-blue-300"></div>
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-blue-300"></div>
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-blue-300"></div>
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-blue-300"></div>
          </Link>
        </div>
      </div>
    </div>
  );
}
