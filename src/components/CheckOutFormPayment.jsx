import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import React, { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { AuthContext } from '../provider/AuthProvider';
import useAxiosSecure from '../hooks/useAxiosSecure';

const CheckOutFormPayment = () => {

    const {user} = useContext(AuthContext);
    // const axiosSecure = useAxiosSecure();
    // const [clientSecret, setClientSecret] = useState("");

    const paymentDetails = {
        name: user.displayName,
        date: new Date(),
        fundingAmount: 15
    }

    console.log(paymentDetails)

    const stripe = useStripe();
    const elements = useElements();

    // useEffect(() => {
    //     axiosSecure.post("/create-payment-intent", paymentDetails)
    //     .then(res => {
    //         console.log(res.data.clientSecret);
    //         setClientSecret(res.data.clientSecret)
    //     })

    // }, [])

    const handleSubmit = async(e) => {
        e.preventDefault();
        // const form = e.target;
        // const name = form.name.value;
        // const fundingDate = form.fundingDate.value;
        // const fundingAmount = parseFloat(form.fundingAmount.value);

        if(!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
          return;
        }
    
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card,
          });
      
          if (error) {
            toast.error(error.message);
          } else {
            console.log('PaymentMethod', paymentMethod);
          }

        //   const paymentDetails = {
        //     name,
        //     fundingDate,
        //     fundingAmount
        //   }

        //   const res = await axiosSecure.post("/payments", paymentDetails);
        //   if(res.data.insertedId){
        //     console.log("mongodb")
        // }
    }

  return (
    <div className='mb-[50px] w-10/12 mx-auto'>
    <form onSubmit={handleSubmit}>
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



{/* <div className="mb-5 mt-4">
                        <label className="text-red-600">Your Name</label>

                            <input defaultValue={user?.displayName} readOnly={true} type="text" name='name' className="block w-full py-2.5 text-gray-700 bg-white border rounded-lg px-4 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-red-400 dark:focus:border-red-300 focus:ring-red-300 focus:outline-none focus:ring focus:ring-opacity-40" required />
                        </div>  

                        <div className="mb-5 mt-4">
                        <label className="text-red-600">Today's Date</label>

                            <input id='dateInput' type="date" name='fundingDate' className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-4 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-red-400 dark:focus:border-red-300 focus:ring-red-300 focus:outline-none focus:ring focus:ring-opacity-40" required />
                        </div>

                        <div className="mb-5 mt-4">
                        <label className="text-red-600">Funding Amount ($)</label>

                            <input type="text" name='fundingAmount' className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-4 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-red-400 dark:focus:border-red-300 focus:ring-red-300 focus:outline-none focus:ring focus:ring-opacity-40" required />
                        </div> */}

    <div className='flex items-center justify-center mt-7'>
    <button className='btn btn-sm bg-red-600 border-none text-white hover:bg-red-500 tracking-widest' type="submit" disabled={!stripe}>
      Give Fund
    </button>
    </div>
  </form>
  </div>
  )
}

export default CheckOutFormPayment
