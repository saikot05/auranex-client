import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { stripe } from '../../../lib/stripe';

export async function POST(req) {
    try {
        const body = await req.json();
        const { doctorName, amount, doctorId, selectedDate, selectedSlot } = body;

        const headersList = await headers();
        const origin = headersList.get('origin');

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: `Consultation with ${doctorName}`,
                    },
                    unit_amount: Math.round(amount * 100),
                },
                quantity: 1,
            }],
            mode: 'payment',
            metadata: {
                doctorId,
                selectedDate: selectedDate || '',
                selectedSlot: selectedSlot || ''
            },
            success_url: `${origin}/find-doctors/${doctorId}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${origin}/find-doctors/${doctorId}`,
        });

        return NextResponse.json({ url: session.url });
    } catch (err) {
        console.error("Stripe Error:", err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}