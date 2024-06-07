import React from 'react'
import SectionTitle from '../components/SectionTitle'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js';
import CheckOutFormPayment from '../components/CheckOutFormPayment';

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_PUBLISHABLE_KEY);

const Payment = () => {
  return (
    <>
      <SectionTitle heading={"Give Fund"} subHeading={"You are giving fund from $1 to $50 based on your luck"} />

      <div>
        <Elements stripe={stripePromise} >
            <CheckOutFormPayment />
        </Elements>
      </div>
    </>
  )
}

export default Payment
