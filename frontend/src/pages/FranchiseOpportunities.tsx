import { ArrowDown } from "lucide-react"
import { Link as ScrollLink } from "react-scroll"

import Navbar from "../components/Navbar"
import { FranchiseCard, franchiseItems } from "../sections/FranchiseOpportunities";
import Footer from "../components/Footer";
import ImageSlider from "../components/ImageSlider";

const FranchiseOpportunities = () => {
// from-[#e9e2f1] via-[#E5D9E3] to-[#f8eae2]
    return (
        <div
            className="max-w-[100em] mx-auto font-geist bg-gradient-to-r from-[#f1ecf7] via-[#f5e6f2] to-[#fdf4ee]"
        >
            <div>
                <Navbar />

                <div className="w-full pt-28 md:pt-10">
                    <div className="w-full flex flex-col items-center gap-6 px-6 xs:px-[1rem] md:px-[3rem] lg:px-[3rem] text-center">
                        <div className="flex flex-col gap-2">
                            <h1 className="text-4xl tracking-wide md:border-b text-[#449E08] md:border-[#c0c0c0] pb-2 w-fit mx-auto font-semibold">
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
            </div>


            <div id="franchise" className="w-full space-y-14 gap-y-4 sm:gap-y-14 sm:py-20 pt-16 px-6 xs:px-[1rem] md:px-[3rem] lg:px-[3rem] xl:px-[6rem]">
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

            <div className="w-full pb-16 px-14 xs:px-[1rem] md:px-[3rem] lg:px-[4rem] xl:px-[8rem]">
                <ImageSlider />
            </div>

            <Footer />
        </div>
    )
}

export default FranchiseOpportunities