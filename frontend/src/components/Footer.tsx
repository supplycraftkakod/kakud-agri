import instagram from "../assets/icons/instagram.png"
import facebook from "../assets/icons/facebook.png"
import linkedIn from "../assets/icons/linkedin.png"
import { Link } from "react-router-dom"
import { FiYoutube } from "react-icons/fi"

import footerImg from "../assets/images/hero-bg-1.png"
import { useState } from "react"
import toast from "react-hot-toast"
import axios from "axios"
import { BE_URL } from "../../config"
import Loader from "./Loader"

const Footer = ({ heading, subHeading }: { heading?: string, subHeading?: string }) => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubscribe = async () => {
        if (!email) {
            toast.error("Please enter a valid email.");
            return;
        }

        try {
            setLoading(true);
            const response = await axios.post<any>(`${BE_URL}/api/v1/subscribe`, {
                email,
            });

            if (response.data.message) {
                toast.success("Subscribed successfully!");
            }
            setEmail("");
            setLoading(false);
        } catch (error: any) {
            if (error.response?.data?.message) {
                toast.success(error.response.data.message)
            } else {
                toast.success("Email already subscribed!")
            }
            setEmail("");
            setLoading(false);
        }
    };

    return (
        <div
            id="footer"
            className="w-full sm:min-h-screen font-geist px-[1rem] sm:px-[2rem] py-10 flex flex-col justify-between bg-no-repeat gap-10 bg-cover"
        // style={{
        //     backgroundImage: `url(${footerImg})`,
        //     backgroundPosition: "center bottom",
        // }}
        >
            <div>
                <div
                    className="bg-no-repeat min-h-[20rem] sm:min-h-[13rem] gap-10 flex flex-col justify-between bg-cover p-4 rounded-xl overflow-hidden"
                    style={{
                        backgroundImage: `url(${footerImg})`,
                        backgroundPosition: "center top",
                    }}
                >
                    <div>
                        {
                            heading ? (
                                <div className="pb-2 text-2xl tracking-wide">
                                    <h2>{heading}</h2>
                                </div>
                            ) : (
                                <div className="pb-2 text-2xl tracking-wide">
                                    <h2>Get in touch today and take your farming to the next level with Kakud Agri!</h2>
                                </div>

                            )}
                        {
                            subHeading &&
                            <div className="sm:text-2xl tracking-wide">
                                <h2>{subHeading}</h2>
                            </div>
                        }
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <input
                            placeholder="Enter your email"
                            type="email"
                            name="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="!outline-none px-2 py-1 rounded-lg bg-transparent border border-gray-400 !placeholder-black"
                        />
                        <button
                            onClick={handleSubscribe}
                            disabled={loading}
                            className={`w-fit px-3 py-1 border  rounded-lg self-end transition ${loading ? "bg-gray-500 cursor-not-allowed" : "bg-white"
                                } text-black`}
                        >
                            {loading ? <Loader /> : "Subscribe"}
                        </button>
                    </div>
                </div>


                <div className="px-4 pt-12 sm:pt-10">
                    <div className="w-full grid grid-cols-1 md:grid-cols-[2fr,1fr,1fr,1fr] lg:grid-cols-[1.5fr,1fr,1fr,1fr] gap-x-10 gap-y-14">
                        <div className="font-light">
                            <h2 className="text-2xl">Kakud</h2>
                            <h4 >Tel: 123-456-7890</h4>
                            <h4 >Email: info@kakudagri.in</h4>
                            <h4 className="pt-3">
                                <span className="font-bold">Corporate Office</span> - C/o Sandbox Startup, Next to Airport, Gokul Road, Opp Gokul Village, HUBLI,
                                Dharwad, Karnataka, India, 580030
                            </h4>
                        </div>

                        <div className="md:mx-auto hidden md:block">
                            <h2 className="text-lg pb-4">Company</h2>
                            <div className="flex flex-col">
                                <Link to={"/about"}
                                    className="text-gray-700 hover:text-black"
                                >
                                    About Us
                                </Link>
                                <Link to={"/services"}
                                    className="text-gray-700 hover:text-black"
                                >
                                    Services
                                </Link>
                                <Link to={"/our-impact"}
                                    className="text-gray-700 hover:text-black"
                                >
                                    Impact
                                </Link>
                            </div>
                        </div>

                        <div className="md:mx-auto hidden md:block">
                            <h2 className="text-lg pb-4">Resources</h2>
                            <div className="flex flex-col">
                                <Link to={"/blogs"}
                                    className="text-gray-700 hover:text-black"
                                >
                                    Blogs
                                </Link>
                                <Link to={"/events"}
                                    className="text-gray-700 hover:text-black"
                                >
                                    Events
                                </Link>

                                <Link to={"/our-team"}
                                    className="text-gray-700 hover:text-black"
                                >
                                    Kakud Team
                                </Link>
                                <Link to={"/careers"}
                                    className="text-gray-700 hover:text-black"
                                >
                                    Careers
                                </Link>
                            </div>
                        </div>
                        <div className="md:mx-auto hidden md:block">
                            <h2 className="text-lg pb-4">Socials</h2>
                            <div className="flex flex-col gap-2">
                                <a href="https://www.facebook.com/Kakudpostharvest?mibextid=rS40aB7S9Ucbxw6v" target="_blank">
                                    <img src={facebook} alt="facebook" className="w-5" />
                                </a>
                                <a href="https://www.instagram.com/kakud_agri_center/" target="_blank">
                                    <img src={instagram} alt="instagram" className="w-5" />
                                </a>
                                <a href="https://www.linkedin.com/company/kakud-agri/" target="_blank">
                                    <img src={linkedIn} alt="linkedIn" className="w-5" />
                                </a>
                                <a href="https://youtube.com/@kakudagri?si=Mt-eO04xfQHZSowY" target="_blank">
                                    <FiYoutube className="w-5 h-5 p-[2px] rounded-full bg-black text-white" />
                                </a>
                            </div>
                        </div>

                        {/* mobile */}
                        <div className="flex md:hidden justify-between gap-10 flex-wrap">
                            <div className="md:mx-auto">
                                <h2 className="text-lg pb-2">Company</h2>
                                <div className="flex flex-col">
                                    <Link to={"/about"}
                                        className="text-gray-700 hover:text-black"
                                    >
                                        About Us
                                    </Link>
                                    <Link to={"/services"}
                                        className="text-gray-700 hover:text-black"
                                    >
                                        Services
                                    </Link>
                                    <Link to={"/our-impact"}
                                        className="text-gray-700 hover:text-black"
                                    >
                                        Impact
                                    </Link>
                                </div>
                            </div>

                            <div className="md:mx-auto">
                                <h2 className="text-lg pb-2">Resources</h2>
                                <div className="flex flex-col">
                                    <Link to={"/blogs"}
                                        className="text-gray-700 hover:text-black"
                                    >
                                        Blogs
                                    </Link>
                                    <Link to={"/events"}
                                        className="text-gray-700 hover:text-black"
                                    >
                                        Events
                                    </Link>

                                    <Link to={"/our-team"}
                                        className="text-gray-700 hover:text-black"
                                    >
                                        Kakud Team
                                    </Link>
                                    <Link to={"/careers"}
                                        className="text-gray-700 hover:text-black"
                                    >
                                        Careers
                                    </Link>
                                </div>
                            </div>
                            <div className="md:mx-auto">
                                <h2 className="text-lg pb-2">Socials</h2>
                                <div className="flex flex-col gap-1">
                                    <a href="https://www.facebook.com/Kakudpostharvest?mibextid=rS40aB7S9Ucbxw6v" target="_blank">
                                        <img src={facebook} alt="facebook" className="w-5" />
                                    </a>
                                    <a href="https://www.instagram.com/kakud_agri_center/" target="_blank">
                                        <img src={instagram} alt="instagram" className="w-5" />
                                    </a>
                                    <a href="https://www.linkedin.com/company/kakud-agri/" target="_blank">
                                        <img src={linkedIn} alt="linkedIn" className="w-5" />
                                    </a>
                                    <a href="https://youtube.com/@kakudagri?si=Mt-eO04xfQHZSowY" target="_blank">
                                        <FiYoutube className="w-5 h-5 p-[2px] rounded-full bg-black text-white" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-center">
                <h5>© 2025 Kakud Post Harvest Private Limited</h5>
            </div>
        </div>
    )
}

export default Footer