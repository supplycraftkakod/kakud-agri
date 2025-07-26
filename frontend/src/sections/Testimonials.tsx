import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import leftArrow from "../assets/icons/left-arrow.png";
import rightArrow from "../assets/icons/right-arrow.png";
import leafBgImg from '../assets/images/leaf-bg.png'

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
        <div className="w-full font-inter">
            <div className="w-full py-40 sm:h-[28rem] mb-10 px-6 xs:px-[1rem] md:px-[3rem] lg:px-[3rem] xl:px-[6rem] flex items-center justify-between bg-[#ffffff] bg-cover overflow-hidden"
                style={{
                    backgroundImage: `url(${leafBgImg})`,
                    backgroundPosition: "center",
                }}
            >
                <img
                    src={leftArrow}
                    alt="left"
                    className="cursor-pointer z-10"
                    onClick={handlePrev}
                />

                <div className="relative w-full flex justify-center items-center"
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
                            className="absolute px-6 sm:px-[5rem] lg:px-[10rem] xl:px-[15rem] flex flex-col items-center gap-12 rounded-lg text-center"
                        >
                            <div>
                                <h3 className="text-xl sm:text-[2rem] leading-none">{testimonials[index].name}</h3>
                                <h4 className="text-lg sm:text-2xl text-[#505050]">{testimonials[index].location}</h4>
                            </div>
                            <p className="sm:text-xl font-light">
                                “{testimonials[index].message}”
                            </p>
                        </motion.div>
                    </AnimatePresence>
                </div>

                <img
                    src={rightArrow}
                    alt="right"
                    className="cursor-pointer z-10"
                    onClick={handleNext}
                />
            </div>
        </div>
    );
};

export default Testimonials;
