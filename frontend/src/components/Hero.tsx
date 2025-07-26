import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import axios from "axios";
import { BE_URL } from "../../config";
import arrowRight from "../assets/svg/arrow-right-svg.svg";
import defaultBg from "../assets/images/hero-image.png";

interface Banner {
    id: number;
    imageUrl: string;
    title: string;
    paragraph: string;
    shouldVisible: boolean;
    createdAt: string;
}

const staticSlides = [
    {
        title: "Empowering Farmers, Building the Future",
        subtitle: "Revolutionizing Agriculture Through Innovation & Sustainability",
        description:
            "At Kakud Agri, we provide high-quality agro-inputs, expert consultation, and modern agri-solutions — all under one roof. Join our mission to empower farmers and feed the future sustainably.",
        buttons: [
            { label: "Explore Our Products", link: "/products" },
            { label: "Become a Franchise Partner", link: "/franchise-opportunities" },
        ],
    },
    {
        title: "One-Stop Agri Solutions for Every Farmer",
        subtitle: "From Soil Testing to Market Access – We've Got You Covered",
        description:
            "Get the tools, technology, and guidance you need with direct-from-factory pricing, personalized crop consultation, and real-time support from our agriculture experts.",
        buttons: [
            { label: "Request Agri Consultation", link: "#" },
            { label: "Visit Your Nearest Store", link: "#" },
        ],
    },
    {
        title: "Partner with India’s Fastest-Growing Agri Brand",
        subtitle: "Franchise Opportunities That Make a Difference",
        description:
            "Be part of a nationwide agri-revolution. Choose from exclusive or non-exclusive franchise models and build a profitable, purpose-driven business with Kakud Agri.",
        buttons: [
            { label: "Explore Franchise Models", link: "/franchise-opportunities" },
            { label: "Get Started Today", link: "/products" },
        ],
    },
];

export default function Hero() {
    const [isDesktop, setIsDesktop] = useState(false);
    const [banners, setBanners] = useState<Banner[]>([]);
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 1024);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const fetchBanners = async () => {
            try {
                const res = await axios.get<{ banners: Banner[] }>(`${BE_URL}/api/v1/banners/visible`);
                setBanners(res.data.banners);
            } catch (err) {
                console.error("Failed to fetch banners", err);
            }
        };
        fetchBanners();
    }, []);

    const totalSlides = staticSlides.length + banners.length;

    const currentBg =
        currentSlideIndex < staticSlides.length
            ? defaultBg
            : banners[currentSlideIndex - staticSlides.length]?.imageUrl;

    const nextSlide = () => {
        setCurrentSlideIndex((prev) => (prev + 1) % totalSlides);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % totalSlides);
        }, 5000);

        return () => clearInterval(interval);
    }, [totalSlides]);


    const isStaticSlide = currentSlideIndex < staticSlides.length;
    const staticSlide = staticSlides[currentSlideIndex];

    return (
        <div
            className="min-h-screen bg-no-repeat bg-cover flex flex-col overflow-hidden relative transition-all duration-500"
            style={{
                backgroundImage: `url(${currentBg})`,
                backgroundPosition: isDesktop ? "center -2rem" : "center top",
            }}
        >
            <Navbar />

            {/* HERO CONTENT */}
            <div className="w-full min-h-screen px-6 md:px-[4rem] pt-44 xs:pt-32 md:pt-52 flex flex-col items-center gap-8 font-inter relative">
                {isStaticSlide ? (
                    <div className="w-full flex flex-col items-center gap-6">
                        <div className="flex flex-col gap-4 text-center">
                            <h1 className="leading-[3.5rem] sm:leading-none font-medium text-[3rem] sm:text-[6vw] md:text-[5vw] lg:text-[3rem] text-center">
                                {staticSlide.title}
                            </h1>
                            <h2 className="leading-[2rem] sm:leading-none text-[1.5rem] md:text-[2rem] text-white lg:text-[#1a1a1a] text-center">
                                {staticSlide.subtitle}
                            </h2>
                            {/* <p className="text-base md:hidden text-center text-white">
                                {staticSlide.description}
                            </p> */}
                        </div>
                        <div className="flex flex-col items-center md:flex-row gap-4">
                            {staticSlide.buttons.map((btn, idx) => (
                                btn.link[0] === "#" ? (
                                    <a href={btn.link}>
                                        <button className="text-lg sm:text-xl px-8 sm:px-4 md:px-6 py-4 sm:py-2 rounded-full border text-white lg:text-black lg:border-[#767676] flex items-center justify-center leading-none backdrop-blur-md bg-white/20 border-white/20 shadow-lg hover:bg-white/30 transition-all">
                                            {btn.label}
                                        </button>
                                    </a>
                                ) : (
                                    <Link to={btn.link} key={idx}>
                                        <button className="text-lg sm:text-xl px-8 sm:px-4 md:px-6 py-4 sm:py-2 rounded-full border text-white lg:text-black lg:border-[#767676] flex items-center justify-center leading-none backdrop-blur-md bg-white/20 border-white/20 shadow-lg hover:bg-white/30 transition-all">
                                            {btn.label}
                                        </button>
                                    </Link>
                                )
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="w-full flex flex-col items-center gap-6 text-white">
                        {/* <div className="bg-black/50 backdrop-blur-md rounded-xl px-6 py-8 text-white text-center max-w-3xl"> */}
                        <h1 className="leading-[3.5rem] sm:leading-none font-medium text-[3rem] sm:text-[6vw] md:text-[5vw] lg:text-[3rem] text-center">
                            {banners[currentSlideIndex - staticSlides.length]?.title || "Untitled"}
                        </h1>
                        <p className="text-lg sm:w-[90%] xl:w-[70%] text-center">
                            {banners[currentSlideIndex - staticSlides.length]?.paragraph || "No description available."}
                        </p>
                        <Link to={"/products"}>
                            <button className="px-8 py-3 rounded-full bg-white/20 border border-white/30 text-white hover:bg-white/30 transition-all ">
                                Explore Products
                            </button>
                        </Link>
                        {/* </div> */}
                    </div>
                )}

                {/* Bottom Info */}
                <div className="w-full">
                    {/* {currentSlideIndex < staticSlides.length ? (
                        staticSlide && (
                            <div className="hidden w-full sm:w-[30rem] md:block md:absolute bottom-0 left-0 p-6 sm:p-10 text-white tracking-wide font-extralight">
                                <p className="text-xl">{staticSlide.description}</p>
                            </div>
                        )
                    ) : (
                        <div className="hidden w-full sm:w-[30rem] md:block md:absolute bottom-0 left-0 p-6 sm:p-10 text-white tracking-wide font-extralight">
                            <p className="text-xl">
                                {banners[currentSlideIndex - staticSlides.length]?.paragraph || "No description available."}
                            </p>
                        </div>
                    )} */}

                    <div className="absolute bottom-0 left-0 p-6 sm:p-10 text-white tracking-wide font-extralight">
                        <Link to={"/blogs"}>
                            <button className="text-lg sm:text-xl px-8 sm:px-4 md:px-6 py-4 sm:py-2 rounded-full border text-white lg:border-[#767676] flex items-center justify-center leading-none backdrop-blur-md bg-white/20 border-orangebg-white/20 shadow-lg hover:bg-white/30 transition-all">
                                View Blogs
                            </button>
                        </Link>
                    </div>

                    {/* Arrow Button */}
                    <button
                        onClick={nextSlide}
                        className="w-[4rem] h-[4rem] hidden lg:absolute bottom-6 lg:bottom-10 right-10 lg:flex items-center justify-center rounded-full border text-white border-white group hover:bg-white/10 transition-all"
                    >
                        <img
                            src={arrowRight}
                            alt="Next"
                            className="w-[2rem] transform transition-transform duration-300 group-hover:translate-x-2"
                        />
                    </button>

                </div>
            </div>
        </div>
    );
}
