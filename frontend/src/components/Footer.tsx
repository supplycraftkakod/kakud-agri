import instagram from "../assets/icons/instagram.png"
import facebook from "../assets/icons/facebook.png"
import linkedIn from "../assets/icons/linkedin.png"
import { Link } from "react-router-dom"
import { FiYoutube } from "react-icons/fi"

import footerImg from "../assets/images/footer.png"
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
            className="w-full pb-4 pt-[4rem] sm:pt-[3.5rem] px-8 md:px-[3rem] lg:px-[3rem] xl:px-[6rem] font-inter flex flex-col justify-end bg-no-repeat gap-28 bg-cover"
            style={{
                backgroundImage: `url(${footerImg})`,
                backgroundPosition: "center bottom",
            }}
        >

            <div>
                <div>
                    {
                        heading ? (
                            <div className="pb-2 text-2xl sm:text-4xl font-light tracking-wide">
                                <h2>{heading}</h2>
                            </div>
                        ) : (
                            <div className="pb-2 text-2xl sm:text-4xl font-light tracking-wide">
                                <h2>Get in touch today and take your farming to the next level with Kakud Agri!</h2>
                            </div>

                        )}
                </div>
                {
                    subHeading &&
                    <div className="sm:text-2xl font-light tracking-wide">
                        <h2>{subHeading}</h2>
                    </div>
                }

                <div className="pt-12 sm:pt-24">
                    <h2 className="text-2xl">Kakud</h2>
                    <div className="w-full grid md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-14">
                        <div className="font-light">
                            <h4 >Tel: 123-456-7890</h4>
                            <h4 >Email: info@kakudagri.in</h4>
                            <h4 className="pt-3">
                                <span className="font-bold">Corporate Office</span> - C/o Sandbox Startup, Next to Airport, Gokul Road, Opp Gokul Village, HUBLI,
                                Dharwad, Karnataka, India, 580030
                            </h4>
                            {/* <h4 className="pt-3">
                                <span className="font-bold">Manufacturing Industry</span> - Zauca Enterprises Private Limited, Unit 01, Bennur, Annigere (T), Dharwad
                                (D), Karnataka, India.
                            </h4> */}
                        </div>
                        <div className="grid md:grid-cols-2 gap-y-14">
                            <div className="flex flex-col md:pl-10 gap-2">
                                <Link to={"/about"}
                                    className="text-gray-700 hover:text-black"
                                >
                                    About Us
                                </Link>
                                <Link to={"/careers"}
                                    className="text-gray-700 hover:text-black"
                                >
                                    Careers
                                </Link>
                                <Link to={"/services"}
                                    className="text-gray-700 hover:text-black"
                                >
                                    Services
                                </Link>
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
                                <Link to={"/our-impact"}
                                    className="text-gray-700 hover:text-black"
                                >
                                    Impact
                                </Link>
                                <Link to={"/our-team"}
                                    className="text-gray-700 hover:text-black"
                                >
                                    Team
                                </Link>
                            </div>
                            <div className="flex md:flex-col items-center gap-4">
                                {/* <a href="" target="_blank">
                                    <img src={twitter} alt="twitter" className="w-8" />
                                </a> */}
                                <a href="https://www.facebook.com/Kakudpostharvest?mibextid=rS40aB7S9Ucbxw6v" target="_blank">
                                    <img src={facebook} alt="facebook" className="w-8" />
                                </a>
                                <a href="https://www.instagram.com/kakud_agri_center/" target="_blank">
                                    <img src={instagram} alt="instagram" className="w-8" />
                                </a>
                                <a href="https://www.linkedin.com/company/kakud-agri/" target="_blank">
                                    <img src={linkedIn} alt="linkedIn" className="w-8" />
                                </a>
                                <a href="https://youtube.com/@kakudagri?si=Mt-eO04xfQHZSowY" target="_blank">
                                    <FiYoutube className="w-8 h-8 p-1 rounded-full bg-black text-white" />
                                </a>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 lg:pl-10">
                            <h4 className="">Subscribe to our newsletter:</h4>
                            <input
                                placeholder="Email"
                                type="email"
                                name="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="!outline-none px-4 p-2 rounded-full bg-[#ffffff] border border-gray-400"
                            />
                            <button
                                onClick={handleSubscribe}
                                disabled={loading}
                                className={`w-fit px-4 p-1 rounded-full self-end transition ${loading ? "bg-gray-500 cursor-not-allowed" : "bg-[#272727]"
                                    } text-white`}
                            >
                                {loading ? <Loader /> : "Submit"}
                            </button>

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