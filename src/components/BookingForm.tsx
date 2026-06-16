import { useMemo, useState } from 'react';
import { Calendar, MapPin, User, Mail, CheckCircle2 } from 'lucide-react';
import type { Car, Booking } from '@/types';
import { daysBetween, formatCurrency, genId, todayISO, tomorrowISO } from '@/lib/utils';
import { useBookings } from '@/hooks/useBookings';

type BookingFormProps = {
  car: Car;
};

export default function BookingForm({ car }: BookingFormProps) {
  const { addBooking } = useBookings();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('Downtown Branch');
  const [pickup, setPickup] = useState(todayISO());
  const [ret, setRet] = useState(tomorrowISO());
  const [submitted, setSubmitted] = useState<Booking | null>(null);
  const [error, setError] = useState('');

  const days = useMemo(() => daysBetween(pickup, ret), [pickup, ret]);
  const total = days * car.pricePerDay;

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setError('');
    if (!name.trim() || !email.trim()) {
      setError('Please fill in your name and email.');
      return;
    }
    if (days <= 0) {
      setError('Return date must be after pickup date.');
      return;
    }
    const booking: Booking = {
      id: genId(),
      carId: car.id,
      carName: `${car.brand} ${car.name}`,
      carImage: car.image,
      customerName: name.trim(),
      customerEmail: email.trim(),
      pickupDate: pickup,
      returnDate: ret,
      pickupLocation: location,
      totalDays: days,
      totalPrice: total,
      createdAt: new Date().toISOString(),
      status: 'confirmed',
    };
    addBooking(booking);
    setSubmitted(booking);
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl border border-emerald-200 shadow-sm p-6 text-center">
        <div className="w-14 h-14 rounded-full bg-emerald-100 grid place-items-center mx-auto">
          <CheckCircle2 className="w-8 h-8 text-emerald-600" />
        </div>
        <h3 className="mt-3 text-xl font-bold text-slate-900">Booking confirmed!</h3>
        <p className="mt-1 text-sm text-slate-600">
          Reservation <span className="font-mono text-slate-900">{submitted.id.slice(0, 8).toUpperCase()}</span> for {submitted.carName}.
        </p>
        <div className="mt-4 text-sm text-slate-700">
          <div>{submitted.pickupDate} → {submitted.returnDate}</div>
          <div className="mt-1 font-semibold text-lg text-sky-700">{formatCurrency(submitted.totalPrice)}</div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
      <h3 className="text-lg font-bold text-slate-900">Reserve this car</h3>

      <div className="grid grid-cols-2 gap-3">
        <Field label="Pickup date" icon={<Calendar className="w-4 h-4" />}>
          <input type="date" value={pickup} min={todayISO()} onChange={(e: any) => setPickup(e.target.value)} className="input" />
        </Field>
        <Field label="Return date" icon={<Calendar className="w-4 h-4" />}>
          <input type="date" value={ret} min={pickup} onChange={(e: any) => setRet(e.target.value)} className="input" />
        </Field>
      </div>

      <Field label="Pickup location" icon={<MapPin className="w-4 h-4" />}>
        <select value={location} onChange={(e: any) => setLocation(e.target.value)} className="input">
          <option>Downtown Branch</option>
          <option>Airport Terminal</option>
          <option>Central Station</option>
          <option>Beach Resort</option>
        </select>
      </Field>

      <Field label="Full name" icon={<User className="w-4 h-4" />}>
        <input type="text" value={name} placeholder="Jane Doe" onChange={(e: any) => setName(e.target.value)} className="input" />
      </Field>

      <Field label="Email" icon={<Mail className="w-4 h-4" />}>
        <input type="email" value={email} placeholder="jane@example.com" onChange={(e: any) => setEmail(e.target.value)} className="input" />
      </Field>

      <div className="border-t border-slate-200 pt-4 space-y-1.5">
        <div className="flex justify-between text-sm text-slate-600">
          <span>{formatCurrency(car.pricePerDay)} × {days} day{days === 1 ? '' : 's'}</span>
          <span>{formatCurrency(total)}</span>
        </div>
        <div className="flex justify-between items-baseline">
          <span className="font-semibold text-slate-900">Total</span>
          <span className="text-2xl font-extrabold text-sky-700">{formatCurrency(total)}</span>
        </div>
      </div>

      {error && <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</div>}

      <button
        type="submit"
        disabled={!car.available}
        className="w-full py-3 rounded-lg bg-sky-600 text-white font-semibold hover:bg-sky-700 transition disabled:bg-slate-300 disabled:cursor-not-allowed"
      >
        {car.available ? 'Confirm Booking' : 'Currently Unavailable'}
      </button>

      <style>{`
        .input {
          width: 100%;
          padding: 0.625rem 0.75rem;
          border-radius: 0.5rem;
          border: 1px solid rgb(226 232 240);
          background: rgb(248 250 252);
          font-size: 0.875rem;
          outline: none;
        }
        .input:focus {
          background: white;
          box-shadow: 0 0 0 2px rgb(14 165 233 / 0.4);
        }
      `}</style>
    </form>
  );
}

type FieldProps = {
  label: string;
  icon: any;
  children: any;
};

function Field({ label, icon, children }: FieldProps) {
  return (
    <label className="block">
      <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 mb-1">
        {icon} {label}
      </span>
      {children}
    </label>
  );
}
