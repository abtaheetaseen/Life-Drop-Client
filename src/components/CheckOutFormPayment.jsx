import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import React, { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import useAxiosSecure from '../hooks/useAxiosSecure';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { AuthContext } from '../provider/AuthProvider';
import { useNavigate } from 'react-router-dom';
import SectionTitle from './SectionTitle';

const CheckOutFormPayment = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState("");
    const [amount, setAmount] = useState('');
    const [message, setMessage] = useState('');
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();


    useEffect(() => {
        axiosSecure.post("/create-payment-intent", { price: amount })
            .then(res => {
                console.log(res.data);
                setClientSecret(res.data.clientSecret);
            })
    }, [axiosSecure, amount])

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: card,
        });

        if (error) {
            console.log('error', error);
            toast.error(error.message)
        } else {
            console.log('PaymentMethod', paymentMethod);
        }

        // confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    name: user?.displayName || "anonymous",
                    email: user?.email || "anonymous",
                }
            }
        })

        if (confirmError) {
            console.log("confirm error");
        } else {
            console.log("payment intent", paymentIntent);
            if (paymentIntent.status === "succeeded") {
                console.log("transaction id", paymentIntent.id);
                toast.success(`Thanks for your fund.`);

                // save the funding details on database
                const fundDetails = {
                    name: user?.displayName,
                    email: user?.email,
                    amount: amount,
                    date: new Date(),
                    transactionId: paymentIntent.id,
                }

                const res = await axiosSecure.post("/payment", fundDetails);
                if (res.data.insertedId) {
                    console.log(res.data)
                    navigate("/")
                }
            }
        }

    };

    return (

<div className='w-10/12 mx-auto mb-[70px]'>
    <div>
        <SectionTitle heading={"Give Fund"} subHeading={"Save life, spread smile!"} />
    </div>
        <form onSubmit={handleSubmit}>
            <label className='text-red-600'>
            Donation Amount:
            <input
                type="number"
                name='amount'
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                // className='mb-5 border-2 w-full h-[30px]'
                className="block w-full py-1 text-gray-700 bg-white border rounded-lg px-4 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-red-400 dark:focus:border-red-300 focus:ring-red-300 focus:outline-none focus:ring focus:ring-opacity-40 mb-5"
            />
        </label>
            {/* <div className="mb-5 mt-4">
                <label className="text-red-600">Donation Amount</label>

                <input type="number" name='donationAmount'
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                    className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-4 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-red-400 dark:focus:border-red-300 focus:ring-red-300 focus:outline-none focus:ring focus:ring-opacity-40" />
            </div> */}
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            
            <button className='btn btn-sm border-none bg-red-600 text-white hover:bg-red-500 mt-5' type="submit" disabled={!stripe || !clientSecret}>
                Donate
            </button>

        </form>
        </div>

    )
}

export default CheckOutFormPayment
