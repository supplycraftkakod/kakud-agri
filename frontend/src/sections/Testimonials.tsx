import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "../components/SectionHeading";
import { ChevronLeft, ChevronRight } from "lucide-react";
import bgImg from "../assets/images/hero-bg-1.png"

const testimonials = [
    {
        name: "Anil Deshmukh",
        location: "Karnataka",
        message:
            "Partnering with Kakud Agri as a franchisee has been a game-changer for my business. The exclusive product range and support from the team have ensured steady growth.",
    },
    {
        name: "Ramesh Patil",
        location: "Maharashtra",
        message:
            "Kakud Agri’s consultation service helped me improve my crop yield by 30% in just one season. Their expert advice and high-quality products made all the difference.",
    },
];

const slideVariants = {
    initial: (direction: any) => ({
        x: direction > 0 ? 300 : -300,
        opacity: 0,
    }),
    animate: {
        x: 0,
        opacity: 1,
        transition: {
            duration: 0.5,
            ease: "easeOut",
        },
    },
    exit: (direction: any) => ({
        x: direction < 0 ? 300 : -300,
        opacity: 0,
        transition: {
            duration: 0.4,
            ease: "easeIn",
        },
    }),
};

const Testimonials = () => {
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    const handleNext = () => {
        setDirection(1);
        setIndex((prev) => (prev + 1) % testimonials.length);
    };

    const handlePrev = () => {
        setDirection(-1);
        setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    return (
        <div className="w-full pb-[4rem] pt-[4rem] sm:pt-[5rem] px-6 xs:px-[1rem] md:px-[3rem] lg:px-[3rem] xl:px-[6rem] font-geist bg-[#FDFEE7]">
            <SectionHeading
                heading="Testimonials."
                subHeading="What our customer says about us."
            />
            <div className="w-full">
                <div className="w-full py-40 sm:h-[24rem] px-3 xs:px-[1rem] md:px-[3rem] lg:px-[3rem] xl:px-[6rem] flex items-center justify-between rounded-md bg-[#510c5a] bg-cover overflow-hidden"
                style={{
                    backgroundImage: `url(${bgImg})`,
                    backgroundPosition: "center bottom",
                }}
                >
                    <ChevronLeft
                        className="cursor-pointer z-10 text-black"
                        onClick={handlePrev}
                    />

                    <div className="relative w-full flex justify-center items-center text-[#1d1d1d]"
                    >
                        <AnimatePresence custom={direction} mode="wait">
                            <motion.div
                                key={index}
                                custom={direction}
                                //@ts-ignore
                                variants={slideVariants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                className="absolute px-4 sm:px-[5rem] lg:px-[10rem] flex flex-col items-center gap-12 rounded-lg text-center"
                            >
                                <div>
                                    <h3 className="text-xl sm:text-[2rem] font-medium leading-none">{testimonials[index].name}</h3>
                                    <h4 className="text-lg sm:text-2xl text-[#707070]">{testimonials[index].location}</h4>
                                </div>
                                <p className="sm:text-lg  tracking-wide">
                                    “{testimonials[index].message}”
                                </p>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <ChevronRight
                        className="cursor-pointer z-10 text-black"
                        onClick={handleNext}
                    />
                </div>
            </div>
        </div>
    );
};

export default Testimonials;
