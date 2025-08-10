import { useContext } from 'react';
import { assets } from '../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Navbar = () => {
  const { user,setShowLogin,logout, creditBalance } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <div className='flex items-center justify-between py-4'>
      <Link to='/' className='flex items-center gap-2'>
        <img src={assets.logo} alt="" className='sm:w-28 lg:w-40' />
        <span className='text-xl sm:text-2xl font-semibold text-gray-800'>DreamInk</span>
      </Link>

      <div>
        {user ? (
          <div className='flex items-center gap-2 sm:gap-3'>
            <button
              onClick={() => navigate('/buy')}
              className='flex items-center gap-2 bg-blue-100 px-4 sm:px-6 py-1.5 sm:py-3 rounded-full transition-all duration-700'
>
              <img className='w-5' src={assets.credit_star} alt="" />
              <p className='text-gray-600 max-sm:hidden pl-4'>credit left : {creditBalance}</p>
            </button>
            <p className='text-xs sm:text-sm font-medium text-gray-600'>Hi,{user.name}</p>
            <div className='relative group pb-2'>
              <img src={assets.profile_icon} className='w-10 drop-shadow' alt="" />
              <div className='absolute hidden group-hover:block top-full right-0 z-10 mt-2 w-32 bg-white rounded-md border shadow-lg'>
                <ul className='list-none m-0 p-1 text-sm text-gray-700'>
                  <li onClick={logout} className='py-2 px-4 hover:bg-gray-100 rounded cursor-pointer'>Logout</li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className='flex items-center gap-2 sm:gap-5'>
            <p
              onClick={() => navigate('/buy')}
              className='cursor-pointer'
            >
              Pricing
            </p>
            <button onClick={()=>setShowLogin(true)} className='bg-zinc-800 text-white px-7 py-2 sm:px-10 rounded-full'>Login</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
