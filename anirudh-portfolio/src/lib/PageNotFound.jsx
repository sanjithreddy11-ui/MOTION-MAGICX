import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function PageNotFound() {
  const location = useLocation();
  const pageName = location.pathname.substring(1);

  useEffect(() => {
    document.title = 'Page Not Found | Motion Magicx';
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#09090b] text-white">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-7xl font-black tracking-tight text-zinc-700">404</h1>
          <div className="h-px w-16 bg-zinc-700 mx-auto" />
        </div>

        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-white">Page Not Found</h2>
          <p className="text-zinc-400 font-light leading-relaxed">
            {pageName ? (
              <>The page "<span className="text-zinc-300">{pageName}</span>" doesn't exist on Motion Magicx.</>
            ) : (
              <>That page doesn't exist on Motion Magicx.</>
            )}
          </p>
        </div>

        <div className="pt-4">
          <a
            href="/"
            className="inline-flex items-center px-6 py-3 text-sm font-bold tracking-wide bg-white text-black border border-white hover:bg-transparent hover:text-white transition-all duration-300"
          >
            Back to Motion Magicx
          </a>
        </div>
      </div>
    </div>
  );
}
