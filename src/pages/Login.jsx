import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../provider/AuthProvider';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet-async';

const Login = () => {

    const { signInUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        // sign in
        signInUser(email, password)
            .then((result) => {
                console.log(result.user)
                form.reset();
                toast.success("User logged in successfully")
                navigate("/");

            })
            .catch((error) => {
                toast.error(error.message)
                form.reset()
            });
    }

  return (
    <>
    <Helmet>
        <title>LIFE-DROP | LOGIN</title>
    </Helmet>
    
    <section className="bg-white min-h-screen">
    <div className="container flex items-center justify-center min-h-screen px-6 mx-auto">
        <form onSubmit={handleLogin} className="w-full max-w-md">
            <h1 className='font-bold text-red-600'>* LIFE-DROP</h1>

            <h1 className="mt-3 text-2xl font-semibold text-gray-800 capitalize sm:text-3xl dark:text-white">LOGIN</h1>

            <div className="relative flex items-center mt-8">
                <span className="absolute">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                </span>

                <input type="email" name='email' className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-red-400 dark:focus:border-red-300 focus:ring-red-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Email address" />
            </div>

            <div className="relative flex items-center mt-4">
                <span className="absolute">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                </span>

                <input type="password" name='password' className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-red-400 dark:focus:border-red-300 focus:ring-red-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Password" />
            </div>

            <div className="mt-6">
                <input className="cursor-pointer w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-red-600 rounded-lg hover:bg-red-500" type="submit" value="Login" />

                <div className="mt-6 text-center ">
                    <Link to="/register" className="text-sm text-red-600 hover:underline dark:text-red-600">
                        Don't have an account yet? Register
                    </Link>
                </div>
            </div>
        </form>
    </div>
</section>
</>
  )
}

export default Login
