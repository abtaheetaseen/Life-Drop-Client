import { Elements } from "@stripe/react-stripe-js";
import CheckOutFormPayment from "../components/CheckOutFormPayment";
import { loadStripe } from '@stripe/stripe-js';
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import SectionTitle from "../components/SectionTitle";
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_PUBLISHABLE_KEY);

const Payment = () => {

    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();

    const [allPaymentsTotalCount, setAllPaymentsTotalCount] = useState("");
    const allPaymentsCount = allPaymentsTotalCount.totalPaymentCountForPagination;
    console.log(allPaymentsCount)
    const itemsPerPage = 10;
    const numberOfPages = Math.ceil(allPaymentsCount / itemsPerPage);
    console.log(numberOfPages)
    const [currentPage, setCurrentPage] = useState(0);

    const pages = []
    for (let i = 0; i < numberOfPages; i++) {
      pages.push(i)
    }

    const {data: funds = []} = useQuery({
        queryKey: ["funds", currentPage, itemsPerPage],
        queryFn: async() => {
            const res = await axiosPublic.get(`/payment?page=${currentPage}&size=${itemsPerPage}`);
            return res?.data;
        }
    })

    const {data: totalPaymentsCount = []} = useQuery({
        queryKey: ["totalPaymentsCount"],
        queryFn: async() => {
            const res = await axiosPublic.get("/totalPaymentCountForPagination");
            setAllPaymentsTotalCount(res?.data);
            return res?.data;
        }
    })

    const handlePrev = () => {
        if (currentPage > 0) {
          setCurrentPage(currentPage - 1);
        }
      }
    
      const handleNext = () => {
        if (currentPage < pages.length - 1) {
          setCurrentPage(currentPage + 1);
        }
      }

    return (
        <>
            <Helmet>
        <title>LIFE-DROP | GIVE FUND</title>
    </Helmet>
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
            funds?.map(fund => <tr key={fund._id}>
                <td className="text-center">{fund.name.toUpperCase()}</td>
                <td className="text-center">{fund.email}</td>
                <td className="text-center">${fund.amount}</td>
                <td className="text-center">{fund.date}</td>
              </tr>)
        }

    </tbody>
  </table>
</div>

        {/* pagination */}
        <div className='flex items-center justify-center gap-3 mt-[80px] mb-[30px]'>

<button className='btn btn-sm bg-white border-red-600 hover:bg-red-500 hover:text-white hover:border-none' onClick={handlePrev}>
  Prev
</button>

{
  pages.map((page, index) => <button onClick={() => setCurrentPage(page)} className={currentPage === page ? "btn btn-sm border-none bg-red-600 text-white hover:bg-red-500" : "btn btn-sm bg-white border-red-600 hover:bg-red-500 hover:text-white hover:border-none"} key={index}>
    {page}
  </button>)
}

<button className='btn btn-sm bg-white border-red-600 hover:bg-red-500 hover:text-white hover:border-none' onClick={handleNext}>
  Next
</button>
</div>

        </div>
        </>
    )
}

export default Payment
