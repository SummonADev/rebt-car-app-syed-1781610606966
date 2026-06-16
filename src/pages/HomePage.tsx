import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Headphones, Tag, MapPin } from 'lucide-react';
import { CARS } from '@/lib/cars';
import CarCard from '@/components/CarCard';

export default function HomePage() {
  const featured = CARS.filter(c => c.available).slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-50 via-white to-slate-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-sky-100 text-sky-700">
              <MapPin className="w-3.5 h-3.5" /> 200+ pickup locations
            </span>
            <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.05]">
              Drive away in <span className="text-sky-600">minutes</span>, not hours.
            </h1>
            <p className="mt-5 text-lg text-slate-600 max-w-xl">
              Rent premium cars from trusted hosts at unbeatable prices. No hidden fees, free cancellation, and 24/7 support — wherever the road takes you.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/cars"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-sky-600 text-white font-semibold hover:bg-sky-700 transition shadow-lg shadow-sky-600/20"
              >
                Browse Cars <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/bookings"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white border border-slate-200 text-slate-900 font-semibold hover:bg-slate-50 transition"
              >
                My Bookings
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-6 max-w-md">
              <Stat value="500+" label="Vehicles" />
              <Stat value="4.9★" label="Avg rating" />
              <Stat value="24/7" label="Support" />
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 bg-gradient-to-tr from-sky-200/40 to-transparent blur-3xl rounded-full" />
            <img
              src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&auto=format&fit=crop"
              alt="Featured car"
              className="relative rounded-3xl shadow-2xl w-full object-cover aspect-[4/3]"
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid sm:grid-cols-3 gap-4">
          <Feature icon={<Tag className="w-5 h-5" />} title="Best price guarantee" text="Found a lower rate? We'll match it, no questions asked." />
          <Feature icon={<ShieldCheck className="w-5 h-5" />} title="Fully insured" text="Every rental comes with comprehensive insurance coverage." />
          <Feature icon={<Headphones className="w-5 h-5" />} title="24/7 roadside help" text="Day or night, our team is one tap away when you need us." />
        </div>
      </section>

      {/* Featured cars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">Featured cars</h2>
            <p className="text-slate-600 mt-1">Hand-picked rides from our community.</p>
          </div>
          <Link to="/cars" className="text-sky-700 font-semibold hover:text-sky-900 inline-flex items-center gap-1">
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map(car => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </section>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="text-2xl font-extrabold text-slate-900">{value}</div>
      <div className="text-xs text-slate-500 mt-0.5">{label}</div>
    </div>
  );
}

function Feature({ icon, title, text }: { icon: any; title: string; text: string }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
      <div className="w-10 h-10 rounded-lg bg-sky-100 text-sky-700 grid place-items-center">{icon}</div>
      <h3 className="mt-3 font-bold text-slate-900">{title}</h3>
      <p className="text-sm text-slate-600 mt-1">{text}</p>
    </div>
  );
}
