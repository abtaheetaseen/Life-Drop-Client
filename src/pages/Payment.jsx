import { Elements } from "@stripe/react-stripe-js";
import CheckOutFormPayment from "../components/CheckOutFormPayment";
import { loadStripe } from '@stripe/stripe-js';
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import SectionTitle from "../components/SectionTitle";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_PUBLISHABLE_KEY);

const Payment = () => {

    const axiosSecure = useAxiosSecure();

    const {data: funds = []} = useQuery({
        queryKey: ["funds"],
        queryFn: async() => {
            const res = await axiosSecure.get("/payment");
            return res?.data;
        }
    })
    console.log(funds)

    return (
        <>
        <div>
            <Elements stripe={stripePromise}>
            <CheckOutFormPayment />
            </Elements>
        </div>

        <div className="w-10/12 mx-auto mb-[70px]">
            <SectionTitle heading={"All Funds"} />
        <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th className="text-center">Name</th>
        <th className="text-center">Email</th>
        <th className="text-center">Amount</th>
        <th className="text-center">Date</th>
      </tr>
    </thead>
    <tbody>

        {
            funds?.map(fund => <tr>
                <td className="text-center">{fund.name.toUpperCase()}</td>
                <td className="text-center">{fund.email}</td>
                <td className="text-center">${fund.amount}</td>
                <td className="text-center">{fund.date}</td>
              </tr>)
        }

    </tbody>
  </table>
</div>
        </div>
        </>
    )
}

export default Payment
