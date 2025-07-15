import React, { useState } from 'react';

const NewsLetter = () => {
    const [showAlert, setShowAlert] = useState(false);
    const [email, setEmail] = useState(""); // state to control input

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (!email.trim()) return;

        setShowAlert(true);
        setEmail(""); // clear email after submit

        setTimeout(() => {
            setShowAlert(false);
        }, 2000);
    };

    return (
        <div className="relative flex flex-col items-center justify-center text-center space-y-4 py-10 px-4 w-full mt-10">
            {/* Floating alert */}
            {showAlert && (
                <div className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50 bg-primary text-white px-6 py-2 rounded-full shadow-md animate-fadeInOut">
                    Subscribed successfully!
                </div>
            )}

            <h1 className="md:text-4xl text-2xl font-semibold text-primary-dull">Never Miss a Deal!</h1>
            <p className="md:text-lg text-gray-500/80 pb-6">
                Fresh offers. Fresh arrivals. Fresh Basket.
            </p>
            <form
                onSubmit={handleSubscribe}
                className="flex items-center justify-between max-w-2xl w-full md:h-13 h-12"
            >
                <input
                    className="border border-gray-300 rounded-md h-full border-r-0 outline-none w-full rounded-r-none px-4 text-gray-600"
                    type="email"
                    placeholder="Enter your email id"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button
                    type="submit"
                    className="md:px-10 px-6 h-full text-white bg-primary hover:bg-primary-dull transition-all cursor-pointer rounded-md rounded-l-none"
                >
                    Subscribe
                </button>
            </form>

            {/* Animation styling */}
            <style>{`
                @keyframes fadeInOut {
                    0% { opacity: 0; transform: translateY(-10px); }
                    10% { opacity: 1; transform: translateY(0); }
                    90% { opacity: 1; transform: translateY(0); }
                    100% { opacity: 0; transform: translateY(-10px); }
                }

                .animate-fadeInOut {
                    animation: fadeInOut 2s ease-in-out forwards;
                }
            `}</style>
        </div>
    );
};

export default NewsLetter;