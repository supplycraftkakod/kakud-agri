import { Link as ScrollLink } from "react-scroll"

import Navbar from "../components/Navbar";
import { ArrowDown } from "lucide-react";
import { KakudAdvantageCard, whyItems } from "../sections/WhyKakud";
import Footer from "../components/Footer";

const WhyChooseKakudAgri = () => {

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
                                Why Choose Kakud Agri?
                            </h1>
                            <p className="max-w-3xl md:pt-4">
                                At Kakud Agri, we are committed to transforming agriculture by delivering value,
                                trust, and innovation to every farmer we serve. Here’s why thousands of farmers and
                                agri-entrepreneurs choose us.
                            </p>
                        </div>

                        <ScrollLink
                            to="why-choose"
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