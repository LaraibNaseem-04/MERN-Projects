import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const [showLogin, setShowLogin] = useState(false);
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState(null);
    const [creditBalance, setCreditBalance] = useState(0);
    const navigate = useNavigate();

    const backendUrl = "http://localhost:4000";

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
        setCreditBalance(0);
        navigate("/");
    };

    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    };

    const fetchUserData = async () => {
        if (token) {
            try {
                const response = await axios.get(`${backendUrl}/api/user/credits`, {
                    headers: {
                        token,
                        'Cache-Control': 'no-cache'
                    }
                });
                if (response.data.success) {
                    setCreditBalance(response.data.credits);
                    setUser(response.data.user);
                }
            } catch (error) {
                console.error("Failed to fetch user data", error);
                if (error.response && error.response.status === 401) {
                    localStorage.removeItem("token");
                    setToken(null);
                }
            }
        }
    };

    useEffect(() => {
        if (token) {
            fetchUserData();
        } else {
            setUser(null);
            setCreditBalance(0);
        }
    }, [token]);

    const generateImage = async (prompt) => {
        if (!token) {
            alert("Please log in to generate images.");
            return;
        }
        try {
            const response = await axios.post(`${backendUrl}/api/image/generate-image`, { prompt }, { headers: { token } });
            if (response.data.success) {
                setCreditBalance(response.data.creditBalance);
                return response.data.image;
            }
        } catch (error) {
            console.error("Image generation failed:", error);
            if (error.response && error.response.status === 402) {
                alert("You have insufficient credits. Please purchase more.");
                navigate('/pricing');
            } else {
                alert("Image generation failed. Please try again.");
            }
        }
    };

    const initiatePurchase = async (planId) => {
        if (!token) {
            alert("Please log in to purchase credits.");
            navigate('/login');
            return;
        }

        const res = await loadRazorpayScript();
        if (!res) {
            alert('Razorpay SDK failed to load. Are you online?');
            return;
        }

        try {
            const orderResponse = await axios.post(`${backendUrl}/api/user/pay-razor`, { planId }, { headers: { token } });
            const { order } = orderResponse.data;

            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                amount: order.amount,
                currency: order.currency,
                name: "DreamInk Credits",
                description: `Purchase of ${planId} plan`,
                order_id: order.id,
                handler: async function (response) {
                    try {
                        const verificationResponse = await axios.post(`${backendUrl}/api/user/pay-verify`, {
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_signature: response.razorpay_signature,
                            receipt: order.receipt
                        }, { headers: { token } });

                        if (verificationResponse.data.success) {
                            alert('Payment successful! Credits have been added.');
                            await fetchUserData();
                            navigate('/');
                        } else {
                            alert('Payment verification failed. Please contact support.');
                        }
                    } catch (error) {
                        console.error("Verification failed:", error);
                        alert('An error occurred during payment verification.');
                    }
                },
                prefill: { name: user?.name, email: user?.email },
                theme: { color: "#3b82f6" }
            };

            const rzp = new window.Razorpay(options);
            rzp.open();

        } catch (error) {
            console.error("Purchase initiation failed:", error);
            alert("Could not initiate purchase. Please try again later.");
        }
    };

    const contextValue = {
        token,
        setToken,
        user,
        setUser,
        creditBalance,
        generateImage,
        initiatePurchase,
        backendUrl,
        showLogin,
        setShowLogin,
        logout,
    };

    return <AppContext.Provider value={contextValue}>{props.children}</AppContext.Provider>;
};

export default AppContextProvider;