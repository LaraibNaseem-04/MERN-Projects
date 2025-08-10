import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { toast } from 'react-toastify';

const  Login = () => {
    const [state, setState] = useState('Login')

    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');


    useEffect(()=>{
      document.body.style.overflow = 'hidden';
      return()=>{
        document.body.style.overflow = 'unset';
      }
    },[])

    const {setShowLogin,backendUrl,setToken,setUser} = useContext(AppContext);

    const modalVariants = {
        hidden: { opacity: 0, y: -50, scale: 0.95 },
        visible: { 
            opacity: 1, y: 0, scale: 1,
            transition: { type: 'spring', stiffness: 400, damping: 30 }
        },
        exit: { 
            opacity: 0, y: 30, scale: 0.95,
            transition: { duration: 0.2 }
        }
    };

    const nameInputVariants = {
        initial: { opacity: 0, height: 0, marginTop: 0 },
        animate: { opacity: 1, height: 'auto', marginTop: '1rem', transition: { duration: 0.3 } },
        exit: { opacity: 0, height: 0, marginTop: 0, transition: { duration: 0.2 } }
    };
    const onSubmitHandler = async(e)=>{
        e.preventDefault();
        try{
             if(state==='Login')
             {
                const {data} =await axios.post(backendUrl+'/api/user/login',{
                    email,
                    password
                });
                if(data.success)
                {
                     setToken(data.token);
                     setUser(data.user);
                     localStorage.setItem('token',data.token);
                     setShowLogin(false);

                }
                else
                {
                    toast.error(data.message);

                }
             }
             else{
                const {data} =await axios.post(backendUrl+'/api/user/register',{
                    name,
                    email,
                    password
                });
                if(data.success)
                {   
                  setToken(data.token)
                  setUser(data.user)
                  localStorage.setItem('token',data.token)
                  setShowLogin(false)
                
                }
                else{
                    toast.error(data.message);
                   }
                }
        }
        catch(error)
        {
               toast.error(error.message);
        }
    }
     
  return (
    <motion.div 
        className='fixed top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
    >
        <motion.form onSubmit={onSubmitHandler}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className='relative bg-white p-8 sm:p-10 rounded-xl text-slate-500 w-[90vw] max-w-md'
        >
            <motion.img whileHover={{ scale: 1.2, rotate: 90 }} onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="Close"  className='absolute top-4 right-4 cursor-pointer h-5 w-5'/>
            <h1 className='text-center text-2xl text-neutral-700 font-medium'>{state} </h1>
            <p className='text-sm'>Welcome back! Please enter your details.</p>
            <AnimatePresence>
             {state!== 'Login' && (
                <motion.div 
                    variants={nameInputVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className='border px-6 py-2 flex items-center gap-2 rounded-full overflow-hidden'
                >
                    <img  className= 'h-5 w-5'src={assets.profile_icon} alt="" />
                    <input onChange={e=>setName(e.target.value)} value={name} type="text" placeholder='Full Name' className='outline-none text-sm w-full bg-transparent' />
                </motion.div>
             )}
            </AnimatePresence>

            <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
                <img  className= 'h-5 w-5'src={assets.email_icon} alt="" />
                <input  onChange={e=>setEmail(e.target.value)} value={email} type="email" placeholder='Email id' className='outline-none text-sm w-full bg-transparent' />
            </div>
            <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
                <img  className= 'h-5 w-5'src={assets.lock_icon} alt="" />
                <input  onChange={e=>setPassword(e.target.value)} value={password} type="password" placeholder='Password' className='outline-none text-sm w-full bg-transparent' />
            </div>
            <a href='#' className='block text-sm text-blue-600 my-4 cursor-pointer hover:underline'>Forgot password?</a>
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className='bg-blue-600 w-full text-white py-2 rounded-full'>{state==="Login" ? 'Sign in': 'Sign up'}</motion.button>
        {state === 'Login' ?
        <p className='mt-5 text-center'>Don't have an account? <motion.span whileHover={{textDecoration: 'underline'}} className='text-blue-600 cursor-pointer'
        onClick={()=>setState('Signup')}>Sign up</motion.span></p>
        :
        <p className='mt-5 text-center'>Already have an account? <motion.span whileHover={{textDecoration: 'underline'}} className='text-blue-600 cursor-pointer'
        onClick={()=>setState('Login')}>Sign in</motion.span></p>}
        </motion.form>
    </motion.div>
  )
}

export default  Login;
