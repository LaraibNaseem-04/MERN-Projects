import React, { useContext } from 'react'
import { assets, plans } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { motion } from 'framer-motion'

const BuyCredit = () => {
  const { user, initiatePurchase, setShowLogin } = useContext(AppContext)

  const handlePurchaseClick = (planId) => {
    if (!user) {
      setShowLogin(true);
    } else {
      initiatePurchase(planId);
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <motion.div
      className='min-h-[80vh] text-center pt-14 mb-10 flex flex-col items-center'
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.button
        variants={itemVariants}
        className='border border-gray-400 px-10 py-2 rounded-full mb-6'
      >
        Our Plans
      </motion.button>

      <motion.h1
        variants={itemVariants}
        className='text-center text-3xl font-medium mb-6 sm:mb-10'
      >
        Choose the Plan
      </motion.h1>

      <motion.div
        className='flex flex-col md:flex-row justify-center items-center md:items-end gap-8'
        variants={containerVariants}
      >
        {plans.map((item) => (
          <motion.div
            key={item.id}
            variants={itemVariants}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className={`rounded-lg shadow-lg p-8 w-full max-w-sm ${item.id === 'Pro'
              ? 'bg-slate-800 text-white md:scale-105'
              : 'bg-white'
              }`}
          >
            <div className='flex justify-center'>
              <img src={assets.credit_star} alt='' className='h-12 w-12 mb-4' />
            </div>

            <h2
              className={`text-2xl font-semibold mb-2 ${item.id === 'Pro'
                ? 'text-white'
                : 'text-gray-800'
                }`}
            >
              {item.id}
            </h2>

            <p
              className={`mb-4 ${item.id === 'Pro'
                ? 'text-slate-300'
                : 'text-gray-600'
                }`}
            >
              {item.desc}
            </p>

            <p
              className={`font-bold text-lg ${item.id === 'Pro'
                ? 'text-white'
                : 'text-gray-700'
                }`}
            >
              ₹{item.price} / {item.credits} Credits
            </p>

            <motion.button onClick={() => handlePurchaseClick(item.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`mt-6 font-bold py-2 px-8 rounded-full w-full ${item.id === 'Pro'
                ? 'bg-white text-slate-800'
                : 'bg-blue-500 text-white'
                }`}
            >
              {user ? 'Purchase' : 'Get Started'}
            </motion.button>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}

export default BuyCredit
