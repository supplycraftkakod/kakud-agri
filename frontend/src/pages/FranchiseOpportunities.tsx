import { ArrowDown } from "lucide-react"
// import { useEffect, useState } from "react";
import { Link as ScrollLink } from "react-scroll"

import Navbar from "../components/Navbar"
// import servicesHeroImg from "../assets/images/services-hero1.png";
import { FranchiseCard, franchiseItems } from "../sections/FranchiseOpportunities";
import Footer from "../components/Footer";
import ImageSlider from "../components/ImageSlider";


const FranchiseOpportunities = () => {
    // const [isDesktop, setIsDesktop] = useState(false);

    // useEffect(() => {
    //     const handleResize = () => {
    //         setIsDesktop(window.innerWidth >= 1024);
    //     };
    //     handleResize();
    //     window.addEventListener("resize", handleResize);
    //     return () => window.removeEventListener("resize", handleResize);
    // }, []);

    return (
        <div className="font-inter bg-[#FDFEE7]">
            {/* <section
                className="relative w-full h-fit bg-no-repeat bg-cover flex flex-col overflow-hidden transition-all duration-500"
            > */}
            {/* <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `url(${servicesHeroImg})`,
                        backgroundPosition: isDesktop ? "center -6rem" : "center top",
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        zIndex: 0,
                    }}
                ></div> */}
            {/* <div className="absolute inset-0 bg-black/50"></div> */}
            {/* </section> */}
            <Navbar />

            <div className="w-full pt-32 xs:pt-24 sm:pt-36">
                <div className="w-full flex flex-col items-center gap-6 px-6 xs:px-[1rem] md:px-[3rem] lg:px-[3rem] text-center">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-4xl font-medium tracking-wide md:border-b md:border-[#c0c0c0] pb-2 w-fit mx-auto">
                            Franchise Opportunities
                        </h1>
                        <p className="max-w-3xl md:pt-4">
                            Explore our franchise opportunities at Kakud. Join us and become a part of our exclusive retail franchise model or opt for our non-exclusive retail franchise model.
                        </p>
                    </div>

                    <ScrollLink
                        to="franchise"
                        smooth={true}
                        duration={500}
                    >
                        <button className="text-lg sm:text-xl p-4 rounded-full border border-[#c0c0c0] flex items-center justify-center leading-none transition-all">
                            <ArrowDown />
                        </button>
                    </ScrollLink>
                </div>
            </div>

            <div className="w-full pt-20 px-6 xs:px-[1rem] md:px-[3rem] lg:px-[3rem] xl:px-[6rem]">
                <ImageSlider />
            </div>

            <div id="franchise" className="w-full space-y-24 py-20 px-6 xs:px-[1rem] md:px-[3rem] lg:px-[3rem] xl:px-[6rem]">
                {franchiseItems.map((item, index) => (
                    <FranchiseCard key={index} {...item} />
                ))}
            </div>

            <div className="pb-20 px-6 xs:px-[1rem] md:px-[3rem] lg:px-[3rem] xl:px-[6rem]">
                <h2 className="text-xl sm:text-2xl">Interested in Becoming a Franchise Partner?</h2>
                <p className="text-base sm:text-lg font-light pt-1">Email at <strong>kakudagri@gmail.com</strong> to explore the right franchise model for you and be part of a mission to empower
                    farmers and build a sustainable future in agriculture.
                </p>
                <button className="mt-4 text-lg sm:text-xl px-8 sm:px-4 md:px-6 py-4 sm:py-2 rounded-full border text-black border-[#3d3d3d] flex items-center justify-center leading-none">
                    <a href="mailto:careers@kakudagri.com">
                        Apply
                    </a>
                </button>
            </div>

            <Footer />
        </div>
    )
}

export default FranchiseOpportunities