import { Link } from 'react-router-dom';
import { CalendarCheck, MapPin, X, Car as CarIcon } from 'lucide-react';
import { useBookings } from '@/hooks/useBookings';
import { formatCurrency } from '@/lib/utils';
import clsx from 'clsx';

export default function BookingsPage() {
  const { bookings, cancelBooking } = useBookings();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">My Bookings</h1>
          <p className="text-slate-600 mt-1">{bookings.length} reservation{bookings.length === 1 ? '' : 's'} on file</p>
        </div>
        <Link
          to="/cars"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-sky-600 text-white font-semibold hover:bg-sky-700 transition"
        >
          <CarIcon className="w-4 h-4" /> Book another
        </Link>
      </div>

      {bookings.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center">
          <div className="w-14 h-14 rounded-full bg-slate-100 grid place-items-center mx-auto">
            <CalendarCheck className="w-7 h-7 text-slate-400" />
          </div>
          <h2 className="mt-3 text-xl font-bold text-slate-900">No bookings yet</h2>
          <p className="mt-1 text-slate-600">Find a car and make your first reservation.</p>
          <Link to="/cars" className="mt-5 inline-block px-5 py-2.5 rounded-lg bg-slate-900 text-white font-semibold">
            Browse cars
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map(b => (
            <div
              key={b.id}
              className={clsx(
                'bg-white border rounded-2xl shadow-sm overflow-hidden flex flex-col sm:flex-row',
                b.status === 'cancelled' ? 'border-slate-200 opacity-70' : 'border-slate-200'
              )}
            >
              <div className="sm:w-56 h-40 sm:h-auto bg-slate-100 flex-shrink-0">
                <img src={b.carImage} alt={b.carName} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 p-5 flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-lg font-bold text-slate-900">{b.carName}</h3>
                    <span
                      className={clsx(
                        'text-xs font-semibold px-2 py-0.5 rounded-full',
                        b.status === 'confirmed' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-600'
                      )}
                    >
                      {b.status === 'confirmed' ? 'Confirmed' : 'Cancelled'}
                    </span>
                  </div>
                  <div className="mt-2 text-sm text-slate-600 space-y-1">
                    <div className="flex items-center gap-1.5">
                      <CalendarCheck className="w-4 h-4 text-slate-400" />
                      {b.pickupDate} → {b.returnDate} <span className="text-slate-400">({b.totalDays} day{b.totalDays === 1 ? '' : 's'})</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-slate-400" /> {b.pickupLocation}
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-slate-500">
                    Booked by {b.customerName} • Ref <span className="font-mono">{b.id.slice(0, 8).toUpperCase()}</span>
                  </div>
                </div>
                <div className="text-right sm:text-right flex sm:flex-col items-center sm:items-end justify-between gap-3">
                  <div>
                    <div className="text-2xl font-extrabold text-sky-700">{formatCurrency(b.totalPrice)}</div>
                    <div className="text-xs text-slate-500">total</div>
                  </div>
                  {b.status === 'confirmed' && (
                    <button
                      onClick={() => cancelBooking(b.id)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-red-200 text-red-700 text-sm font-semibold hover:bg-red-50"
                    >
                      <X className="w-4 h-4" /> Cancel
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
