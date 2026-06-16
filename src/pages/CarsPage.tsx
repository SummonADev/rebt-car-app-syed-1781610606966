import { useMemo, useState } from 'react';
import { CARS } from '@/lib/cars';
import CarCard from '@/components/CarCard';
import SearchBar from '@/components/SearchBar';
import type { SearchFilters } from '@/types';

export default function CarsPage() {
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    category: 'All',
    maxPrice: 400,
    transmission: 'Any',
  });

  const filtered = useMemo(() => {
    return CARS.filter(c => {
      const q = filters.query.trim().toLowerCase();
      if (q && !`${c.brand} ${c.name}`.toLowerCase().includes(q)) return false;
      if (filters.category !== 'All' && c.category !== filters.category) return false;
      if (filters.transmission !== 'Any' && c.transmission !== filters.transmission) return false;
      if (c.pricePerDay > filters.maxPrice) return false;
      return true;
    });
  }, [filters]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">Find your ride</h1>
        <p className="text-slate-600 mt-1">Browse our fleet and book in seconds.</p>
      </div>

      <SearchBar filters={filters} onChange={setFilters} />

      <div className="mt-4 text-sm text-slate-600">
        Showing <span className="font-semibold text-slate-900">{filtered.length}</span> of {CARS.length} cars
      </div>

      {filtered.length === 0 ? (
        <div className="mt-10 text-center bg-white rounded-2xl border border-slate-200 p-12">
          <p className="text-slate-600">No cars match your filters. Try widening your search.</p>
        </div>
      ) : (
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(car => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      )}
    </div>
  );
}
