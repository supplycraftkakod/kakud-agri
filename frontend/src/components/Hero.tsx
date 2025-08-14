import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import arrowDown from "../assets/svg/arrow-down.svg";
import heroImg1 from "../assets/images/hero-bg-1.png";
import heroImg2 from "../assets/images/hero-bg-2.png";
import { Link } from "react-router-dom";

export default function Hero() {
    const [currentImage, setCurrentImage] = useState(heroImg1);

    useEffect(() => {
        const images = [heroImg1, heroImg2];
        let index = 0;

        const interval = setInterval(() => {
            index = (index + 1) % images.length;
            setCurrentImage(images[index]);
        }, 2000); // every 1 second

        return () => clearInterval(interval); // clean up on unmount
    }, []);

    return (
        <div
            className="min-h-screen 2xl:h-fit bg-no-repeat bg-cover flex flex-col justify-between overflow-hidden relative transition-all duration-1000"
            style={{
                backgroundImage: `url(${currentImage})`,
                backgroundPosition: "center bottom",
            }}
        >
            <Navbar />

            {/* HERO CONTENT */}
            <div className="w-full flex flex-col items-center px-6 sm:px-8 md:pb-10 font-geist text-[#1d1d1d]">
                <div className="flex flex-col justify-center items-center gap-2">
                    <h1 className="hidden md:block text-[8vw] xs:text-[2.5rem] md:text-[4rem] leading-none font-medium">Empowering <span className="font-playfair italic font-semibold text-[#449E08]">Farmers</span></h1>
                    <div className="flex flex-col items-center pb-3 md:hidden">
                        <h1 className="block md:hidden text-[11vw] xs:text-[3.5rem] leading-none font-medium">Empowering </h1>
                        <h1 className="block md:hidden text-[15vw] xs:text-[5rem] tracking-wide leading-none text-[#449E08] font-semibold font-playfair italic">Farmers</h1>
                    </div>
                    <h1 className="text-[8vw] xs:text-[2.5rem] md:text-[4rem] leading-none font-medium">Building the Future</h1>
                </div>
                <p className="md:w-[40rem] text-center pt-4">We Provide advanced, reliable agrochemical solutions that enhance crop yield, protect the land, and support sustainable farming practices.</p>
                <div className="cta flex flex-col xs:flex-row gap-4 pt-8 items-center">
                    <div className="w-[12rem] xs:w-fit p-[2px] text-center rounded-full bg-white shadow-sm inline-block">
                        <Link
                            to="/franchise-opportunities"
                            className="px-6 py-2 sm:text-xl rounded-full bg-gradient-to-r from-[#449E08] via-[#7CBC52] to-[#449E08] text-white block"
                        >
                            Franchise Options
                        </Link>
                    </div>
                    <div className="w-[12rem] xs:w-fit p-[2px] text-center rounded-full bg-white shadow-sm inline-block">
                        <Link
                            to="/products"
                            className="px-6 py-2 sm:text-xl rounded-full bg-gradient-to-r from-[#449E08] via-[#7CBC52] to-[#449E08] text-white block"
                        >
                            Our Products
                        </Link>
                    </div>
                </div>
            </div>

            {/* Hero Footer */}
            <div className="w-[95%] mx-auto flex items-start justify-between gap-[10px] sm:gap-[150px] lg:gap-[200px] font-geist border-t border-gray-400 pb-12 xs:pb-8">
                <p className="pt-3 ">Our vision is to revolutionize agriculture through innovation, sustainability,
                    and community empowerment, creating a future where farmers thrive, agricultural practices are efficient,
                    and productivity is maximized through cutting-edge solutions.
                </p>
                <img src={arrowDown} alt="learn" className="w-8 mt-3" />
            </div>
        </div>
    );
}
