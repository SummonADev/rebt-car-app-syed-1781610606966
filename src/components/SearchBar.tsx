import { Search, SlidersHorizontal } from 'lucide-react';
import type { SearchFilters, CarCategory } from '@/types';

type SearchBarProps = {
  filters: SearchFilters;
  onChange: (f: SearchFilters) => void;
};

const CATEGORIES: (CarCategory | 'All')[] = ['All', 'Economy', 'SUV', 'Luxury', 'Sports', 'Electric', 'Van'];

export default function SearchBar({ filters, onChange }: SearchBarProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-5">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
        <div className="md:col-span-5 relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by brand or model..."
            value={filters.query}
            onChange={(e: any) => onChange({ ...filters, query: e.target.value })}
            className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white"
          />
        </div>
        <div className="md:col-span-3">
          <select
            value={filters.category}
            onChange={(e: any) => onChange({ ...filters, category: e.target.value })}
            className="w-full px-3 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white"
          >
            {CATEGORIES.map(c => (
              <option key={c} value={c}>{c === 'All' ? 'All categories' : c}</option>
            ))}
          </select>
        </div>
        <div className="md:col-span-2">
          <select
            value={filters.transmission}
            onChange={(e: any) => onChange({ ...filters, transmission: e.target.value })}
            className="w-full px-3 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white"
          >
            <option value="Any">Any transmission</option>
            <option value="Automatic">Automatic</option>
            <option value="Manual">Manual</option>
          </select>
        </div>
        <div className="md:col-span-2">
          <label className="flex items-center gap-2 px-3 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-sm">
            <SlidersHorizontal className="w-4 h-4 text-slate-400" />
            <input
              type="range"
              min={30}
              max={400}
              step={10}
              value={filters.maxPrice}
              onChange={(e: any) => onChange({ ...filters, maxPrice: Number(e.target.value) })}
              className="flex-1 accent-sky-600"
            />
            <span className="text-xs font-semibold text-slate-700 whitespace-nowrap">${filters.maxPrice}</span>
          </label>
        </div>
      </div>
    </div>
  );
}
