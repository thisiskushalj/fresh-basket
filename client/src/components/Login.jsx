import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const Login = () => {
    const { setshowUserLogin, setUser, axios, navigate } = useAppContext();

    const [state, setState] = useState("login");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [profilePic, setProfilePic] = useState(null);

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        try {
            let response;

            if (state === "register") {
                const formData = new FormData();
                formData.append("name", name);
                formData.append("email", email);
                formData.append("password", password);
                if (profilePic) {
                    formData.append("profilePic", profilePic);
                }

                const config = { headers: { "Content-Type": "multipart/form-data" } };
                response = await axios.post(`/api/user/register`, formData, config);
            } else {
                response = await axios.post(`/api/user/login`, {
                    email,
                    password,
                });
            }

            const { data } = response;

            if (data.success) {
                navigate('/');
                setUser(data.user);
                setshowUserLogin(false);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div onClick={() => setshowUserLogin(false)} className='fixed top-0 bottom-0 left-0 right-0 z-30 flex items-center justify-center text-sm text-gray-600 bg-black/50'>
            <form
                onClick={(e) => e.stopPropagation()}
                onSubmit={onSubmitHandler}
                className="max-w-96 w-full text-center border border-gray-300/60 rounded-2xl px-8 py-10 bg-white shadow-lg"
            >
                <h1 className="text-gray-900 text-3xl font-medium">
                    {state === "login" ? "Login" : "Sign Up"}
                </h1>
                <p className="text-gray-500 text-sm mt-2">
                    {state === "login" ? "Please sign in to continue" : "Create a new account"}
                </p>

                {state === "register" && (
                    <>
                        <div className="flex flex-col items-center w-full mt-6">
                            <label className="text-sm font-medium text-gray-700 mb-2">
                                Profile Picture
                            </label>
                            <div className="relative">
                                <div
                                    className="w-24 h-24 rounded-full border border-gray-300 flex items-center justify-center overflow-hidden cursor-pointer hover:opacity-80 transition"
                                    onClick={() => document.getElementById('profilePicInput').click()}
                                >
                                    {profilePic ? (
                                        <img
                                            src={URL.createObjectURL(profilePic)}
                                            alt="Profile Preview"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <span className="text-xs text-gray-400">Click to add</span>
                                    )}
                                </div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    id="profilePicInput"
                                    onChange={(e) => setProfilePic(e.target.files[0])}
                                    className="hidden"
                                />
                            </div>
                            <p className='mt-2'>Only .jpg , .jpeg and .png files accepted</p>
                        </div>

                        <div className="flex items-center w-full mt-8 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
                            <input
                                type="text"
                                placeholder="Full Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="bg-transparent text-gray-700 placeholder-gray-400 outline-none text-sm w-full h-full"
                                required
                            />
                        </div>
                    </>
                )}

                <div className="flex items-center w-full mt-4 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
                    <svg width="16" height="11" viewBox="0 0 16 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M0 .55.571 0H15.43l.57.55v9.9l-.571.55H.57L0 10.45zm1.143 1.138V9.9h13.714V1.69l-6.503 4.8h-.697zM13.749 1.1H2.25L8 5.356z" fill="#6B7280" />
                    </svg>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-transparent text-gray-700 placeholder-gray-400 outline-none text-sm w-full h-full"
                        required
                    />
                </div>

                <div className="flex items-center mt-4 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
                    <svg width="13" height="17" viewBox="0 0 13 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13 8.5c0-.938-.729-1.7-1.625-1.7h-.812V4.25C10.563 1.907 8.74 0 6.5 0S2.438 1.907 2.438 4.25V6.8h-.813C.729 6.8 0 7.562 0 8.5v6.8c0 .938.729 1.7 1.625 1.7h9.75c.896 0 1.625-.762 1.625-1.7zM4.063 4.25c0-1.406 1.093-2.55 2.437-2.55s2.438 1.144 2.438 2.55V6.8H4.061z" fill="#6B7280" />
                    </svg>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-transparent text-gray-700 placeholder-gray-400 outline-none text-sm w-full h-full"
                        required
                    />
                </div>

                {state === "login" && (
                    <div className="mt-5 text-left text-black">
                        <a className="text-sm cursor-pointer">Forgot password?</a>
                    </div>
                )}

                <button
                    type="submit"
                    className="mt-6 w-full h-11 rounded-full text-white bg-primary hover:bg-primary-dull transition cursor-pointer"
                >
                    {state === "register" ? "Create Account" : "Login"}
                </button>

                <p className="text-gray-500 text-sm mt-3 mb-5">
                    {state === "register" ? (
                        <>
                            Already have an account?{" "}
                            <span onClick={() => setState("login")} className="text-primary cursor-pointer">
                                Login
                            </span>
                        </>
                    ) : (
                        <>
                            Don’t have an account?{" "}
                            <span onClick={() => setState("register")} className="text-primary cursor-pointer">
                                Sign up
                            </span>
                        </>
                    )}
                </p>
            </form>
        </div>
    );
};

export default Login;