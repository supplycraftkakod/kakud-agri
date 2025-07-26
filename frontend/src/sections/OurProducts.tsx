import { useState, useEffect } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import { Link } from "react-router-dom";

import insecticidesImg from "../assets/images/product-bottles/insecticides.png"
import fungicideImg from "../assets/images/product-bottles/fungicide.png"
import herbicideImg from "../assets/images/product-bottles/herbicide.png"
import micronutrientImg from "../assets/images/product-bottles/micronutrient.png"
import biofertilizerImg from "../assets/images/product-bottles/biofertilizer.png"

const categories = [
    { title: "INSECTICIDES", decs: "Guard against tiny threats.", imgSrc: insecticidesImg, color: "from-yellow-200 via-yellow-300 to-yellow-200", },
    { title: "FUNGICIDES", decs: "Defend your yield from disease.", imgSrc: fungicideImg, color: "from-sky-400 via-blue-500 to-sky-300", },
    { title: "HERBICIDES", decs: "Wipe out weeds, not crops.", imgSrc: herbicideImg, color: "from-orange-300 via-orange-400 to-orange-300", },
    { title: "MICRONUTRIENTS", decs: "Fuel growth at every stage.", imgSrc: micronutrientImg, color: "from-pink-400 via-pink-500 to-pink-400", },
    { title: "BIOFERTILIZERS", decs: "Guard against tiny threats.", imgSrc: biofertilizerImg, color: "from-green-300 via-green-400 to-green-300", },
];

const cardWidth = 224; // 14rem = 224px (w-56)

const OurProducts = () => {
    const [startIndex, setStartIndex] = useState(0);
    const [visibleCount, setVisibleCount] = useState(4);

    useEffect(() => {
        const updateVisibleCount = () => {
            const containerWidth = window.innerWidth * 0.8; // 80% width for container
            const count = Math.floor(containerWidth / cardWidth);
            setVisibleCount(Math.max(1, Math.min(count, categories.length)));
        };

        updateVisibleCount();
        window.addEventListener("resize", updateVisibleCount);

        return () => window.removeEventListener("resize", updateVisibleCount);
    }, []);

    const handlePrev = () => {
        setStartIndex((prev) => Math.max(prev - 1, 0));
    };

    const handleNext = () => {
        setStartIndex((prev) => Math.min(prev + 1, categories.length - visibleCount));
    };

    return (
        <div id="our-products" className="w-full py-[2rem] sm:py-[3.5rem] px-6 xs:px-[1rem] md:px-[3rem] lg:px-[3rem] xl:px-[6rem] font-inter bg-[#FDFEE7]">
            <SectionHeading
                heading="Our Product's Range."
                subHeading="Protect your crop before it's too late."
            />

            {/* Desktop View */}
            <div className="hidden md:flex items-center justify-between gap-4">
                <button
                    onClick={handlePrev}
                    className="p-2 rounded-full border hover:bg-gray-100 transition"
                >
                    <ChevronLeft />
                </button>

                <div className="relative w-full overflow-hidden">
                    <div
                        className="flex transition-transform duration-500 ease-in-out"
                        style={{ transform: `translateX(-${startIndex * cardWidth}px)` }}
                    >
                        {categories.map((item, idx) => (
                            <div
                                key={idx}
                                className={`w-[15rem] h-[23.5rem] relative shrink-0 rounded-md mx-1 flex flex-col items-center justify-end gap-8 text-center bg-gradient-to-br ${item.color}`}
                            >
                                <Link to={`/products?category=${item.title.charAt(0).toUpperCase() + item.title.slice(1).toLowerCase()}`}>
                                    <div className={`w-10 h-10 rounded-md absolute top-1 right-1 flex items-center justify-center cursor-pointer`}>
                                        <ArrowUpRight className="w-5 h-5 text-black" />
                                    </div>
                                </Link>
                                <div>
                                    <h2 className="text-xl font-medium border-b border-black">{item.title}</h2>
                                    <h4 className="text-xs pt-[2px]">{item.decs}</h4>
                                </div>

                                <div className="w-[70%] h-[15rem] rounded-t-md overflow-hidden">
                                    <img
                                        src={item.imgSrc}
                                        alt={item.title}
                                        className="w-full h-full rounded-t-md hover:scale-105 transition duration-200 ease-in-out"
                                    />
                                </div>

                            </div>
                        ))}
                    </div>
                </div>

                <button
                    onClick={handleNext}
                    className="p-2 rounded-full border hover:bg-gray-100 transition"
                >
                    <ChevronRight />
                </button>
            </div>

            {/* Mobile View */}
            <div className="md:hidden w-full overflow-x-auto scrollbar-hide">
                <div className="flex gap-4 w-max px-1 py-2 snap-x snap-mandatory">
                    {categories.map((item, idx) => (
                        <div
                            key={idx}
                            className={`w-[15rem] h-[23.5rem] relative shrink-0 rounded-md mx-1 flex flex-col items-center justify-end gap-8 text-center bg-gradient-to-br ${item.color}`}
                        >
                            <Link to={`/products?category=${item.title.toLocaleLowerCase()}`}>
                                <div className={`w-10 h-10 rounded-md absolute top-1 right-1 flex items-center justify-center cursor-pointer`}>
                                    <ArrowUpRight className="w-5 h-5 text-black" />
                                </div>
                            </Link>
                            <div>
                                <h2 className="text-xl font-medium border-b border-black">{item.title}</h2>
                                <h4 className="text-xs pt-[2px]">{item.decs}</h4>
                            </div>

                            <div className="w-[70%] h-[15rem] rounded-t-md bg-no-repeat bg-cover  overflow-hidden bg-white"
                                style={{
                                    backgroundImage: `url(${item.imgSrc})`,
                                    backgroundPosition: "center bottom",
                                }}
                            >
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div >
    );
};

export default OurProducts;
