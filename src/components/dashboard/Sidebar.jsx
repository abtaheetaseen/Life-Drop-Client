import { useContext, useState } from 'react'
import { GrLogout } from 'react-icons/gr'
import { FcSettings } from 'react-icons/fc'
import { BsFillHouseAddFill } from 'react-icons/bs'
import { AiOutlineBars } from 'react-icons/ai'
import { BsGraphUp } from 'react-icons/bs'
import { NavLink, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../provider/AuthProvider'
import toast from 'react-hot-toast'
import { IoFastFood } from 'react-icons/io5'
import { RiReservedFill } from 'react-icons/ri'
import { MdRestaurantMenu } from 'react-icons/md'
import { FaBook, FaList, FaUsers } from 'react-icons/fa'
import { FaDeleteLeft } from 'react-icons/fa6'

const Sidebar = () => {
  const { logOut } = useContext(AuthContext);
  const [isActive, setActive] = useState(false)

  const navigate = useNavigate();

  const isAdmin = true;

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
      <div className='bg-gray-100 text-gray-800 flex justify-between md:hidden'>
        <div>
          <div className='block cursor-pointer p-4 font-bold'>
            <Link to='/'>
              <h1 className='text-xl text-red-600 font-bold'>LIFE-DROP</h1>
            </Link>
          </div>
        </div>

        <span
          onClick={handleToggle}
          className='p-4 cursor-pointer'
        >
          
          {
            isActive ? 
            <AiOutlineBars className='h-5 w-5' /> 
            : 
            <FaDeleteLeft className='h-5 w-5' />
          }
        </span>
      </div>

      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-gray-100 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform min-h-screen  ${
          isActive && '-translate-y-full'
        }  md:translate-x-0  transition duration-200 ease-in-out`}
      >
        {
            isAdmin ? 
            <>
                <div>
          <div>
            <div className='w-full hidden md:flex px-4 py-2 justify-start items-center mx-auto'>
              <Link to='/'>
              <h1 className='text-xl text-red-600 font-bold'>LIFE-DROP</h1>
              </Link>
            </div>
          </div>

          {/* Nav Items */}
          <div className='flex flex-col justify-between flex-1 mt-6'>
            {/* Conditional toggle button here.. */}

            {/*  Menu Items */}
            <nav>
              {/* Statistics */}
              <NavLink
                to='/dashboard'
                end
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                    isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'
                  }`
                }
              >
                <BsGraphUp className='w-5 h-5' />

                <span className='mx-4 font-medium'>Statistics</span>
              </NavLink>

              {/* Add food */}
              <NavLink
                to='addFood'
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                    isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'
                  }`
                }
              >
                <BsFillHouseAddFill className='w-5 h-5' />

                <span className='mx-4 font-medium'>Add Food</span>
              </NavLink>
              {/* manage items*/}
              <NavLink
                to='manageItems'
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                    isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'
                  }`
                }
              >
                <FaList className='w-5 h-5' />

                <span className='mx-4 font-medium'>Manage Items</span>
              </NavLink>

              {/* Reservations */}
              <NavLink
                to='manageReservations'
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                    isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'
                  }`
                }
              >
                <FaBook className='w-5 h-5' />

                <span className='mx-4 font-medium'>All Reservations</span>
              </NavLink>

              {/* all users */}
              <NavLink
                to='allUsers'
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                    isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'
                  }`
                }
              >
                <FaUsers className='w-5 h-5' />

                <span className='mx-4 font-medium'>All Users</span>
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

          {/* Nav Items */}
          <div className='flex flex-col justify-between flex-1 mt-6'>
            {/* Conditional toggle button here.. */}

            {/*  Menu Items */}
            <nav>
              {/* Statistics */}
              <NavLink
                to='/dashboard'
                end
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                    isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'
                  }`
                }
              >
                <BsGraphUp className='w-5 h-5' />

                <span className='mx-4 font-medium'>Statistics</span>
              </NavLink>

              {/* My orders */}
              <NavLink
                to='myOrderedFoodItems'
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                    isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'
                  }`
                }
              >
                <IoFastFood className='w-5 h-5' />

                <span className='mx-4 font-medium'>My Orders</span>
              </NavLink>

              {/* Reservations */}
              <NavLink
                to='myReservation'
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                    isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'
                  }`
                }
              >
                <RiReservedFill className='w-5 h-5' />

                <span className='mx-4 font-medium'>My Reservation</span>
              </NavLink>
            </nav>
          </div>
        </div>
            </>
        }

        <div>
          <hr />

          {/* menu */}
          <NavLink
            to='/allFoods'
            className={({ isActive }) =>
              `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'
              }`
            }
          >
            <MdRestaurantMenu className='w-5 h-5' />

            <span className='mx-4 font-medium'>Menu</span>
          </NavLink>

          {/* Profile Menu */}
          <NavLink
            to='/dashboard/profile'
            className={({ isActive }) =>
              `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                isActive ? 'bg-gray-300  text-gray-700' : 'text-gray-600'
              }`
            }
          >
            <FcSettings className='w-5 h-5' />

            <span className='mx-4 font-medium'>Profile</span>
          </NavLink>
          <button
            onClick={handleLogOut}
            className='flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300   hover:text-gray-700 transition-colors duration-300 transform'
          >
            <GrLogout className='w-5 h-5' />

            <span className='mx-4 font-medium'>Logout</span>
          </button>
        </div>
      </div>
    </>
  )
}

export default Sidebar
