import { stripe } from '@/lib/stripe'; 
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { CircleCheckFill, Calendar, Timeline, ArrowLeft, Envelope } from '@gravity-ui/icons';

export default async function Success({ params, searchParams }) {
  const { id } = await params;
  const { session_id } = await searchParams;

  if (!session_id) {
    throw new Error('Please provide a valid session_id');
  }

  const session = await stripe.checkout.sessions.retrieve(session_id);

  if (session.status === 'open') {
    return redirect(`/find-doctors/${id}`);
  }

  if (session.status === 'complete') {
    const customerEmail = session.customer_details?.email;
    const selectedDate = session.metadata?.selectedDate;
    const selectedSlot = session.metadata?.selectedSlot;
    const amountPaid = session.amount_total ? session.amount_total / 100 : 0;

    return (
      <div className="w-full min-h-screen bg-slate-50 dark:bg-[#0B0F19] text-slate-800 dark:text-slate-100 flex flex-col justify-center items-center p-4 sm:p-6 select-none transition-colors duration-300">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-72 h-72 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

        <section className="relative max-w-md w-full bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800/70 rounded-2xl p-6 sm:p-8 shadow-xl text-center overflow-hidden">
          <div className="w-16 h-16 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-200 dark:border-emerald-500/20 shadow-lg shadow-emerald-500/5">
            <CircleCheckFill className="w-8 h-8" />
          </div>

          <h1 className="text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight mb-2">
            Appointment Confirmed!
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed mb-6">
            Thank you for your payment. A confirmation email will be sent to{' '}
            <span className="font-bold text-slate-700 dark:text-slate-200">{customerEmail}</span>.
          </p>

          <div className="bg-slate-50 dark:bg-[#131B2E]/60 border border-slate-200 dark:border-slate-800/80 rounded-xl p-4 text-left space-y-3 text-xs mb-8">
            <div className="flex items-center gap-2.5 text-slate-600 dark:text-slate-300">
              <Envelope className="w-4 h-4 text-blue-500 shrink-0" />
              <div>
                <span className="block font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider text-[10px]">Doctor ID</span>
                <span className="text-sm font-mono font-semibold break-all">{id}</span>
              </div>
            </div>

            {selectedDate && (
              <div className="border-t border-slate-200 dark:border-slate-800/60 pt-3 flex items-center gap-2.5 text-slate-600 dark:text-slate-300">
                <Calendar className="w-4 h-4 text-blue-500 shrink-0" />
                <div>
                  <span className="block font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider text-[10px]">Selected Date</span>
                  <span className="text-sm font-semibold">{selectedDate}</span>
                </div>
              </div>
            )}

            {selectedSlot && (
              <div className="border-t border-slate-200 dark:border-slate-800/60 pt-3 flex items-center gap-2.5 text-slate-600 dark:text-slate-300">
                <Timeline className="w-4 h-4 text-blue-500 shrink-0" />
                <div>
                  <span className="block font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider text-[10px]">Time Slot</span>
                  <span className="text-sm font-semibold">{selectedSlot}</span>
                </div>
              </div>
            )}

            {amountPaid > 0 && (
              <div className="border-t border-slate-200 dark:border-slate-800/60 pt-3 flex items-center gap-2.5 text-slate-600 dark:text-slate-300">
                <div className="w-4 h-4 text-blue-500 shrink-0 flex items-center justify-center font-bold text-xs">$</div>
                <div>
                  <span className="block font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider text-[10px]">Amount Paid</span>
                  <span className="text-sm font-bold text-slate-800 dark:text-slate-100">${amountPaid} USD</span>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-3">
            <Link
              href="/dashboard"
              className="block w-full text-center text-xs font-bold px-4 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl shadow-lg shadow-blue-600/10 transition duration-200"
            >
              Go to Patient Dashboard
            </Link>

            <Link
              href={`/find-doctors/${id}`}
              className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 py-1 transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Doctor Profile
            </Link>
          </div>

          <p className="text-[11px] text-slate-400 dark:text-slate-500 pt-4 border-t border-slate-100 dark:border-slate-800/40 mt-4">
            If you have any questions, please email{' '}
            <a href="mailto:orders@example.com" className="text-blue-500 hover:underline font-medium">
              orders@example.com
            </a>
          </p>
        </section>
      </div>
    );
  }

  return null;
}