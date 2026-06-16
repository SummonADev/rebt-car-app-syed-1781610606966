import { Link } from 'react-router-dom';
import { Users, Fuel, Settings2, Star } from 'lucide-react';
import type { Car } from '@/types';
import { formatCurrency } from '@/lib/utils';

type CarCardProps = {
  car: Car;
};

export default function CarCard({ car }: CarCardProps) {
  return (
    <div className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-all hover:-translate-y-0.5">
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <img
          src={car.image}
          alt={`${car.brand} ${car.name}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <span className="absolute top-3 left-3 px-2.5 py-1 text-xs font-semibold rounded-full bg-white/95 text-slate-800 shadow">
          {car.category}
        </span>
        {!car.available && (
          <span className="absolute top-3 right-3 px-2.5 py-1 text-xs font-semibold rounded-full bg-red-500 text-white shadow">
            Unavailable
          </span>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-bold text-lg text-slate-900 leading-tight">
              {car.brand} {car.name}
            </h3>
            <div className="flex items-center gap-1 mt-1 text-amber-500">
              <Star className="w-4 h-4 fill-amber-500" />
              <span className="text-sm font-medium text-slate-700">{car.rating.toFixed(1)}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xl font-extrabold text-sky-700">{formatCurrency(car.pricePerDay)}</div>
            <div className="text-xs text-slate-500">per day</div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2 text-xs text-slate-600">
          <div className="flex items-center gap-1.5">
            <Users className="w-4 h-4 text-slate-400" /> {car.seats} seats
          </div>
          <div className="flex items-center gap-1.5">
            <Settings2 className="w-4 h-4 text-slate-400" /> {car.transmission}
          </div>
          <div className="flex items-center gap-1.5">
            <Fuel className="w-4 h-4 text-slate-400" /> {car.fuel}
          </div>
        </div>

        <Link
          to={`/cars/${car.id}`}
          className="mt-5 block text-center w-full py-2.5 rounded-lg bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 transition"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
