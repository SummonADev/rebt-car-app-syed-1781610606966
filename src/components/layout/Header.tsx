import { Link, NavLink } from 'react-router-dom';
import { Car, CalendarCheck, Home } from 'lucide-react';
import clsx from 'clsx';

export default function Header() {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    clsx(
      'inline-flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition',
      isActive ? 'bg-sky-100 text-sky-700' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
    );

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-sky-500 to-sky-700 grid place-items-center text-white shadow">
            <Car className="w-5 h-5" />
          </div>
          <span className="text-xl font-extrabold tracking-tight text-slate-900">DriveAway</span>
        </Link>
        <nav className="flex items-center gap-1">
          <NavLink to="/" end className={linkClass}>
            <Home className="w-4 h-4" /> <span className="hidden sm:inline">Home</span>
          </NavLink>
          <NavLink to="/cars" className={linkClass}>
            <Car className="w-4 h-4" /> <span className="hidden sm:inline">Cars</span>
          </NavLink>
          <NavLink to="/bookings" className={linkClass}>
            <CalendarCheck className="w-4 h-4" /> <span className="hidden sm:inline">My Bookings</span>
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
