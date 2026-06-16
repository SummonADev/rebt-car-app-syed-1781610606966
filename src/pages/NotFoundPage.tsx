import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center">
      <div className="text-7xl font-extrabold text-slate-900">404</div>
      <h1 className="mt-2 text-2xl font-bold text-slate-900">Page not found</h1>
      <p className="mt-2 text-slate-600">The page you're looking for doesn't exist or has been moved.</p>
      <Link to="/" className="mt-6 inline-block px-5 py-2.5 rounded-lg bg-sky-600 text-white font-semibold hover:bg-sky-700">
        Go home
      </Link>
    </div>
  );
}
