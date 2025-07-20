// import twitter from "../assets/icons/twitter.png"
import instagram from "../assets/icons/instagram.png"
import facebook from "../assets/icons/facebook.png"
import linkedIn from "../assets/icons/linkedin.png"
import { Link } from "react-router-dom"
import { FiYoutube } from "react-icons/fi"

const Footer = () => {
    return (
        <div
            id="footer"
            className="w-full pb-4 pt-[4rem] sm:pt-[3.5rem] px-8  md:px-[3rem] lg:px-[3rem] xl:px-[6rem] font-inter flex flex-col gap-20 bg-[#F0FDF4]">
            <div>
                <div className="pb-12 sm:pb-16 text-2xl sm:text-4xl font-light tracking-wide">
                    <h2>Get in touch today and take your farming to the next level with Kakud Agri!</h2>
                </div>
                <div>
                    <h2 className="text-2xl">Kakud</h2>
                    <div className="w-full grid md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-14">
                        <div className="font-light">
                            <h4 >Tel: 123-456-7890</h4>
                            <h4 >Email: info@kakudagri.in</h4>
                            <h4 className="pt-3">
                                <span className="font-bold">Corporate Office</span> - C/o Sandbox Startup, Next to Airport, Gokul Road, Opp Gokul Village, HUBLI,
                                Dharwad, Karnataka, India, 580030
                            </h4>
                            <h4 className="pt-3">
                                <span className="font-bold">Manufacturing Industry</span> - Zauca Enterprises Private Limited, Unit 01, Bennur, Annigere (T), Dharwad
                                (D), Karnataka, India.
                            </h4>
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
                                    <FiYoutube className="w-8 h-8 p-1 rounded-full bg-black text-white"/>
                                </a>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 lg:pl-10">
                            <h4 className="">Subscribe to our newsletter:</h4>
                            <input placeholder="Email" type="email" name="email" id="email"
                                className="!outline-none px-4 p-2 rounded-full bg-[#ffffff] border border-gray-400"
                            />
                            <button className="w-fit px-4 p-1 bg-[#272727] text-white rounded-full self-end">
                                Submit
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