import { Car } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-slate-600">
          <Car className="w-4 h-4 text-sky-600" />
          <span className="text-sm">© {new Date().getFullYear()} DriveAway. All rights reserved.</span>
        </div>
        <div className="flex gap-6 text-sm text-slate-500">
          <a href="#" className="hover:text-slate-900">About</a>
          <a href="#" className="hover:text-slate-900">Support</a>
          <a href="#" className="hover:text-slate-900">Terms</a>
        </div>
      </div>
    </footer>
  );
}
