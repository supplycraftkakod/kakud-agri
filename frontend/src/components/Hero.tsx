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

export default function Hero() {
    const [isDesktop, setIsDesktop] = useState(false);
    const [banners, setBanners] = useState<Banner[]>([]);
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0); // 0 = default hero    

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
                const res = await axios.get<{ banners: Banner[] }>(
                    `${BE_URL}/api/v1/banners/visible`
                );
                setBanners(res.data.banners);
            } catch (err) {
                console.error("Failed to fetch banners", err);
            }
        };

        fetchBanners();
    }, []);

    const totalSlides = banners.length + 1; // including static hero

    const nextSlide = () => {
        setCurrentSlideIndex((prev) => (prev + 1) % totalSlides);
    };

    const isDefaultHero = currentSlideIndex === 0;
    const currentBg = isDefaultHero
        ? defaultBg
        : banners[currentSlideIndex - 1]?.imageUrl;

    useEffect(() => {
        if (banners.length === 0) return;

        const interval = setInterval(() => {
            setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % totalSlides);
        }, 5000);

        return () => clearInterval(interval);
    }, [banners, totalSlides]);

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
            <div className="w-full h-screen px-6 lg:px-[2rem] pt-60 xs:pt-32 md:pt-52 flex flex-col items-center gap-8 font-inter relative">
                {/* ✅ Static Hero */}
                {isDefaultHero ? (
                    // Static Hero
                    <div className="w-full flex flex-col items-center gap-6">
                        <div className="flex flex-col gap-4">
                            <h1 className="leading-[3.5rem] sm:leading-none font-medium text-[3rem] sm:text-[6vw] md:text-[5vw] lg:text-[3rem] text-center">
                                Transforming Agriculture Landscape
                            </h1>
                            <h2 className="leading-[2rem] sm:leading-none text-[1.5rem] md:text-[2rem] text-white lg:text-[#505050] text-center">
                                Empowering{" "}
                                <span className="font-playfair italic text-white lg:text-black font-semibold">
                                    Farmers
                                </span>{" "}
                                with Innovative Solutions
                            </h2>
                        </div>
                        <div className="flex flex-col md:flex-row gap-4">
                            <button className="text-lg sm:text-xl px-8 sm:px-4 md:px-6 py-4 sm:py-2 rounded-full border text-white lg:text-black lg:border-[#767676] flex items-center justify-center leading-none backdrop-blur-md bg-white/20 border-white/20 shadow-lg">
                                Know More
                            </button>
                            <Link to={"/products"}>
                                <button className="text-lg sm:text-xl px-8 sm:px-4 md:px-6 py-4 sm:py-2 rounded-full border text-white lg:text-black lg:border-[#767676] flex items-center justify-center leading-none backdrop-blur-md bg-white/20 border-white/20 shadow-lg">
                                    Explore Products
                                </button>
                            </Link>
                        </div>
                    </div>
                ) : (
                    // Dynamic Banner Slide
                    <div className="w-full flex flex-col items-center gap-6 text-white">
                        <div className="bg-black/50 backdrop-blur-md rounded-xl px-6 py-8 text-white text-center max-w-3xl">
                            <h1 className="text-4xl sm:text-6xl font-semibold mb-4">
                                {banners[currentSlideIndex - 1]?.title || "Untitled"}
                            </h1>
                            <p className="text-lg mb-6">
                                {banners[currentSlideIndex - 1]?.paragraph || "No description available."}
                            </p>
                            <Link to={"/products"}>
                                <button className="px-8 py-3 rounded-full bg-white/20 border border-white/30 text-white hover:bg-white/30 transition-all">
                                    Explore Products
                                </button>
                            </Link>
                        </div>
                    </div>
                )}

                {/* Bottom Info */}
                <div className="w-full">
                    {isDefaultHero && (
                        <div className="hidden w-full sm:w-[30rem] md:block md:absolute bottom-0 left-0 p-6 sm:p-10 text-white tracking-wide font-extralight">
                            <p className="text-xl">
                                We support farmers with quality inputs and expert guidance.
                                Through innovation and sustainability, we aim to boost productivity and drive lasting
                                growth in agriculture.
                            </p>
                        </div>
                    )}

                    {/* Arrow Button */}
                    {banners.length > 0 && (
                        <button
                            onClick={nextSlide}
                            className="w-[8rem] h-[8rem] absolute bottom-10 right-10 flex items-center justify-center rounded-full border text-white border-white group"
                        >
                            <img
                                src={arrowRight}
                                alt="Next"
                                className="w-[3rem] transform transition-transform duration-300 group-hover:translate-x-2"
                            />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
