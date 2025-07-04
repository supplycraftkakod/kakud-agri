import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
// import goolgeImg from "../assets/icons/googleImg.png"
// import Header from '../components/Header';
import toast from 'react-hot-toast';
import Loader from '../components/Loader';
import { BE_URL } from "../../config"
import showIcon from "../assets/icons/show.png"
import hideIcon from "../assets/icons/hide.png"
import Navbar from '../components/Navbar';

const SignIn: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [isShowHide, setIsShowHide] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post(`${BE_URL}/api/v1/auth/login`, {
                email,
                password,
            });
            //@ts-ignore
            localStorage.setItem('token', response.data.token);
            toast.success('Signin successfully!')
            setLoading(false);
            navigate("/")
        } catch (error) {
            toast.error('Please check your email or password!')
            setLoading(false);
        }
    };

    // const handleGoogleSignIn = () => {
    //     window.location.href = `${BE_URL}/auth/google`; // Redirect to backend Google login
    // };

    if (loading) {
        return <Loader />
    }

    return (
        <div className="w-full font-inter overflow-hidden">
            <div className="relative z-20">
                <Navbar />
            </div>
            <div className="w-full pt-20 mt-20 sm:pt-8 px-6 flex items-center justify-center pb-20">
                <div className="w-[400px] h-fit flex flex-col items-center border-[1px] p-6 border-gray-400 rounded-2xl">
                    <h2 className="text-[1.5rem] font-extrabold">Welcome Back!</h2>
                    <h2 className="text-[1.1rem] font-light mb-8">To get started signin to your account.</h2>
                    <form onSubmit={handleSubmit} className='w-full'>
                        <input
                            className="w-full px-4 py-3 rounded-md !outline-none placeholder:text-[0.9rem] mb-4 border-[1px] border-gray-300 bg-gray-50"
                            type="email"
                            placeholder="Enter our email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <div className="relative flex items-center w-full">
                            <input
                                className="flex-1 px-4 py-3 rounded-md !outline-none placeholder:text-[0.9rem] mb-4 border-[1px] border-gray-300 bg-gray-50"
                                type={`${isShowHide ? "text" : "password"}`}
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <div onClick={() => setIsShowHide(!isShowHide)}
                                className="show-hide absolute top-[15%] right-3 w-[2rem] h-[2rem] ml-2 flex items-center justify-center cursor-pointer">
                                {
                                    isShowHide ? <img src={hideIcon} alt="hide" /> : <img src={showIcon} alt="show" />
                                }
                            </div>
                        </div>
                        <button type="submit" className="w-full px-4 py-3 rounded-md bg-[#171717] text-white">Sign In</button>
                    </form>

                    {/* <div className="flex items-center gap-2 py-5">
                        <div className="w-[100px] h-[1px] bg-gray-300"></div>
                        <h2 className="text-gray-400 text-[0.8rem]">Or Sign in with</h2>
                        <div className="w-[100px] h-[1px] bg-gray-300"></div>
                    </div>

                    <button onClick={handleGoogleSignIn} className="flex items-center justify-center gap-4 w-full px-4 py-3 rounded-md font-medium border-gray-300 border-[1px] cursor-pointer mb-6">
                        <img src={goolgeImg} alt="img" className="w-[30px] h-[30px]" />
                        <div>Sign In with Google</div>
                    </button> */}

                    <Link to={"/signup"}><p className='pt-3'>Don't have account? <span className='text-blue-500'>Signup</span></p></Link>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
