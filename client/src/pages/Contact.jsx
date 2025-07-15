import React, { useState } from 'react';

const Contact = () => {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch("https://formspree.io/f/xzzglqvy", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            setIsSubmitted(true);
            setFormData({ name: "", email: "", message: "" });
            setTimeout(() => setIsSubmitted(false), 3000);
        }
    };

    return (
        <>
            {/* Smooth Top Notification */}
            <div className="relative z-50">
                <div
                    className={`fixed left-1/2 transform -translate-x-1/2 top-6 transition-all duration-500 ease-in-out ${isSubmitted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6 pointer-events-none"
                        }`}
                >
                    <div className="bg-primary text-white px-4 py-1.5 rounded-full shadow-lg text-sm md:text-base font-medium whitespace-nowrap max-w-[90vw] overflow-hidden text-ellipsis">
                        🎉 Message sent successfully!
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col items-center text-sm mt-28">
                <p className="text-lg text-gray-700 font-medium pb-2">Contact Us</p>
                <h1 className="text-4xl font-semibold text-primary pb-4">Get in touch with us</h1>
                <p className="text-sm text-gray-500 text-center pb-10">
                    We’d love to hear from you! Whether it’s feedback, questions, or support — we’re here to help.<br />
                    Reach out to us anytime and we’ll make sure your grocery experience stays smooth and satisfying.
                </p>

                <div className="flex flex-col md:flex-row items-center gap-8 w-[350px] md:w-[700px]">
                    <div className="w-full">
                        <label className="text-black/70" htmlFor="name">Your Name</label>
                        <input
                            className="h-12 p-2 mt-2 w-full border border-gray-500/30 rounded outline-none focus:border-indigo-300"
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="w-full">
                        <label className="text-black/70" htmlFor="email">Your Email</label>
                        <input
                            className="h-12 p-2 mt-2 w-full border border-gray-500/30 rounded outline-none focus:border-indigo-300"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="mt-6 w-[350px] md:w-[700px]">
                    <label className="text-black/70" htmlFor="message">Message</label>
                    <textarea
                        className="w-full mt-2 p-2 h-40 border border-gray-500/30 rounded resize-none outline-none focus:border-indigo-300"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit" className="mt-5 cursor-pointer bg-primary text-white h-12 w-56 px-4 rounded active:scale-95 transition">
                    Send Message
                </button>
            </form>
        </>
    );
};

export default Contact;