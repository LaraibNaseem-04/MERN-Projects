import { useContext } from 'react';
import { assets } from '../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Navbar = () => {
  const { user } = useContext(AppContext);
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
              <p className='text-gray-600 max-sm:hidden pl-4'>credit left : 50</p>
            </button>
            <p className='text-xs sm:text-sm font-medium text-grey 600'>Hi,LaraibNaseem</p>
            <div className='relative group'>
              <img src={assets.profile_icon} className='w-10 drop-shadow' alt="" />
              <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12'>
                <ul className='list-none m-0 p-2 bg-white rounded-md border text-sm'>
                  <li className='py-1 px-2 '>Logout</li>
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
            <button className='bg-zinc-800 text-white px-7 py-2 sm:px-10 rounded-full'>Login</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
