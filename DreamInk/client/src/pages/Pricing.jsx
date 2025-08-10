import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { motion } from 'framer-motion';

const Pricing = () => {
    const { initiatePurchase } = useContext(AppContext);

    const plans = [
        { id: 'Basic', name: 'Basic', price: 10, credits: 100, features: ['100 Credits', 'Standard Quality', 'Community Support'] },
        { id: 'Advanced', name: 'Advanced', price: 50, credits: 500, features: ['500 Credits', 'High Quality', 'Priority Support'], popular: true },
        { id: 'Business', name: 'Business', price: 250, credits: 5000, features: ['5000 Credits', '4K Quality', 'Dedicated Support'] }
    ];

    const handlePurchaseClick = (planId) => {
        initiatePurchase(planId);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
            <motion.div 
                className="text-center mb-12"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-4xl md:text-5xl font-bold text-zinc-800">Choose Your Plan</h1>
                <p className="text-lg text-zinc-600 mt-4">Unlock your creativity with more credits.</p>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-8">
                {plans.map((plan, index) => (
                    <motion.div
                        key={plan.id}
                        className={`bg-white rounded-lg shadow-lg p-8 flex flex-col ${plan.popular ? 'border-4 border-blue-500 transform lg:scale-105' : 'border'}`}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                        {plan.popular && <span className="bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full self-start mb-4">POPULAR</span>}
                        <h2 className="text-2xl font-bold text-zinc-800">{plan.name}</h2>
                        <p className="text-4xl font-extrabold text-zinc-900 my-4">${plan.price}</p>
                        <p className="text-zinc-600 mb-6">{plan.credits} Credits</p>
                        <ul className="space-y-4 text-zinc-700 mb-8 flex-grow">
                            {plan.features.map(feature => (
                                <li key={feature} className="flex items-center">
                                    <svg className="w-6 h-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                    {feature}
                                </li>
                            ))}
                        </ul>
                        <motion.button
                            onClick={() => handlePurchaseClick(plan.id)}
                            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                            className={`w-full py-3 rounded-lg font-semibold text-white transition-colors ${plan.popular ? 'bg-blue-500 hover:bg-blue-600' : 'bg-zinc-800 hover:bg-zinc-900'}`}
                        >
                            Purchase
                        </motion.button>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Pricing;