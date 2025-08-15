import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
// import { useLocation } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { logoutUser } from "../utils/logout";
import logo from "../../public/logo.png"

export default function Navbar() {
    const [showMore, setShowMore] = useState(false);

    // const authStorage = localStorage.getItem("auth");
    // let token;
    // let userRole;

    // if (authStorage) {
    //     const authData = JSON.parse(authStorage);
    //     token = authData.token;
    //     userRole = authData.role;
    // }

    const [isOpen, setIsOpen] = useState(false);

    // const location = useLocation();

    // const isHome = location.pathname === "/" || location.pathname === "/home";
    // const shadowClass = isHome ? "shadow-lg" : "shadow-none";

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    // const dispatch = useDispatch();
    // const navigate = useNavigate();

    // const handleLogout = async () => {
    //     await logoutUser({
    //         dispatch,
    //         navigate,
    //         showToast: true,
    //         revokeRefreshToken: false,
    //         refreshToken: localStorage.getItem('refreshToken') || '',
    //     });
    // };

    const toggleMore = () => {
        setShowMore(prev => !prev);
    };

    return (
        <div className="relative font-manrope ">
            {/* Navbar */}
            <div className={`hidden w-full md:flex justify-between items-center gap-4 px-8 py-6 font-geist`}>
                <div className="flex items-center gap-3 uppercase">
                    <Link to={"/"} className="flex items-center gap-2">
                        <img src={logo} alt="logo" className="w-7 h-7" />
                        <span className="font-semibold leading-3">Kakud Agri</span>
                    </Link>
                </div>

                <div className="relative flex items-center gap-8 lg:gap-10">
                    {/* More button */}
                    <div
                        className="relative"
                        onMouseEnter={() => setShowMore(true)}
                        onMouseLeave={() => setShowMore(false)}
                    >
                        <button className="hover:text-black py-2">More</button>

                        {showMore && (
                            <div className="absolute left-0 pt-2 bg-white shadow-md rounded-md p-4 z-50 flex flex-col gap-2 min-w-[150px]">
                                <Link to="/careers" className="hover:text-black">Careers</Link>
                                <Link to="/our-team" className="hover:text-black">Our Team</Link>
                                <Link to="/our-impact">Our Impact</Link>

                                <Link to="/events">Events</Link>
                                <a href="#footer" className="hover:text-black" onClick={toggleMenu}>Contact</a>
                            </div>
                        )}
                    </div>


                    {/* Other nav links */}
                    <Link to="/services">Services</Link>
                    <Link to="/why-choose-kakud">Why Us?</Link>
                    <Link to="/blogs">Blogs</Link>
                    <Link to="/products">Products</Link>

                    {/* Auth Buttons */}
                    {/* {
                        token ? (
                            <div className="flex items-center gap-4">
                                <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-full text-sm">
                                    Logout
                                </button>
                                <Link to={userRole === "ADMIN" ? "/admin" : "/profile"}>
                                    <button className="bg-black text-white px-4 py-2 rounded-full text-sm">
                                        {userRole === "ADMIN" ? "Dashboard" : "Profile"}
                                    </button>
                                </Link>
                            </div>
                        ) : (
                            <div className="flex items-center gap-4">
                                <Link to={"/signin"}>
                                    <button className="bg-black text-white px-4 py-2 rounded-full text-sm">Login</button>
                                </Link>
                            </div>
                        )
                    } */}
                </div>

                <div>
                    <div className="p-[1px] rounded-full bg-white inline-block">
                        <Link
                            to="/about"
                            className="px-5 py-1 rounded-full bg-gradient-to-r from-[#449E08] via-[#7CBC52] to-[#449E08] text-white block"
                        >
                            About Us
                        </Link>
                    </div>
                </div>
            </div>
            {/* Mobile Navbar */}
            <div className="md:hidden flex justify-between items-center px-4 py-3 shadow-md fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/50 ">
                <Link to="/" className="flex items-center gap-2">
                    <img src={logo} alt="logo" className="w-8 h-8" />
                    <span className="font-black text-lg uppercase">Kakud Agri</span>
                </Link>
                <button onClick={toggleMenu}>
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu Drawer */}
            {
                isOpen && (
                    <div className="md:hidden min-h-screen font-medium text-xl fixed top-14 left-0 w-full shadow-md p-4 z-50 flex flex-col items-start pl-12 pt-6 gap-6 backdrop-blur-md bg-white/50 ">
                        <Link to={"/about"}
                            className="text-black"
                        >
                            About Us
                        </Link>
                        <Link to={"/products"}
                            className="text-black"
                        >
                            Products
                        </Link>
                        <Link to={"/services"}
                            onClick={toggleMore}
                            className="text-black"
                        >
                            Services
                        </Link>
                        <Link to={"/franchise-opportunities"}
                            onClick={toggleMore}
                            className="text-black"
                        >
                            Franchise
                        </Link>
                        <Link to={"/why-choose-kakud"}
                            onClick={toggleMore}
                            className="text-black"
                        >
                            Why Kakud?
                        </Link>
                        <Link to={"/blogs"}
                            onClick={toggleMore} className="text-black"
                        >
                            Blogs
                        </Link>
                        <Link to={"/events"}
                            onClick={toggleMore} className="text-black"
                        >
                            Events
                        </Link>
                        <Link to={"/careers"}
                            onClick={toggleMore} className="text-black"
                        >
                            Careers
                        </Link>
                        <Link to={"/our-impact"}
                            onClick={toggleMore} className="text-black"
                        >
                            Our Impact
                        </Link>
                        <Link to={"/our-team"}
                            onClick={toggleMore} className="text-black"
                        >
                            Our Team
                        </Link>
                        <a href="#footer" className="text-black" onClick={toggleMenu}>Contact</a>

                        {/* {
                            token ? (
                                <div className="w-full grid grid-cols-2 gap-6">
                                    <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-full text-sm ">Logout</button>
                                    <Link
                                        to={`${userRole === "ADMIN" ? "/admin" : "/profile"}`}
                                        onClick={toggleMenu}
                                        className="bg-black text-white px-4 py-2 rounded-full text-sm text-center">
                                        <button>{userRole === "ADMIN" ? "Dashboard" : "Profile"}</button>
                                    </Link>
                                </div>

                            ) : (
                                <>
                                    <Link to={"/signin"} onClick={toggleMenu}>
                                        <button className="bg-black text-white px-4 py-2 rounded-full text-sm w-full">Log In</button>
                                    </Link>
                                </>
                            )
                        } */}
                    </div>
                )
            }
        </div>
    );
}
