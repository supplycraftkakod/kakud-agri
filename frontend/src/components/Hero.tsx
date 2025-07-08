import bgImage from "../assets/images/hero-image.png";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
// import arrowRight from "../assets/svg/arrow-right-svg.svg"

export default function Hero() {

    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 1024);
        };

        handleResize(); // Run once on mount
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div
            className="min-h-screen bg-no-repeat bg-cover flex flex-col overflow-hidden relative"
            style={{
                backgroundImage: `url(${bgImage})`,
                backgroundPosition: isDesktop ? 'center -2rem' : 'center top',
            }}
        >
            <Navbar />

            {/* Hero Section */}
            <div className="w-full h-screen px-6 lg:px-[2rem] pt-60 xs:pt-32 md:pt-52 flex flex-col items-center gap-8 font-inter relative">
                <div className="w-full flex flex-col items-center gap-6">
                    <div className="flex flex-col gap-4">
                        <h1 className="leading-[3.5rem] sm:leading-none font-medium text-[3rem] sm:text-[6vw] md:text-[5vw] lg:text-[3rem] text-center">
                            Transforming Agriculture Landscape
                        </h1>
                        <h2 className="leading-[2rem] sm:leading-none text-[1.5rem] md:text-[2rem] text-white lg:text-[#505050] text-center">
                            Empowering <span className="font-playfair italic text-white lg:text-black font-semibold">Farmers</span> with Innovative Solutions
                        </h2>
                    </div>
                    <div className="flex flex-col md:flex-row gap-4">
                        <button className="text-lg sm:text-xl px-8 sm:px-4 md:px-6 py-4 sm:py-2 rounded-full border text-white lg:text-black lg:border-[#767676] flex items-center justify-center leading-none backdrop-blur-md bg-white/20 border-white/20 shadow-lg">
                            Know More
                        </button>
                        <button className="text-lg sm:text-xl px-8 sm:px-4 md:px-6 py-4 sm:py-2 rounded-full border text-white lg:text-black lg:border-[#767676] flex items-center justify-center leading-none backdrop-blur-md bg-white/20 border-white/20 shadow-lg">
                            Explore Products
                        </button>
                    </div>
                </div>

                <div className="w-full">
                    <div className="hidden w-full sm:w-[30rem] md:block md:absolute bottom-0 left-0 p-6 sm:p-10 text-white tracking-wide font-extralight">
                        <p className="text-xl">
                            We support farmers with quality inputs and expert guidance.
                            Through innovation and sustainability, we aim to boost productivity and drive lasting
                            growth in agriculture.
                        </p>
                    </div>

                    {/* <button className="w-[8rem] h-[8rem] absolute bottom-10 right-10 flex items-center justify-center rounded-full border text-white border-white group">
                        <img src={arrowRight} alt=">" className="w-[3rem] transform transition-transform duration-300 group-hover:translate-x-2" />
                    </button> */}
                </div>
            </div>
        </div>
    );
}
