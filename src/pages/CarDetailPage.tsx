import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Users, Fuel, Settings2, Star, Check } from 'lucide-react';
import { CARS } from '@/lib/cars';
import { formatCurrency } from '@/lib/utils';
import BookingForm from '@/components/BookingForm';

export default function CarDetailPage() {
  const { id } = useParams<{ id: string }>();
  const car = CARS.find(c => c.id === id);

  if (!car) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-slate-900">Car not found</h1>
        <Link to="/cars" className="mt-4 inline-block text-sky-700 font-semibold">← Back to cars</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <Link to="/cars" className="inline-flex items-center gap-1.5 text-sm text-slate-600 hover:text-slate-900">
        <ArrowLeft className="w-4 h-4" /> Back to cars
      </Link>

      <div className="mt-6 grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="rounded-3xl overflow-hidden bg-slate-100 aspect-[16/10]">
            <img src={car.image} alt={`${car.brand} ${car.name}`} className="w-full h-full object-cover" />
          </div>

          <div className="mt-6 flex items-start justify-between gap-4 flex-wrap">
            <div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-sky-100 text-sky-700">{car.category}</span>
              <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
                {car.brand} {car.name}
              </h1>
              <div className="mt-2 flex items-center gap-1 text-amber-500">
                <Star className="w-4 h-4 fill-amber-500" />
                <span className="text-sm font-medium text-slate-700">{car.rating.toFixed(1)} rating</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-extrabold text-sky-700">{formatCurrency(car.pricePerDay)}</div>
              <div className="text-sm text-slate-500">per day</div>
            </div>
          </div>

          <p className="mt-5 text-slate-700 leading-relaxed">{car.description}</p>

          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
            <Spec icon={<Users className="w-5 h-5" />} label="Seats" value={`${car.seats}`} />
            <Spec icon={<Settings2 className="w-5 h-5" />} label="Transmission" value={car.transmission} />
            <Spec icon={<Fuel className="w-5 h-5" />} label="Fuel" value={car.fuel} />
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-bold text-slate-900">Features</h2>
            <ul className="mt-3 grid sm:grid-cols-2 gap-2">
              {car.features.map(f => (
                <li key={f} className="flex items-center gap-2 text-sm text-slate-700">
                  <Check className="w-4 h-4 text-emerald-600" /> {f}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <BookingForm car={car} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Spec({ icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-3 flex items-center gap-3">
      <div className="w-10 h-10 rounded-lg bg-slate-100 text-slate-600 grid place-items-center">{icon}</div>
      <div>
        <div className="text-xs text-slate-500">{label}</div>
        <div className="font-semibold text-slate-900">{value}</div>
      </div>
    </div>
  );
}
