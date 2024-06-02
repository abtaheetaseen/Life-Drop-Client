import { useContext, useState } from 'react'
import { GrLogout } from 'react-icons/gr'
import { AiOutlineBars } from 'react-icons/ai'
import { BsGraphUp } from 'react-icons/bs'
import { NavLink, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../provider/AuthProvider'
import toast from 'react-hot-toast'
import { FaHome, FaUsers } from 'react-icons/fa'
import { FaDeleteLeft } from 'react-icons/fa6'
import { CgProfile } from 'react-icons/cg'
import useAdmin from '../../hooks/useAdmin'

const Sidebar = () => {
  const { logOut } = useContext(AuthContext);
  const [isActive, setActive] = useState(false)

  const navigate = useNavigate();

  const [isAdmin] = useAdmin();

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
              <h1 className='text-xl text-white font-bold'>LIFE-DROP</h1>
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
        }  md:translate-x-0  transition duration-500 ease-in-out`}
      >
        {
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

          {/* Nav Items */}
          <div className='flex flex-col justify-between flex-1 mt-6'>
            {/* Conditional toggle button here.. */}

            <nav>
              {/* Statistics */}
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

              {/* all users */}
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

          {/* Nav Items */}
          <div className='flex flex-col justify-between flex-1 mt-6'>
            {/* Conditional toggle button here.. */}

            
            <nav>
              {/* Statistics */}
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
        }

        <div>
          <hr />

          {/* home */}
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

          {/* Profile Menu */}
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
            className='flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300   hover:text-gray-700 transition-colors duration-300 transform'
          >
            <GrLogout className='w-5 h-5 text-white' />

            <span className='mx-4 font-medium text-white'>Logout</span>
          </button>
        </div>
      </div>
    </>
  )
}

export default Sidebar
