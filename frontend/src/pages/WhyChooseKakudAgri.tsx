import { useEffect, useState } from "react";
import { Link as ScrollLink } from "react-scroll"

import servicesHeroImg from "../assets/images/services-hero1.png";
import Navbar from "../components/Navbar";
import { ArrowDown } from "lucide-react";
import { KakudAdvantageCard, whyItems } from "../sections/WhyKakud";
import Footer from "../components/Footer";

const WhyChooseKakudAgri = () => {
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 1024);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className="font-inter">
            <section
                className="relative w-full min-h-screen bg-no-repeat bg-cover flex flex-col overflow-hidden transition-all duration-500"
            >
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `url(${servicesHeroImg})`,
                        backgroundPosition: isDesktop ? "center -6rem" : "center top",
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        zIndex: 0,
                    }}
                ></div>
                {/* <div className="absolute inset-0 bg-black/50"></div> */}
                <Navbar />

                <div className="w-full absolute pt-56 xs:pt-32 sm:pt-52">
                    <div className="w-full flex flex-col items-center gap-6 px-6 xs:px-[1rem] md:px-[3rem] lg:px-[3rem] text-center">
                        <div className="flex flex-col gap-2">
                            <h1 className="text-4xl font-medium tracking-wide md:border-b md:border-black pb-2 w-fit mx-auto">
                                Why Choose Kakud Agri?
                            </h1>
                            <p className="max-w-3xl md:pt-4">
                                At Kakud Agri, we are committed to transforming agriculture by delivering value, trust, and innovation to every farmer we serve. Here’s why thousands of farmers and agri-entrepreneurs choose us:
                            </p>
                        </div>

                        <ScrollLink
                            to="why-choose"
                            smooth={true}
                            duration={500}
                        >
                            <button className="text-lg sm:text-xl p-4 rounded-full border border-[#292929] flex items-center justify-center leading-none bg-white/20 border-white/20 shadow-lg hover:bg-white/30 transition-all">
                                <ArrowDown />
                            </button>
                        </ScrollLink>
                    </div>
                </div>

            </section>

            <div id="why-choose" className="py-20 px-6 xs:px-[1rem] md:px-[3rem] lg:px-[3rem] xl:px-[6rem]">
                <div className="w-full space-y-6 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {whyItems.map((item, index) => (
                        <KakudAdvantageCard key={index} {...item} />
                    ))}
                </div>
            </div>

            <Footer />

        </div>
    )
}

export default WhyChooseKakudAgri