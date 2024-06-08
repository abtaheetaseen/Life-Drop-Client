import { useContext, useState } from 'react'
import { GrLogout } from 'react-icons/gr'
import { AiOutlineBars } from 'react-icons/ai'
import { BsGraphUp } from 'react-icons/bs'
import { NavLink, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../provider/AuthProvider'
import toast from 'react-hot-toast'
import { FaBlog, FaHome, FaUsers } from 'react-icons/fa'
import { FaCodePullRequest, FaDeleteLeft } from 'react-icons/fa6'
import { CgProfile } from 'react-icons/cg'
import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from '../../hooks/useAxiosSecure'
import { IoCreate } from 'react-icons/io5'
import { BiSolidDonateHeart } from 'react-icons/bi'
import { MdArticle, MdDashboardCustomize } from 'react-icons/md'
import { IoMdLogOut } from 'react-icons/io'

const Sidebar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isActive, setActive] = useState(false);
  const axiosSecure = useAxiosSecure();

  const {data} = useQuery({
    queryKey: ["profileUser", user?.email],
    queryFn: async() => {
        const res = await axiosSecure.get(`/users?email=${user?.email}`)
        return res.data;
    }
})

  const navigate = useNavigate();

//   const [isAdmin] = useAdmin();

  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.success("User logged out")
        navigate("/login")

      })
      .catch(error => {
        console.log(error)
      })
  }

  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive)
  }
  return (
    <>
      {/* Small Screen Navbar */}
      <div className='bg-red-600 text-gray-800 flex justify-between md:hidden'>
        <div>
          <div className='block cursor-pointer p-4 font-bold'>
            <Link to='/'>
              <h1 className='text-xl text-white font-bold tracking-widest'>LIFE-DROP</h1>
            </Link>
          </div>
        </div>

        <span
          onClick={handleToggle}
          className='p-4 cursor-pointer'
        >
            {
                isActive ? 
                <AiOutlineBars className='h-5 w-5 text-white' />
                :
                <FaDeleteLeft className='h-5 w-5 text-white' />
            }
          
        </span>
      </div>

      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-red-600 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform min-h-screen  ${
          isActive && '-translate-y-full'
        }  md:translate-y-0  transition duration-500 ease-in-out`}
      >
        {/* {
            isAdmin ? 
            <>
                <div>
          <div>
            <div className='w-full hidden md:flex px-4 py-2 justify-start items-center mx-auto'>
              <Link to='/'>
              <h1 className='text-xl text-white font-bold'>LIFE-DROP</h1>
              </Link>
            </div>
          </div>

          
          <div className='flex flex-col justify-between flex-1 mt-6'>

            <nav>
              
              <NavLink
                to='/dashboard'
                end
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 my-5  transition-colors duration-300  ${
                    isActive ? 'bg-black rounded-xl' : 'bg-transparent'
                  }`
                }
              >
                <BsGraphUp className='w-5 h-5 text-white' />

                <span className='mx-4 font-medium text-white'>Statistics</span>
              </NavLink>

             
              <NavLink
                to='allUsers'
                className={({ isActive }) =>
                    `flex items-center px-4 py-2 my-5  transition-colors duration-300  ${
                        isActive ? 'bg-black rounded-xl' : 'bg-transparent'
                      }`
                }
              >
                <FaUsers className='w-5 h-5 text-white' />

                <span className='mx-4 font-medium text-white'>All Users</span>
              </NavLink>
            </nav>
          </div>
        </div>
            </> :
            <>
            <div>
          <div>
            <div className='w-full hidden md:flex px-4 py-2 shadow-lg rounded-lg justify-center items-center bg-rose-100 mx-auto'>
              <Link to='/'>
              <h1 className='text-xl text-red-600 font-bold'>LIFE-DROP</h1>
              </Link>
            </div>
          </div>

          <div className='flex flex-col justify-between flex-1 mt-6'>

            
            <nav>
              <NavLink
                to='/dashboard'
                end
                className={({ isActive }) =>
                    `flex items-center px-4 py-2 my-5  transition-colors duration-300  ${
                        isActive ? 'bg-black rounded-xl' : 'bg-transparent'
                      }`
                }
              >
                <BsGraphUp className='w-5 h-5 text-white' />

                <span className='mx-4 font-medium text-white'>Statistics</span>
              </NavLink>
            </nav>
          </div>
        </div>
            </>
        } */}

        {/* admin routes */}
        {
            data?.role === "admin" && 
            <>
                <div>
                <div>
            <div className='w-full hidden md:flex px-4 py-2 shadow-lg rounded-lg justify-center items-center bg-rose-100 mx-auto'>
              <Link to='/'>
              <h1 className='text-xl text-red-600 font-bold'>LIFE-DROP</h1>
              </Link>
            </div>
          </div>

          
          <div className='flex flex-col justify-between flex-1 mt-6'>

            <nav>
              
              <NavLink
                to='admin-dashboard'
                end
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 my-5  transition-colors duration-300  ${
                    isActive ? 'bg-black rounded-xl' : 'bg-transparent'
                  }`
                }
              >
                <MdDashboardCustomize className='w-5 h-5 text-white' />

                <span className='mx-4 font-medium text-white'>Dashboard</span>
              </NavLink>

             
              <NavLink
                to='allUsers'
                className={({ isActive }) =>
                    `flex items-center px-4 py-2 my-5  transition-colors duration-300  ${
                        isActive ? 'bg-black rounded-xl' : 'bg-transparent'
                      }`
                }
              >
                <FaUsers className='w-5 h-5 text-white' />

                <span className='mx-4 font-medium text-white'>All Users</span>
              </NavLink>

              <NavLink
                to='all-blood-donation-request'
                className={({ isActive }) =>
                    `flex items-center px-4 py-2 my-5  transition-colors duration-300  ${
                        isActive ? 'bg-black rounded-xl' : 'bg-transparent'
                      }`
                }
              >
                <BiSolidDonateHeart className='w-6 h-6 text-white' />

                <span className='mx-4 font-medium text-white'>All Blood Donation Requests</span>
              </NavLink>

              <NavLink
                to='content-management'
                className={({ isActive }) =>
                    `flex items-center px-4 py-2 my-5  transition-colors duration-300  ${
                        isActive ? 'bg-black rounded-xl' : 'bg-transparent'
                      }`
                }
              >
                <MdArticle className='w-5 h-5 text-white' />

                <span className='mx-4 font-medium text-white'>Content Management</span>
              </NavLink>
            </nav>
          </div>
        </div>
            </>
        }

        {/* user/donor routes */}
        {
            data?.role === "donor" &&
            <>
            <div>
          <div>
            <div className='w-full hidden md:flex px-4 py-2 shadow-lg rounded-lg justify-center items-center mx-auto'>
              <Link to='/'>
              <h1 className='text-xl text-white font-bold'>LIFE-DROP</h1>
              </Link>
            </div>
          </div>

          <div className='flex flex-col justify-between flex-1 mt-6'>
            
            <nav>
              <NavLink
                to='donor-dashboard'
                end
                className={({ isActive }) =>
                    `flex items-center px-4 py-2 my-5  transition-colors duration-300  ${
                        isActive ? 'bg-black rounded-xl' : 'bg-transparent'
                      }`
                }
              >
                <MdDashboardCustomize className='w-5 h-5 text-white' />

                <span className='mx-4 font-medium text-white'>Dashboard</span>
              </NavLink>
            </nav>

            <nav>
              <NavLink
                to='/dashboard/my-donation-requests'
                end
                className={({ isActive }) =>
                    `flex items-center px-4 py-2 my-5  transition-colors duration-300  ${
                        isActive ? 'bg-black rounded-xl' : 'bg-transparent'
                      }`
                }
              >
                <BiSolidDonateHeart className='w-5 h-5 text-white' />

                <span className='mx-4 font-medium text-white'>My Donation Request</span>
              </NavLink>
            </nav>

            <nav>
              <NavLink
                to='/dashboard/create-donation-requests'
                end
                className={({ isActive }) =>
                    `flex items-center px-4 py-2 my-5  transition-colors duration-300  ${
                        isActive ? 'bg-black rounded-xl' : 'bg-transparent'
                      }`
                }
              >
                <IoCreate className='w-5 h-5 text-white' />

                <span className='mx-4 font-medium text-white'>Create Donation Request</span>
              </NavLink>
            </nav>
          </div>
        </div>
            </>
        }

        {/* volunteer routes */}
        {
            data?.role === "volunteer" &&
            <>
            <div>
          <div>
            <div className='w-full hidden md:flex px-4 py-2 shadow-lg rounded-lg justify-center items-center bg-rose-100 mx-auto'>
              <Link to='/'>
              <h1 className='text-xl text-red-600 font-bold'>LIFE-DROP</h1>
              </Link>
            </div>
          </div>

          <div className='flex flex-col justify-between flex-1 mt-6'>
            
            <nav>
              <NavLink
                to='volunteer-dashboard'
                end
                className={({ isActive }) =>
                    `flex items-center px-4 py-2 my-5  transition-colors duration-300  ${
                        isActive ? 'bg-black rounded-xl' : 'bg-transparent'
                      }`
                }
              >
                <MdDashboardCustomize className='w-5 h-5 text-white' />

                <span className='mx-4 font-medium text-white'>Dashboard</span>
              </NavLink>
            </nav>

            <nav>
              <NavLink
                to='/dashboard/volunteer-all-donation-requests'
                end
                className={({ isActive }) =>
                    `flex items-center px-4 py-2 my-5  transition-colors duration-300  ${
                        isActive ? 'bg-black rounded-xl' : 'bg-transparent'
                      }`
                }
              >
                <BiSolidDonateHeart className='w-5 h-5 text-white' />

                <span className='mx-4 font-medium text-white'>All Donation Request</span>
              </NavLink>
            </nav>

            <nav>
              <NavLink
                to='/dashboard/volunteer-content-management'
                end
                className={({ isActive }) =>
                    `flex items-center px-4 py-2 my-5  transition-colors duration-300  ${
                        isActive ? 'bg-black rounded-xl' : 'bg-transparent'
                      }`
                }
              >
                <MdArticle className='w-5 h-5 text-white' />

                <span className='mx-4 font-medium text-white'>Content Management</span>
              </NavLink>
            </nav>


          </div>
        </div>
            </>
        }

        <div>
          <hr />

          
          <NavLink
            to='/'
            className={({ isActive }) =>
                `flex items-center px-4 py-2 my-5  transition-colors duration-300  ${
                    isActive ? 'bg-black rounded-xl' : 'bg-transparent'
                  }`
            }
          >
            <FaHome className='w-5 h-5 text-white' />

            <span className='mx-4 font-medium text-white'>Home</span>
          </NavLink>

          
          <NavLink
            to='/dashboard/profile'
            className={({ isActive }) =>
                `flex items-center px-4 py-2 my-5  transition-colors duration-300  ${
                    isActive ? 'bg-black rounded-xl' : 'bg-transparent'
                  }`
            }
          >
            <CgProfile className="w-5 h-5 text-white" />

            <span className='mx-4 font-medium text-white'>Profile</span>
          </NavLink>
          <button
            onClick={handleLogOut}
            className='flex w-full items-center px-4 py-2 mt-5 hover:bg-black hover:rounded-xl transition-colors duration-300 transform'
          >
            <IoMdLogOut className='w-5 h-5 text-white' />

            <span className='mx-4 font-medium text-white'>Logout</span>
          </button>
        </div>
      </div>
    </>
  )
}

export default Sidebar
